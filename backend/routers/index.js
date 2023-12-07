const Router = require('express').Router
const router = Router()
const userRouter = require('./api/user.router')
const productRouter = require('./api/product.router')
const orderRouter = require('./api/order.router')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)

module.exports = router