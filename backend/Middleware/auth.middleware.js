const JWT_SECRET= require('../config')
const jwt = require('jsonwebtoken')

// const JWT_SECRET =  "password122"
function authMiddleWare (req,res,next){
    const authHeaders = req.headers.authorization
    console.log(authHeaders)
if((!authHeaders || !authHeaders.startsWith('Bearer ' ))){
    console.log("Something is wrong with the token")
    res.json({message : "Something is wrong With the Token"})
}
const token = authHeaders.split(' ')[1];

try {
    const decoded  = jwt.verify(token , JWT_SECRET)
    // console.log("REACHED" ) 
    req.userId = decoded.userId;
    next()
} catch (error) {
    res.json({
        message : "Some Problem Occured While Verification", error
    })
}}
module.exports = {
    authMiddleWare
}