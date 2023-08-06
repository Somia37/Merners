//using express
const express=require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const mongoose=require('mongoose');

const { v4: uuidv4 } = require('uuid');

require('dotenv').config();



const userRouter=require('./routes/UserRoutes');
const User=require('./model/User.js');
const flightRouter=require('./routes/FlightRoutes');
const Flight=require('./model/Flight.js');
const reservationRouter=require('./routes/ReservationRoutes');
const Reservation=require('./model/Reservation.js');

const reservedFlightRouter=require('./routes/ReservedFlightRoutes');
const ReservedFlight=require('./model/ReservedFlight.js');




const uri = process.env.ATLAS_URI ;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/users',userRouter);
app.use('/flights',flightRouter);
app.use('/reservedFlights',reservedFlightRouter);
app.use('/reservations',reservationRouter);

app.post("/sendMail" , cors() , async(req,res)=>{
    let text = req.body.mailContent;
    const transport = nodemailer.createTransport({
        service: "hotmail",
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

   try{
    await transport.sendMail({
        from : process.env.MAIL_USER,
        to: req.body.email,
        subject:req.body.subject,
        html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>GUC Airlines</h2>
        <p>${text}</p>
    
        <p>All the best, GUC Airlines</p>
         </div>`
    })

   }
   catch(err)
   {
       console.log(err.message);
   }

})

app.post("/payment", (req,res)=>{
    const {price,to,token} = req.body ;

    const idempontencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email , 
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            amount: price * 100,
            currency:"eur",
            customer: customer.id,
            receipt_email: token.email,
            description: `Flight to ${to} Payment`
        },{idempontencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err=> console.log(err))
})

app.post("/create-payment-intent", async (req, res) => {
    const flight= req.body.flight;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: flight.price,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    }).status;
  
    res.send({
        clientSecret: paymentIntent.client_secret
    });
  });

const port = process.env.PORT || "8000";

app.listen(port , () => {
    console.log(`server is running on port: ${port}`);
})









