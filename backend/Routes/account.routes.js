const { Account } = require('../db')
const express = require('express')
const { authMiddleWare } = require('../Middleware/auth.middleware')
const {default : mongoose} = require('mongoose')
const accountrouter = express.Router();

accountrouter.get('/balance',authMiddleWare,  async (req, res) => {
    const AccountBalance =  await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: AccountBalance.balance
    })
})
accountrouter.post('/transfer', authMiddleWare, async (req, res) => {
    const session = await mongoose.startSession()
   session.startTransaction()
    const amount = req.body.amount
    const to = req.body.to
    const account = await Account.findOne({
        userId: req.userId
    }).session(session)
    if (!account || account.balance < amount) {
        await session.abortTransaction()
        return res.json({ message: "Insufficient Balance" })
    }
    const toAccount = await Account.findOne({ userId: to }).session(session)
    if (!toAccount) {
        await session.abortTransaction()
        return res.json({ message: "Invalid Account" })

    }

await Account.updateOne({ userId: req.userId }, { $inc: { balance: -  amount } }).session(session)
await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)


await session.commitTransaction()
res.json({
    message: "transfer Successful"
})

})
module.exports = accountrouter;