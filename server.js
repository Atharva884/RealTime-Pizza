const express = require('express')
const expresslayouts = require('express-ejs-layouts')
const path = require('path')

// Instantiate
const app = express()

// Port 
const port = process.env.PORT || 5000

// Paths
const public = path.join(__dirname, './public')
const view = path.join(__dirname, './resources/views')

// Public (Static) folder
app.use(express.static(public))

// Template Engine
app.set('view engine', 'ejs')
app.set('views', view)
// app.use(expresslayouts)

app.get('/', (req, res)=>{
    res.render("home")
})

// Listen
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})