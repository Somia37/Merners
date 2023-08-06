const Flight = require('../model/Flight');
const User = require('../model/User');
const Reservation = require('../model/Reservation');

const home = (req, res) => {
    res.send('Hello world');
    res.end();
};

const redSeats = (req, res) =>{
        ////console.log(req.body.params.seats.split(",").length);
        Flight.findOne({"_id":req.body.params._id}).then((result) => {
            for(let i=0; i<req.body.params.seats.split(",").length; i++){
                var s=Number(req.body.params.seats.split(",")[i])
                ////console.log(s)
                if(req.body.params.class === "First class")
                    result.firstSeatsAvailablePositions[s-1] = false;
                else if(req.body.params.class === "Economy class")
                    result.economySeatsAvailablePositions[s-1] = false;
                else if(req.body.params.class === "Business class")
                    result.businessSeatsAvailablePositions[s-1] = false;
            }

            if(req.body.params.class === "First class")
                result.firstSeatsAvailable -= req.body.params.seats.split(",").length;
            else if(req.body.params.class === "Economy class")
                result.economySeatsAvailable -= req.body.params.seats.split(",").length;
            else if(req.body.params.class === "Business class")
                result.businessSeatsAvailable -= req.body.params.seats.split(",").length;

//console.log(req.body.params.seats.split(",").length)
//console.log("hena1000")
//console.log(req.body.params.seats.split(","))

                result.save().then(() => {
                    ////console.log(result);
                    res.send("update is done");
                }).catch((err) => {
                    ////console.log(err);
                })
        }).catch((err) => { ////console.log(err) 
        });   

        
}

const greenSeats = (req, res) =>{
    //console.log("loooooooooooooooooool");
    Flight.findOne({"_id":req.body.flight}).then((result) => {
        var x = req.body.seatsChoosen ;
        //console.log(x);
        if(x.length >= 1)
            x = req.body.seatsChoosen[0].split(",");

        for(let i=0; i<  x.length ; i++)
        {
            var s= (x[i])
            if(req.body.classChoosen === "First class")
                result.firstSeatsAvailablePositions[s-1] = true;
            else if(req.body.classChoosen === "Economy class")
                result.economySeatsAvailablePositions[s-1] = true;
            else if(req.body.classChoosen === "Business class")
                result.businessSeatsAvailablePositions[s-1] = true;
        }

        if(req.body.classChoosen === "First class")
            result.firstSeatsAvailable += x.length;
        else if(req.body.classChoosen === "Economy class")
            result.economySeatsAvailable += x.length;
        else if(req.body.classChoosen === "Business class")
            result.businessSeatsAvailable += x.length;
            
            //console.log(x.length);

            result.save().then(() => {
                ////console.log(result);
                res.send("update is done");
            }).catch((err) => {
                ////console.log(err);
            })
    }).catch((err) => { ////console.log(err) 
    });   

    ////console.log("loooooooooooooooooool");
    
}



const chse = (req, res) =>{
console.log(req.body);

    Reservation.findOne({"_id":req.body.resid}).then((reser) => {
        // console.log(reser);
        Flight.findOne({"_id":reser.flight}).then((fli) => {
            var x = reser.seatsChoosen ;
            if(x.length >= 1){

             x = reser.seatsChoosen[0].split(",");
            }
            // console.log(x);
            // console.log(reser.classChoosen)
        if(reser.classChoosen === "First class")
            {fli.firstSeatsAvailable += x.length;}
        else if(reser.classChoosen === "Economy class")
           { fli.economySeatsAvailable += x.length;}
        else if(reser.classChoosen === "Business class")
           { fli.businessSeatsAvailable += x.length;}

          // console.log(fli.firstSeatsAvailable);

            for(let i=0; i<  x.length ; i++)
                {
                    var s= parseInt(x[i])
                    if(reser.classChoosen === "First class")
                        fli.firstSeatsAvailablePositions[s-1] = true;
                    else if(reser.classChoosen === "Economy class")
                        fli.economySeatsAvailablePositions[s-1] = true;
                    else if(reser.classChoosen === "Business class")
                        fli.businessSeatsAvailablePositions[s-1] = true;
                }
                console.log( fli.firstSeatsAvailablePositions);

                    
                fli.save().then(()=>{
                    //hnaaa bzbt kda
                    Flight.findOne({"_id":req.body.nfi}).then((fli2) => {
                        var x2 = req.body.seats.split(",") ;
                       
                        // console.log(fli2);
                        // console.log(x2);
                        // console.log(req.body.class)
                    if(req.body.class === "First class")
                        {fli2.firstSeatsAvailable -= x2.length;}
                    else if(req.body.class === "Economy class")
                       { fli2.economySeatsAvailable -= x2.length;}
                    else if(req.body.class === "Business class")
                       { fli2.businessSeatsAvailable -= x2.length;}
                       console.log(x2.length);
            
                       
            
                        for(let i=0; i<  x2.length ; i++)
                            {
                                var s2= parseInt(x2[i])
                                if(req.body.class === "First class")
                                    fli2.firstSeatsAvailablePositions[s2-1] = false;
                                else if(req.body.class === "Economy class")
                                    fli2.economySeatsAvailablePositions[s2-1] = false;
                                else if(req.body.class === "Business class")
                                    fli2.businessSeatsAvailablePositions[s2-1] = false;
                            }
                         //   console.log(fli2.economySeatsAvailable);
            fli2.save().then(()=>{res.send("done")}).catch((err)=>{///dyyyh
                console.log(err);
            });

                    }).catch((err)=>{});
                    console.log("done");}).catch((err)=>{///dyyyh
                    console.log(err);
                });

        }).catch((err)=>{
            console.log(err);
        });

    }).catch((err)=>{
        console.log(err);
    });
}
   

