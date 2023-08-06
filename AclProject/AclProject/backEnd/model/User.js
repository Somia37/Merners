const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema ;

const userSchema = new Schema ({
    username: {
        type: String ,
        required : true ,
        trim: true , 
        unique: true,
    },
    firstName: {
        type: String ,
        required : true ,
        trim: true , 
    },
    lastName: {
        type: String ,
        required : true ,
        trim: true , 
    }, 
    email: {
        type: String ,
        required : true ,
        unique: true ,
        trim: true ,
    },
    homeAddress: {
        type: String ,
        required : true ,
        trim: true ,
    },
    phoneNumber: {
        type: String ,
        required : true ,
        trim: true ,
    },
    passportNumber: {
        type: String ,
        required : true ,
        trim: true 
    },
    password: {
        type: String ,
        required : true ,
        trim: true ,
    },

    reservedFlights: {
        type: Array ,
        required : true ,
        trim: true , 
    },
    isAdmin:{
        type: Boolean,
        required: true,
    }
  },
  {
      timestamps: true ,
  })

  //encrypt passwords inside mongodb
  userSchema.pre('save' , async function (next){
      if(!this.isModified('password'))
        next();
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password,salt);  
  });


  const User = mongoose.model('User' , userSchema);

  module.exports = User ;