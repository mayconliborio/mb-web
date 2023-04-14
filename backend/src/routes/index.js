const express = require('express')

const router = express.Router()
const { registerUser, getAllUsers } = require('../controllers/userController')

router.post('/registration', registerUser)
router.get('/users', getAllUsers)
router.get('/registration', (req, res) => {
  res.render('registration', { tipoPessoa: '' })
})

module.exports = router
