const express = require('express')
const router = express.Router()
const userRouter = require('./user.routes.js')
const accountRouter = require('./account.routes.js')
router.use('/user', userRouter)
router.use('/account', accountRouter)

module.exports = router