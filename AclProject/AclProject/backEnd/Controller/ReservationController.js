const Reservation = require('../model/Reservation');
const User = require('../model/User');

const home = (req, res) => {
    res.send('Hello world');
    res.end();
};

const addreservation = (req, res) => {
    ////console.log(req);
    //console.log('request came');
    //console.log(req.body);
   
    const reservation = new Reservation(
        {
            flight: "",
            user: "",
            adultsNumber: "",
            childrenNumber: "",
            totalPrice: "",
            classChoosen:"" ,
            seatsChoosen: []
           
        }
    );
    reservation.flight=req.body.flight;
    reservation.user=req.body.user;
    reservation.adultsNumber=req.body.adultsNumber;
    reservation.childrenNumber=req.body.childrenNumber;
    reservation.totalPrice=req.body.totalPrice;
    reservation.classChoosen=req.body.classChoosen;
    reservation.seatsChoosen=req.body.seatsChoosen;

    reservation.save().then((result) => {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    }).catch((err) => {
        //console.log(err);
        res.status(400).send("Address is needed");
    });
};

const findReservation = (req, res) => {
   
    var id = req.body._id 

    Reservation.findById(id).then((result) => {
        res.json(result); 
    }).catch((err) => { //console.log(err.message) 
    });
}

const findreservation = (req, res) => {
    var id2q = req.query
    var id3q = req.params
    var id4q = req.body
     //console.log(id4q);
     
    // //console.log(flight)
    for (var key in id4q) {
        if(key == "_idr")
            id4q={"_id":id4q._idr}
            else
            id4q={"_id":id4q._id}
    }
    Reservation.findOne(id4q).then((result) => {
        //console.log(result);
        res.json(result); 
    }).catch((err) => { //console.log(err)
     });
}


const deleteReservation=(req,res)=>{
   
    const qu={_id: req.body._id};

    Reservation.deleteOne(qu).then((result) => {
        //console.log("Deleted")

        }).catch((err) => { //console.log(err.message) 
        });
}


const userReservation=(req,res)=>{
    Reservation.find({user: req.body.user}).then((result) => {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
}

const reservations=(req,res)=>{
    
    Reservation.find().then((result)=>{
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
}


const updatereservation = (req, res) => {
    var id = req.body._id;
   
    Reservation.findOne({ _id: id }).then((result) => {
       
       result.adultsNumber=req.body.adultsNumber;
       result.childrenNumber=req.body.childrenNumber;
       result.totalPrice=req.body.totalPrice;
       result.seatsChoosen=req.body.seatsChoosen;
       result.classChoosen=req.body.classChoosen;


        

        result.save().then((result) => {
            res.send("update is done");
        }).catch((err) => {
            //console.log(err);
        })
    });
};

const updatereservation2 = (req, res) => {
    var id = req.body._id;
   
    Reservation.findOne({ _id: id }).then((result) => {
        result.flight=req.body.flight;
       result.adultsNumber=req.body.adultsNumber;
       result.childrenNumber=req.body.childrenNumber;
       result.totalPrice=req.body.totalPrice;
       result.seatsChoosen=req.body.seatsChoosen;
       result.classChoosen=req.body.classChoosen;


        

        result.save().then((result) => {
            res.send("update is done");
        }).catch((err) => {
            //console.log(err);
        })
    });
};

module.exports =
{
     home,
     addreservation,
     deleteReservation,
     userReservation,
     reservations,
     findReservation,
     findreservation,
     updatereservation,
     updatereservation2

     
}