const Router = require('express').Router
const router = Router()
const userRouter = require('./api/user.router')

router.use('/user', userRouter)

module.exports = router