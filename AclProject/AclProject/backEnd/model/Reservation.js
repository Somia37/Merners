const mongoose = require('mongoose'); 
const { number } = require('prop-types');
const Schema = mongoose.Schema ;
const reservationSchema = new Schema ({ //the name of the columns shoukd always start in lower case
    flight: {
        type: String ,
        required : true ,
        trim: true 
        
    },
    user:{
        type: String ,
        required : true ,
        trim: true 
    },
    adultsNumber:{
        type: Number ,
        required : true ,
        trim: true 
    },
    childrenNumber:{
        type: Number ,
        required : true ,
        trim: true 
    },
    totalPrice:{
        type: Number ,
        required : true ,
        trim: true 
    },
    classChoosen:{
        type: String ,
        required : true ,
        trim: true 
    },
    seatsChoosen:{
        type: Array ,
        required : true ,
        trim: true 
    },
   
  },
  {
      timestamps: true 
  })

  const Reservation = mongoose.model('Reservation' , reservationSchema);

  module.exports = Reservation ;