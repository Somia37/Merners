const express=require('express');
const flightController=require('../Controller/FlightController');
const flightRouter=express.Router();
flightRouter.use(express.json());
flightRouter.use(express.urlencoded({extended: false}));




flightRouter.get('/',flightController.home);

flightRouter.get('/get',flightController.getAllFlights);
flightRouter.post('/create',flightController.addFlight);
flightRouter.post('/update',flightController.updateFlight2);
flightRouter.get('/flight',flightController.findFlight);
flightRouter.post('/delete',flightController.deleteFlight);
flightRouter.get('/search',flightController.getsearchFlight);
flightRouter.get('/usersearch',flightController.getusersearchFlight);
flightRouter.post('/redSeats',flightController.redSeats);
flightRouter.post('/greenSeats',flightController.greenSeats);
flightRouter.post('/chse',flightController.chse);

flightRouter.post('/flightById',flightController.findFlight3);

module.exports=flightRouter;