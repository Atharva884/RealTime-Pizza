const router = require('express').Router()
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customer/cartController')

router.get('/', homeController.home)
router.get('/register', authController.register)
router.get('/login', authController.login)

router.get('/cart', cartController.cart)
router.post('/updateCart', cartController.updateCart)


module.exports = router