const userController = require('../../controllers/user.controller')
const Router = require('express').Router
const router = Router()

router.post('/signup', userController.signUp)
router.post('/login', userController.login)
router.get('/', userController.get_users)
router.delete('/deleteByEmail',userController.delete_users_by_email)
router.delete('/:_id', userController.delete_user)
module.exports = router