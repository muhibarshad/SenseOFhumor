const catchAsync = require('../utils/catchAsync')
const User = require('../model/userModel')
exports.createUser = catchAsync(async(req, res, next)=>{
    const newUser = await User.create({
        name : req.body.name, 
        email: req.body.email, 
        password:req.body.password,
        confirmPassword: req.body.confirmPassword
    })
    if(!newUser){
        res.status(500).json({
            status:'Error',
            requestAt : req.requestedAt,
        })
    }   
    res.status(201).json({
        status:'Success',
        requestAt : req.requestedAt,
        data:{
            newUser
        }
    })
})

exports.getAllUsers =catchAsync(async(req, res, next)=>{
    const allUsers=await User.find()
    if(!allUsers){
        res.status(500).json({
            status:'Error',
            requestAt : req.requestedAt,
        })
    }   
    res.status(200).json({
        status:'Success',
        requestAt : req.requestedAt,
        data:{
            allUsers
        }
    })
}) 