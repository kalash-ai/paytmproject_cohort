const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const  JWT_SECRET  = require('../config')
const { User } = require('../db')
const { Account } = require('../db')
const zod = require('zod')
const { authMiddleWare } = require('../Middleware/auth.middleware')
const router = express.Router();
router.post('/signup', async (req, res) => {
    const Validation = zod.object({
        FirstName: zod.string(),
        LastName: zod.string(),
        username: zod.string(),
        password: zod.string()
    })
    const body = req.body
    const isValidated = Validation.safeParse(body)
    if (!isValidated) {
        res.json({

            Message: "Something Is Wrong With the inputs"
        
        })
    }
    const ExistedUser = await User.findOne({
        username: req.body.username
    })
    if (ExistedUser) {
        res.json({
            message: "User With the Following Username Already Exist!"
        })

    }
    const user = await User.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        username: req.body.username,
        password: req.body.password
    })
    if(user){
        console.log("Account Creation Success")
    }else{
        res.json({message : "Some problem occured"})
        console.log("Some problem occured while creating a user")
    }
    const userId = user._id

    await Account.create({
        userId ,
        balance : 1* Math.random()*1000

    })

    const token = await jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({
        message: "User Created Successfully",
        token: token

    })
})
const SigninBodyValidation = zod.object({
    username: zod.string(),
    password: zod.string()
})
router.post('/signin', async (req, res) => {
    const body = req.body
    const isSigninValidated = SigninBodyValidation.safeParse(body)
    if (!isSigninValidated) {
        res.json({ message: "Something Is Wrong With the Input" })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
     
        console.log(token)
        res.json({
            token: "Successfully Logged In ", token,
            userId : user._id

        })
        return;
    }
    res.status(411).json({ message: "Error While Loggin In!! Check The Parameters" })


})
const UserInformation = zod.object({
    firstname : zod.string(),
    lastname : zod.string(),
    password : zod.string()
})
router.put('/', authMiddleWare, async (req, res)=>{

    const {success} = UserInformation.safeParse(req.body)
    if(!success){
        res.json({
            message:"Error While Updating the information"
        })
    }
    await User.updateOne(req.body,{
        id: req.userId
        

    })
    res.json({
        message : "Update Successfully"
    })
})
router.get('/bulk', async(req,res)=>{
   try {
    const filter = req.query.filter || "";
     const users = await User.find({
         $or:[{
             FirstName:{
                 "$regex" : filter
             }
 
         },{
             LastName : {
                 "$regex" : filter
             }
         }]
     })
     if(!users){
         res.json({message : "No users Found with the given name"})
     }
     res.json({
         user: users.map(user => ({
             username: user.username,
             FirstName: user.FirstName,
             LastName: user.LastName,
             _id: user._id
         }))
     })
   } catch (error) {
    console.log("Some Error Occured While Searching for the USer" , error)
    res.json({message : "Some Error Occured While Searching for the user"})
    
   }
})
module.exports=  router