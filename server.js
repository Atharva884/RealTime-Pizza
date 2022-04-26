require('dotenv').config()
require('./DataBase/db')
const express = require('express')
const expresslayouts = require('express-ejs-layouts')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const eventEmmitter = require('events')


// Instantiate
const app = express()

// Port 
const port = process.env.PORT || 5000

// Event Emitter
const eventEmitter = new eventEmmitter()
app.set('eventEmitter', eventEmitter)

// Paths
const public = path.join(__dirname, './public')
const view = path.join(__dirname, './resources/views')
// const layout = path.join(__dirname, './resources/views/layout.ejs')

// Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Public (Static) folder
app.use(express.static(public))

// Template Engine
app.set('view engine', 'ejs')
app.set('views', view)

// Layout
app.use(expresslayouts)

// Session
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({collectionName: 'session', mongoUrl: process.env.MONGO_URI}),
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

// Passport
const Passport = require('./app/config/passport')
Passport(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Middleware
app.use((req, res, next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})



// Routes
app.use('/', require('./routes/web'))

// Listen
const server = app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})

// Socket
const io = require('socket.io')(server)
io.on('connection', (socket)=>{
    // Join
    console.log(socket.id);
    socket.on('join', (orderID)=>{
        console.log(orderID);
        socket.join(orderID)
    })
})

eventEmitter.on('orderUpdated', (data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})
eventEmitter.on('orderPlaced', (data)=>{
    io.to(`adminRoom`).emit('orderPlaced', data)
})