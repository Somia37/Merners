const router = require('express').Router();

let User = require('../model/User.js');

const express=require('express');
const userController=require('../Controller/UserController');
const userRouter=express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended: false}));


userRouter.get('/',userController.home);

userRouter.get('/user',userController.findUser);
userRouter.post('/login',userController.login);
userRouter.post('/register',userController.addUser);
userRouter.post('/updateUser',userController.updateUser);
userRouter.get('/getAllUsers',userController.getAllUsers);
userRouter.post('/changePassword',userController.changePassword);
userRouter.post('/addAdmin',userController.addAdmin);

module.exports=userRouter;
