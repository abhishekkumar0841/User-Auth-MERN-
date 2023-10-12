const express = require('express')
const { userSignup } = require('../controllers/userSignup')
const { userLogin } = require('../controllers/userLogin')
const { getUser } = require('../controllers/getUser')
const authMiddleware = require('../middlewares/authMiddleware')
const { userLogout } = require('../controllers/userLogout')

const userRoutes = express.Router()

userRoutes.post('/signup', userSignup)
userRoutes.post('/login', userLogin)
userRoutes.get('/user', authMiddleware, getUser)
userRoutes.get('/logout', authMiddleware, userLogout)

module.exports = userRoutes