const Router = require('express').Router
const router = Router()
const userRouter = require('./api/user.router')
const productRouter = require('./api/product.router')

router.use('/user', userRouter)
router.use('/product', productRouter)

module.exports = router