const addFlight = (req, res) => {
    ////console.log('request came');
    ////console.log(req.body);
    var firstSeatsAvailablePositions = [];
    var economySeatsAvailablePositions  = [];
    var businessSeatsAvailablePositions = [] ;
    for (let i = 0; i < req.body.firstSeatsAvailable; i++)
        firstSeatsAvailablePositions.push(true)
    for (let i = 0; i < req.body.economySeatsAvailable; i++)
        economySeatsAvailablePositions.push(true)
    for (let i = 0; i < req.body.businessSeatsAvailable; i++)
        businessSeatsAvailablePositions.push(true)
    const flight = new Flight(
        {
            flightNumber: req.body.flightNumber,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            departureDate: req.body.departureDate,
            arrivalDate: req.body.arrivalDate,
            terminal: req.body.terminal,
            firstSeatsAvailable: req.body.firstSeatsAvailable,
            firstSeatsLuggage: req.body.firstSeatsLuggage,
            firstSeatsPrice: req.body.firstSeatsPrice,
            economySeatsAvailable: req.body.economySeatsAvailable,
            economySeatsLuggage: req.body.economySeatsLuggage,
            economySeatsPrice: req.body.economySeatsPrice,
            businessSeatsAvailable: req.body.businessSeatsAvailable,
            businessSeatsLuggage: req.body.businessSeatsLuggage,
            businessSeatsPrice: req.body.businessSeatsPrice,
            airport: req.body.airport,
            from: req.body.from,
            to: req.body.to,
            firstSeatsAvailablePositions: firstSeatsAvailablePositions,
            economySeatsAvailablePositions: economySeatsAvailablePositions,
            businessSeatsAvailablePositions: businessSeatsAvailablePositions

        }
    );
    flight.save().then((result) => {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    }).catch((err) => {
        ////console.log(err);
        res.status(400).send("Address is needed");
    });
};



