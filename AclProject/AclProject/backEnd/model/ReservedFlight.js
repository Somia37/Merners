const mongoose = require('mongoose'); 
const Schema = mongoose.Schema ;

const reservedFlightSchema = new Schema ({ 
    flightNumberArrival: {
        type: String ,
        required : true ,
        trim: true ,
    },
    departureTimeArrival: {
        type: String ,
        required : true ,
        trim: true ,
       // length: 3
    },
    arrivalTimeArrival: {
        type: String ,
        required : true ,
        trim: true ,
        //length: 3
    },
    departureDateArrival: {
        type: Date ,
        required : true ,
        trim: true , 
    },
    arrivalDateArrival: {
        type: Date ,
        required : true ,
        trim: true , 
    },
    terminalArrival: {
        type: Number ,
        required : true ,
        trim: true 
    },
    
    airportArrival: {
        type: String ,
        required : true ,
        trim: true 
    },

    //return flight
    flightNumberReturn: {
        type: String ,
        required : true ,
        trim: true ,
    },
    departureTimeReturn: {
        type: String ,
        required : true ,
        trim: true ,
       // length: 3
    },
    arrivalTimeReturn: {
        type: String ,
        required : true ,
        trim: true ,
        //length: 3
    },
    departureDateReturn: {
        type: Date ,
        required : true ,
        trim: true , 
    },
    arrivalDateReturn: {
        type: Date ,
        required : true ,
        trim: true , 
    },
    terminalReturn: {
        type: Number ,
        required : true ,
        trim: true 
    },
    airportReturn: {
        type: String ,
        required : true ,
        trim: true 
    },
    from: {
        type: String ,
        required : true ,
        trim: true ,
    },
    to: {
        type: String ,
        required : true ,
        trim: true ,
    },
    cabin:{
        type: String,
        required: true ,
        trim: true
    },
    children:{
        type: Number,
        required: true ,
        trim: true
    },
    adults:{
        type: Number,
        required: true ,
        trim: true
    },
    price:{
        type: Number,
        required: true ,
        trim: true
    },
    userID:{
        type: String ,
        required : true ,
        trim: true ,
    }
  },
  {
      timestamps: true 
  })
  const reservedFlight = mongoose.model('ReservedFlight' , reservedFlightSchema);
  module.exports = reservedFlight ;