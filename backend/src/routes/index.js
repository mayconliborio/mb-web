const express = require('express')

const router = express.Router()
const { registerUser, getAllUsers } = require('../controllers/userController')

router.post('/registration', registerUser)
router.get('/users', getAllUsers)

module.exports = router
