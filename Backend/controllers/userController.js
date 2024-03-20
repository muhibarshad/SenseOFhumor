const catchAsync = require('../utils/catchAsync')
const User = require('../model/userModel')
const AppError = require('../utils/appError')
exports.createUser = catchAsync(async(req, res, next)=>{
    const newUser = await User.create({
        name : req.body.name, 
        email: req.body.email, 
        password:req.body.password,
        confirmPassword: req.body.confirmPassword
    })
    if(!newUser){
       return new AppError('User does not form', 404)
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
      return  new AppError("No any user found", 404)
    }   
    res.status(200).json({
        status:'Success',
        requestAt : req.requestedAt,
        data:{
            allUsers
        }
    })
}) 

exports.authUser = (req, res) => {
    res.status(200).json({
      status: 'success',
      data:{
        user: req.user
      }
    });
};

exports.deleteUser = catchAsync(async(req, res, next)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        return new AppError('No user found with this id', 404)
    }
    res.status(204).json({
        status:'success',
        requestedAt: req.requestAt,
        data:null
    })
})