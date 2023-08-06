const Flight = require('../model/ReservedFlight');
const Flightx = require('../model/Flight');

const addFlight = (req, res) => {
    const flight = new Flight(
        {
            //Arrival
            flightNumberArrival : req.body.flightNumberArrival,
            departureTimeArrival: req.body.departureTimeArrival,
            arrivalTimeArrival: req.body.arrivalTimeArrival,
            departureDateArrival: req.body.departureDateArrival,
            arrivalDateArrival: req.body.arrivalDateArrival,
            terminalArrival: req.body.terminalArrival,
            airportArrival: req.body.airportArrival,

            //Return 
            flightNumberReturn : req.body.flightNumberReturn,
            departureTimeReturn: req.body.departureTimeReturn,
            arrivalTimeReturn: req.body.arrivalTimeReturn,
            departureDateReturn: req.body.departureDateReturn,
            arrivalDateReturn: req.body.arrivalDateReturn,
            terminalReturn: req.body.terminalReturn,
            airportReturn: req.body.airportReturn,

            from: req.body.from,
            to: req.body.to,
            cabin : req.body.cabin,
            children: req.body.children,
            adults : req.body.adults,
            price : req.body.price, 
            userID: req.body.userID
        }
    );
    
    var economy = 0 ;
    var first = 0 ;
    var buisness = 0 ;
    const seats = req.body.adults + req.body.children;
    const cabin = req.body.cabin;
    if(cabin === 'First')
        economy =  seats;
    else if(cabin === 'Buisness')
        first = seats ;
    else
        buisness = seats  

    //Arrival
    Flightx.findOne({flightNumber: req.body.flightNumberArrival }).then((resu) => {
           

        resu.economySeatsRemaining  = resu.economySeatsRemaining  - economy ;
        resu.firstSeatsRemaining = resu.firstSeatsRemaining - first ;
        resu.businessSeatRemaining  = resu.businessSeatRemaining  - buisness ;
        
        resu.save().then((resu) => {
        }).catch((err) => {
            console.log(err.message);
        })
    });

    //Return
    Flightx.findOne({flightNumber: req.body.flightNumberReturn }).then((resu) => {
        
        resu.economySeatsRemaining  = resu.economySeatsRemaining  - economy ;
        resu.firstSeatsRemaining = resu.firstSeatsRemaining - first ;
        resu.businessSeatRemaining  = resu.businessSeatRemaining  - buisness ;
        
        resu.save().then((resu) => {
        }).catch((err) => {
            console.log(err.message);
        })
    });
    flight.save().then((result) => {
        res.send({message:"Flight is booked"})
    }).catch((err) => {
        console.log(err.message);
    });
    
};

const getAllUserFlights = (req, res) => {
    Flight.find({userID: req.body.userID}).then((result) => {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
};

const findFlight = (req, res) => {
    const id2q = req.query
    Flight.findOne(id2q).then((result) => {
        res.json(result); 
    }).catch((err) => { console.log(err) });
}


const updateFlight=(req,res)=>{
const qu={ _id: req.body._id }
Flight.findOneAndUpdate(qu).then((result) => {
     console.log(result)
}).catch((err) => { console.log(err) });


}



const deleteUserFlight= async (req,res)=>{
   
    const qu={_id: req.body._id};
    
    //Arrival
    var flightNumberArrival = "";
    var economy = 0 ;
    var first = 0 ;
    var buisness = 0 ;
    var cabin = "";
    var seats = 0 ;
     
    //Return
    var flightNumberReturn = "";

   await Flight.findOne(qu).then((result) => {
     
    //Arrival
    flightNumberArrival = result.flightNumberArrival ;
    seats = result.children + result.adults;
    if(cabin === 'First')
        economy =  seats;
    else if(cabin === 'Buisness')
        first = seats ;
    else
        buisness = seats 

    //Return
    flightNumberReturn = result.flightNumberReturn ; 
   
    Flight.deleteOne(qu, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
        })
         }).catch((err) => { console.log(err.message) });

    //Arrival     
    Flightx.findOne({ flightNumber: flightNumberArrival}).then((resu) => {
        resu.flightNumber = resu.flightNumber;
        resu.departureTime = resu.departureTime;
        resu.arrivalTime = resu.arrivalTime;
        resu.departureDate = resu.departureDate;
        resu.arrivalDate = resu.arrivalDate;
        resu.terminal= resu.terminal;
        resu.firstSeatsAvailable = resu.firstSeatsAvailable;
        resu.economySeatsAvailable =  resu.economySeatsAvailable;
        resu.businessSeatsAvailable = resu.businessSeatsAvailable;
        resu.airport = resu.airport;
        resu.from = resu.from ;
        resu.to = resu.to;
        var x = resu.firstSeatsRemaining + first ;
        resu.firstSeatsRemaining = x;
        var y = resu.economySeatsRemaining + economy;
        resu.economySeatsRemaining = y ;
        var z = resu.businessSeatRemaining + buisness;
        resu.businessSeatRemaining = z;
        resu.save().then((result) => {
                res.send(result);
            }).catch((err) => {
                console.log(err.message);
            })
        });

        //Return
        Flightx.findOne({ flightNumber: flightNumberReturn}).then((resu) => {
            resu.flightNumber = resu.flightNumber;
            resu.departureTime = resu.departureTime;
            resu.arrivalTime = resu.arrivalTime;
            resu.departureDate = resu.departureDate;
            resu.arrivalDate = resu.arrivalDate;
            resu.terminal= resu.terminal;
            resu.firstSeatsAvailable = resu.firstSeatsAvailable;
            resu.economySeatsAvailable =  resu.economySeatsAvailable;
            resu.businessSeatsAvailable = resu.businessSeatsAvailable;
            resu.airport = resu.airport;
            resu.from = resu.from ;
            resu.to = resu.to;
            var x = resu.firstSeatsRemaining + first ;
            resu.firstSeatsRemaining = x;
            var y = resu.economySeatsRemaining + economy;
            resu.economySeatsRemaining = y ;
            var z = resu.businessSeatRemaining + buisness;
            resu.businessSeatRemaining = z;
            resu.save().then((result) => {
                    res.send("Returnn flight is deleted ");
                }).catch((err) => {
                    console.log(err.message);
                })
            });
   }



const getsearchFlight=(req,res)=>
{
    const qu =req.query;
    Flight.find(qu).then((result) => {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    })
    .catch((err)=>{console.log(err.message)});
   
};


module.exports =
{
    addFlight,
    getAllUserFlights,
    findFlight,
    updateFlight,
    getsearchFlight,
    deleteUserFlight
}