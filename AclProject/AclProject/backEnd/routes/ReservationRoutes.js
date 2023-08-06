const express=require('express');
const reservationController=require('../Controller/ReservationController');
const reservationRouter=express.Router();
reservationRouter.use(express.json());
reservationRouter.use(express.urlencoded({extended: false}));


reservationRouter.post('/create',reservationController.addreservation);

reservationRouter.post('/getReservation',reservationController.userReservation);
reservationRouter.get('/allres',reservationController.reservations);
reservationRouter.post('/cancel',reservationController.deleteReservation);
reservationRouter.get('/reservation',reservationController.findReservation);
reservationRouter.post('/Reservation',reservationController.findreservation);
reservationRouter.post('/update',reservationController.updatereservation);
reservationRouter.post('/update2',reservationController.updatereservation2);


module.exports=reservationRouter;