const {JWT_SECRET} = require('../config')
const jwt = require('jsonwebtoken')
function authMiddleWare (req,res,next){
    const authorization = req.headers.authorization
if((!authorization || authorization.startsWith('Bearer'))){
    res.json({message : "Something is wronWith the Token"})
}
const authHeaders = authorization.split('')[1]

try {
    const Validation = jwt.verify(authHeaders, JWT_SECRET)
    if(Validation.UserId){

        next()
    }else{
        res.status(401).json({
            message : "Something Wrong Occured"
        })
    }
} catch (error) {
    res.json({
        message : "Some Problem Occured While Verification", error
    })
}}
module.exports = {
    authMiddleWare
}