const express=require('express');
const reservedFlightController=require('../Controller/ReservedFlightController');
const reservedFlightRouter=express.Router();
reservedFlightRouter.use(express.json());
reservedFlightRouter.use(express.urlencoded({extended: false}));




reservedFlightRouter.post('/getUserReserved',reservedFlightController.getAllUserFlights);
reservedFlightRouter.post('/reserve',reservedFlightController.addFlight);
reservedFlightRouter.get('/Findflight',reservedFlightController.findFlight);
reservedFlightRouter.post('/deleteUserFlight',reservedFlightController.deleteUserFlight);



module.exports=reservedFlightRouter;