const getAllFlights = (req, res) => {
    Flight.find().then((result) => {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
};




const findFlight = (req, res) => {
    var id2q = req.query
  
     ////console.log(id2q);
     
    // ////console.log(flight)
    for (var key in id2q) {
        if(key == "_idr")
            id2q={"_id":id2q._idr}
            else
            id2q={"_id":id2q._id}
    }
    Flight.findOne(id2q).then((result) => {
        res.json(result); 
    }).catch((err) => { ////console.log(err) 
    });
}

const findFlight3=(req,res)=>{
    
    Flight.findOne({_id : req.body.flight}).then((result) => {
        ////console.log(req.body.flight);
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
}


const updateFlight=(req,res)=>{        // NOT NEEDED
//////console.log(req);body
const qu={ _id: req.body._id }
Flight.findOneAndUpdate(qu).then((result) => {
     ////console.log(result)
}).catch((err) => { ////console.log(err) 
});


}

const updateFlight2 = (req, res) => {
    var id = req.body._id;
    //////console.log(req.params);
   
    Flight.findOne({ _id: id }).then((result) => {
        ////console.log("lolllll")
        ////console.log(req.body.firstSeatsAvailable);
        ////console.log(result.firstSeatsAvailable);
       
    
        if(req.body.firstSeatsAvailable!=result.firstSeatsAvailable){
            ////console.log("firsttttttttttttt")
            var firstSeatsAvailablePositions = [];
            for (let i = 0; i < req.body.firstSeatsAvailable; i++)
                firstSeatsAvailablePositions.push(true)
            result.firstSeatsAvailablePositions= firstSeatsAvailablePositions;}
        if(req.body.economySeatsAvailable!=result.economySeatsAvailable){
            ////console.log("ecooooooooooooooo")
            var economySeatsAvailablePositions  = [];
            for (let i = 0; i < req.body.economySeatsAvailable; i++)
                economySeatsAvailablePositions.push(true)
            result.economySeatsAvailablePositions= economySeatsAvailablePositions;}
        if(req.body.businessSeatsAvailable!=result.businessSeatsAvailable){
            ////console.log("busssssssssssssssss")
            var businessSeatsAvailablePositions = [] ;
            for (let i = 0; i < req.body.businessSeatsAvailable; i++)
                businessSeatsAvailablePositions.push(true)
            result.businessSeatsAvailablePositions= businessSeatsAvailablePositions;}
        result.flightNumber = req.body.flightNumber;
        result.departureTime = req.body.departureTime;
        result.arrivalTime = req.body.arrivalTime;
        result.departureDate = req.body.departureDate;
        result.arrivalDate = req.body.arrivalDate;
        result.terminal=req.body.terminal;
        result.firstSeatsAvailable = req.body.firstSeatsAvailable;
        result.firstSeatsLuggage = req.body.firstSeatsLuggage;
        result.firstSeatsPrice = req.body.firstSeatsPrice;
        result.economySeatsAvailable = req.body.economySeatsAvailable;
        result.economySeatsLuggage = req.body.economySeatsLuggage;
        result.economySeatsPrice = req.body.economySeatsPrice;
        result.businessSeatsAvailable = req.body.businessSeatsAvailable;
        result.businessSeatsLuggage = req.body.businessSeatsLuggage;
        result.businessSeatsPrice = req.body.businessSeatsPrice;
        result.airport = req.body.airport;
        result.from = req.body.from;
        result.to = req.body.to;
       

        

        result.save().then((result) => {
            res.send("update is done");
        }).catch((err) => {
            ////console.log(err);
        })
    });
};






const findFlight2 = (req, res) => {

    const id2 = req.query._id
    const id2q = req.query
    //////console.log(id2q)
    //////console.log(id2)

    Flight.findOne(id2q).then((result) => {
        ////console.log(result)
        res.flightNumber = result.flightNumber;
        res.departureTime = result.departureTime;
        res.arrivalTime = result.arrivalTime;
        res.departureDate = result.departureDate;
        res.arrivalDate = result.arrivalDate;
        res.terminal=result.terminal;
        res.firstSeatsAvailable = result.firstSeatsAvailable;
        res.EconomySeatsAvailable = result.EconomySeatsAvailable;
        res.BusinessSeatsAvailable = result.BusinessSeatsAvailable;
        res.airport = result.airport;
        res.from = result.from;
        res.to = result.to;
        // ////console.log(res)
    }).catch((err) => { ////console.log(err) 
    });
}


const deleteFlight=(req,res)=>{
    ////console.log("I'm in")
   
    const qu={ _id: req.body._id };

    ////console.log(qu);

    
        

    Flight.findOne(qu).then((result) => {
        ////console.log(result)
        Flight.deleteOne(qu, function(err, obj) {
            if (err) throw err;
            ////console.log("1 document deleted");
        })
         }).catch((err) => { ////console.log(err)
         });
   
   
   }



const getsearchFlight=(req,res)=>
{
   
    ////console.log(req.query);
    ////console.log(req.params);
    ////console.log(req.body);
    const qu =req.query
    ////console.log(qu);
    //////console.log(qu.flight);
    Flight.find(qu).then((result) => {
        ////console.log(result+'hnaaaaaaa');
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    })
   
    

    .catch((err)=>{////console.log(err)
    });
   
};

const getusersearchFlight=(req,res)=>
{
   
    ////console.log(req.query);

   
    const qu =req.query
    ////console.log(qu);
    //////console.log(qu.flight);
    Flight.find(qu).then((result) => {
        //////console.log(result+'hnaaaaaaa');
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    })
   
    

    .catch((err)=>{////console.log(err)
    });
   
};



module.exports =
{
    home,
    addFlight,
    getAllFlights,
    findFlight,
    updateFlight,
    updateFlight2,
    findFlight2,
    getsearchFlight,
    deleteFlight,
    redSeats,
    getusersearchFlight,
    greenSeats,
    findFlight3,
    chse
}