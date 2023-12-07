const orderController = require('../../controllers/order.controller')
const Router = require('express').Router
const router = Router()

router.post('/addOrder', orderController.add_order)
router.get('/getMyOrders', orderController.get_My_Orders)
router.get('/getOrders', orderController.get_Orders)
router.get('/:_id', orderController.get_Order_ById)
module.exports = router