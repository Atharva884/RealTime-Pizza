const router = require('express').Router()
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customer/cartController')
const orderController = require('../app/http/controllers/customer/orderController')

const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')

router.get('/', homeController.home)
router.get('/register', guest, authController.register)
router.post('/register', guest, authController.postRegister)
router.get('/login', guest,authController.login)
router.post('/login', guest, authController.postLogin)
router.post('/logout', authController.logout)

router.get('/cart', cartController.cart)
router.post('/updateCart', cartController.updateCart)

router.post('/orders', auth, orderController.order)
router.get('/customer/orders', auth, orderController.index)


module.exports = router