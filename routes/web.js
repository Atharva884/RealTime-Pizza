const router = require('express').Router()
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customer/cartController')
const guest = require('../app/http/middleware/guest')

router.get('/', homeController.home)
router.get('/register', guest, authController.register)
router.post('/register', authController.postRegister)
router.get('/login', guest,authController.login)
router.post('/login', authController.postLogin)
router.post('/logout', authController.logout)

router.get('/cart', cartController.cart)
router.post('/updateCart', cartController.updateCart)


module.exports = router