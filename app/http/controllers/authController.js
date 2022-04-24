const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

exports.login = (req, res)=>{
    res.render('auth/login')
}

exports.register = (req, res)=>{
    res.render('auth/register')
}

exports.postRegister = async (req, res)=>{
    const {username, email, password} = req.body
    // console.log(req.body);
    // Validate
    if(!username || !email || !password){
        req.flash('error', 'All fields are required')
        req.flash('name', username)
        req.flash('email', email)
        res.redirect('/register')
    }

    // Check
    User.findOne({email: email}).then((err, result)=>{
        if(result){
            req.flash('error', 'Email already exist')
            req.flash('name', username)
            req.flash('email', email)
            res.redirect('/register')
        }
    })

    // Hashed Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const data = new User({
        username, email, password: hashedPassword
    })

    await data.save().then((err)=>{
        res.render('auth/login')
        if(err){
            return res.json(err)
        }
    })

}

exports.postLogin = async (req, res, next)=>{
    function reqUrl(req){
        return req.user.role == "admin" ? "admin/orders" : "customer/orders"
    }
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            req.flash('error', info.message )
            return next(err)
        }
        if(!user) {
            req.flash('error', info.message )
            return res.redirect('/login')
        }
        req.logIn(user, (err) => {
            if(err) {
                req.flash('error', info.message ) 
                return next(err)
            }

            return res.redirect(reqUrl(req))
        })
    })(req, res, next)
}

exports.logout = (req, res)=>{
    req.logout()
    return res.redirect('/login')    
}