const User=require('../model/User');
const bcrypt = require('bcryptjs');
const generateToken = require( "../utils/generateToken.js");

const home=(req,res)=>
{
    res.send('Hello world');
    res.end();
};

const addAdmin=(req,res)=>
{
    console.log('request came');
    console.log(req.body);
    const user=new User(
        {
            username : req.body.username,
            firstName: "x",
            lastName : "x",
            email:req.body.email,
            homeAddress: "x",
            phoneNumber : "x",
            passportNumber: 0,
            password:req.body.password,
            reservedFlights:[],
            isAdmin: true
        }
    );
    user.save().then((result)=>{
        res.json({
            _id: user._id,
            username : user.username,
            firstName: user.firstName,
            lastName : user.lastName,
            email:user.email,
            homeAddress: user.homeAddress,
            phoneNumber: user.phoneNumber,
            passportNumber: user.passportNumber,
            password:user.password,
            reservedFlights:user.reservedFlights,
            token: generateToken(user._id),
          });;
    }).catch((err)=>
    {
        console.log(err.message);
        res.status(400).send("Please fill in all the fields");
    });
};

const addUser=(req,res)=>
{
    console.log(req.body);
    
    User.findOne({username:req.body.username}).then((result)=>{
        if(result !== null)
        {
            console.log('Hello');
            res.json({username:null});
            return ;
        }
        
    })
    User.findOne({email:req.body.email}).then((result)=>{
        if(result !== null)
    {
        res.json({email:null});
        return ;
    }
        })
            const user=new User(
                {
                    username : req.body.username,
                    firstName: req.body.firstName,
                    lastName : req.body.lastName,
                    email:req.body.email,
                    homeAddress: req.body.homeAddress,
                    phoneNumber:req.body.phoneNumber,
                    passportNumber: req.body.passportNumber,
                    password:req.body.password,
                    reservedFlights:[],
                    isAdmin: false
                }
            );
            user.save().then((result)=>{
                res.json({
                    _id: user._id,
                    username : user.username,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    email:user.email,
                    homeAddress: user.homeAddress,
                    phoneNumber: user.phoneNumber,
                    passportNumber: user.passportNumber,
                    password:user.password,
                    reservedFlights:user.reservedFlights,
                    token: generateToken(user._id),
                  });
            })
};

const getAllUsers=(req,res)=>
{
    User.find().then((result)=>{
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
};


const findUser=(req,res)=>
{
    const qu={ _id: req.body._id };

    User.findOne(qu).then((result)=>{
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
};

const changePassword=(req,res)=>
{ 
    var id = req.body._id;
    User.findOne({ _id: id }).then((result) => {
        result.username = result.username;
        result.firstName= result.firstName;
        result.lastName = result.lastName;
        result.email = result.email;
        result.homeAddress = result.homeAddress;
        result.phoneNumber = result.phoneNumber;
        result.passportNumber = result.passportNumber;
        result.password = req.body.password;
        result.reservedFlights = result.reservedFlights;
        result.save().then((result) => {
            res.send({ user: result });
        }).catch((err) => {
            res.send(err.message);
        })
    });
};

const login= (req,res)=>
{
    const username = req.body.username ;
    const password = req.body.password ; 
    User.findOne({username: username},(err,user)=>{
        if(user)
        {
           bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) {
                  console.log(err.message);
                } else if (!isMatch) {
                    res.json({
                        password: null
                      });
                } else {
                    res.json({
                        _id: user._id,
                        username : user.username,
                        firstName: user.firstName,
                        lastName : user.lastName,
                        email:user.email,
                        homeAddress: user.homeAddress,
                        phoneNumber: user.phoneNumber,
                        passportNumber: user.passportNumber,
                        password:user.password,
                        reservedFlights:user.reservedFlights,
                        isAdmin : user.isAdmin,
                        token: generateToken(user._id),
                      });
                 }
              })
        }
        else{
            res.send({username:null})
        }
    })
}

const updateUser = (req, res) => {
    var id = req.body._id;
    console.log(req.body)
    User.findOne({ _id: id }).then((result) => {
        result.username = result.username;
        result.firstName= req.body.firstName;
        result.lastName = req.body.lastName;
        result.email = req.body.email;
        result.homeAddress =  req.body.homeAddress;
        result.phoneNumber = req.body.phoneNumber;
        result.passportNumber = req.body.passportNumber;
        result.password = req.body.password;
        result.reservedFlights = req.body.reservedFlights;
        result.save().then((result) => {
            res.send({ user: result });
        }).catch((err) => {
            res.send(err.message);
        })
    });
};



module.exports=
{
    home,
    addUser,
    addAdmin,
    getAllUsers,
    findUser,
    updateUser,
    login,
    changePassword
}