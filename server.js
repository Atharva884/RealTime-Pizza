require('dotenv').config()
require('./DataBase/db')
const express = require('express')
const expresslayouts = require('express-ejs-layouts')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')
const passport = require('passport')

// Instantiate
const app = express()

// Port 
const port = process.env.PORT || 5000

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
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})