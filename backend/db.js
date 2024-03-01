const mongoose = require('mongoose')
const express = require('express')
mongoose.connect('mongodb+srv://kalashharode28:pNtzdmhShLzsiCgW@cluster0.hppbcof.mongodb.net/paytm2')
const userSchema = new mongoose.Schema({
    FirstName  : {
        type : String,
        required : true,
        lowerCase : true,
        
    },
    LastName : {

        type : String,
            required : true,
            lowerCase : true,
            
    },
    username :{
        type : String,
        required : true,
        lowerCase : true,
        
    },
    Password : {
        type : String,
        required : true,
        lowerCase : true,
        
    } 
    
})
const accountSchema = new mongoose.Schema({
userId :{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true
},
balance :{
 type : Number,
required : true
}
})

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);
module.export ={
    User,
    Account
}