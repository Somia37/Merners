# GUCAirlines
* It is an airline reservation system which allow users to reserve tickets to fly globally or domestically and the admin is allowed to manage flights such as creating flights, deleting old ones and searching for flights.

## Motivation
* A University Project to help us in web developments and applying the concepts we studied as software engineers

## Code Style
* The code of the frontend (React) was written using functions 

## Screenshots
 * Admin
![image](https://user-images.githubusercontent.com/79222411/147392202-a61434cd-3a60-4d9e-82f1-ce1bd09a7127.png)
![image](https://user-images.githubusercontent.com/79222411/147392262-1a71d21b-50a0-4dba-8edc-05aa4b3e049a.png)
![image](https://user-images.githubusercontent.com/79222411/147392270-12a06312-c289-43ba-975f-87795de322c0.png)
![image](https://user-images.githubusercontent.com/79222411/147392287-9cadbf12-66e2-4689-a1a5-51959d95a078.png)

* User
![image](https://user-images.githubusercontent.com/79222411/147392297-2036fb46-351b-4dba-9baa-621d6d62cecb.png)
![image](https://user-images.githubusercontent.com/79222411/147392371-70efd0fd-dc89-4481-9397-aa717862fe13.png)
![image](https://user-images.githubusercontent.com/79222411/147392339-f24f7af8-67ca-41c2-8ac0-4b385cc54d0a.png)
![image](https://user-images.githubusercontent.com/79222411/147392343-08d5d1bb-19f3-44bb-be34-654a4046d9df.png)
![image](https://user-images.githubusercontent.com/79222411/147392351-ae51e650-57b7-45de-96c3-1daa692399a7.png)
![image](https://user-images.githubusercontent.com/79222411/147392357-73e18d0c-0728-4bf2-8f4c-430218952e9d.png)
![image](https://user-images.githubusercontent.com/79222411/147392359-7c6b57e6-c428-4dc0-b481-5f56c3e30199.png)
![image](https://user-images.githubusercontent.com/79222411/147392461-7a126871-9ec3-423c-a1a3-af9e688f1c4c.png)
![image](https://user-images.githubusercontent.com/79222411/147392475-88ef3e68-451a-44e5-b06f-71b11e7c1274.png)

* Registering
 ![image](https://user-images.githubusercontent.com/79222411/147392566-a46ed0de-0909-4709-a115-07f6c5b066e5.png)



## Framework used
* MERN (mongodb-express-react-nodejs) Stack

## Features
 ### Routes
 
 ### 1-Admin Functionalities
  * #### The Admin should be able to create a flight:
     *  Functionality : creating a flight
     *  Route Backend : http://localhost:8000/flights/create
     *  Request type : POST
     *  Response: Message of creation success
     *  Request body: {
        "flightNumber":"137",
        "departureTime":"14:00",
        "arrivalTime":"17:00",
        "departureDate":"27/01/2022",
        "arrivalDate":"14/02/2022",
        "terminal":"3",
        "firstSeatsAvailable":"50",
        "firstSeatsLuggage":"2",
        "firstSeatsPrice":"1500",
        "economySeatsAvailable":"60",
        "economySeatsLuggage":"3",
        "economySeatsPrice":"500",
        "businessSeatsAvailable":"20",
        "businessSeatsLuggage":"1",
        "businessSeatsPrice":"1000",
        "airport":"CAI",
        "from":"Cairo",
        "to":"Finland"}

  ***


  * #### The Admin should be able to search for flight/s:
      *  Functionality : searching for flight/s
      *  Route Backend : http://localhost:8000/flights/search
      *  Route Frontend: http://localhost:3000/search/:user_id
      *  Request type : GET
      *  Response : All Flights with all details Example: {
        "_id": "61aa72ee141edfedf9ad6322",
        "flightNumber": "123",
        "departureTime": "01:30",
        "arrivalTime": "03:30",
        "departureDate": "2021-12-05T00:00:00.000Z",
        "arrivalDate": "2021-12-05T00:00:00.000Z",
        "terminal": 1,
        "firstSeatsAvailable": 15,
        "firstSeatsLuggage": 51,
        "firstSeatsPrice": 3002,
        "economySeatsAvailable": 118,
        "economySeatsLuggage": 26,
        "economySeatsPrice": 1751,
        "businessSeatsAvailable": 61,
        "businessSeatsLuggage": 36,
        "businessSeatsPrice": 2498,
        "airport": "airport",
        "from": "Cairo",
        "to": "Alex",
        "firstSeatsAvailablePositions": [true,false,false,false,true,true,false,false,true,true,true,true,true,false,true,true,true,true,true,true,true],
        "economySeatsAvailablePositions": [false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true
        ],
        "businessSeatsAvailablePositions":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true, true,true,true,true,true,true,true,true, true,true,true,true,true]}

***

  * #### The Admin should be able to view all flights without search criteria:
      *  Functionality : viewing flights
      *  Route Backend: http://localhost:8000/flights/get
      *  Route Frontend:http://localhost:3000/Home/:user_id
      *  Request type : GET
      *  Response : Flight object Example :  "_id": "61aa72ee141edfedf9ad6322",
        "flightNumber": "123",
        "departureTime": "01:30",
        "arrivalTime": "03:30",
        "departureDate": "2021-12-05T00:00:00.000Z",
        "arrivalDate": "2021-12-05T00:00:00.000Z",
        "terminal": 1,
        "firstSeatsAvailable": 15,
        "firstSeatsLuggage": 51,
        "firstSeatsPrice": 3002,
        "economySeatsAvailable": 118,
        "economySeatsLuggage": 26,
        "economySeatsPrice": 1751,
        "businessSeatsAvailable": 61,
        "businessSeatsLuggage": 36,
        "businessSeatsPrice": 2498,
        "airport": "airport",
        "from": "Cairo",
        "to": "Alex",
        "firstSeatsAvailablePositions": [true,false,false,false,true,true,false,false,true,true,true,true,true,false,true,true,true,true,true,true,true],
        "economySeatsAvailablePositions": [false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true
        ],
        "businessSeatsAvailablePositions":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true, true,true,true,true,true,true,true,true, true,true,true,true,true]}

***

 * #### The Admin should be able to update a flight:
      *  Functionality : update flight
      *  Route Backend: http://localhost:8000/flights/update
      *  Route Frontend:http://localhost:3000/Home/:user_id
      *  Request type :POST
      *  Request body:  {
        "flightNumber":"246",
        "departureTime":"14:00",
        "arrivalTime":"17:00",
        "departureDate":"27/01/2022",
        "arrivalDate":"14/02/2022",
        "terminal":"3",
        "firstSeatsAvailable":"50",
        "firstSeatsLuggage":"2",
        "firstSeatsPrice":"1500",
        "economySeatsAvailable":"60",
        "economySeatsLuggage":"3",
        "economySeatsPrice":"500",
        "businessSeatsAvailable":"20",
        "businessSeatsLuggage":"1",
        "businessSeatsPrice":"1000",
        "airport":"CAI",
        "from":"Cairo",
        "to":"Croatia"}

      *  Response : A message informing that updating is done successfully

***

  * #### The Admin should be able to delete any flight:
     *  Functionality : deleting a flight
     *  Route Backend : http://localhost:8000/flights/delete
     *  Route Frontend: http://localhost:3000/Home/:user_id
     *  Request type : POST
     *  Response: Message of creation success
     *  Request body: {
        "flightNumber":"137",
        "departureTime":"14:00",
        "arrivalTime":"17:00",
        "departureDate":"27/01/2022",
        "arrivalDate":"14/02/2022",
        "terminal":"3",
        "firstSeatsAvailable":"50",
        "firstSeatsLuggage":"2",
        "firstSeatsPrice":"1500",
        "economySeatsAvailable":"60",
        "economySeatsLuggage":"3",
        "economySeatsPrice":"500",
        "businessSeatsAvailable":"20",
        "businessSeatsLuggage":"1",
        "businessSeatsPrice":"1000",
        "airport":"CAI",
        "from":"Cairo",
        "to":"Finland"}
        
   ***
   
   
 ### 2-Guest/ExistingUser Functionalities
  * #### The ExistingUser should be able to search for a departure/return flight:
     *  Functionality : searching for a flight
     *  Route Backend: http://localhost:8000/flights/usersearch
     *  Rote Frontend:http://localhost:3000/usersearchflights/userid
     *  Request type : GET
     *  Request body:{ "number of passengers": "2", "airport":"CAI" , "terminals":"2", "departure date":"25/12/2021", "arrival date":"1/1/2022","cabin":"first"}
     *  Response: All flights available matching the search criteria
***
* #### The Guest should be able to search for a departure/return flight:
     *  Functionality : searching for a flight
     *  Route Backend :  http://localhost:8000/flights/usersearch
     *  Route Frontend: http://localhost:3000/guestsearchflights
     *  Request type : GET
     *  Request body:{ "number of passengers": "2", "airport":"CAI" , "terminals":"2", "departure date":"25/12/2021", "arrival date":"1/1/2022","cabin":"first"}
     *  Response: All flights available matching the search criteria
           	
   ***
   
 * #### The ExistingUser should be able to see details of any departure/return flight:
    *  Functionality : viewing details of flight
    *  Route Backend:  http://localhost:8000/flights/flight
    *  Route Frontend: http://localhost:3000/showDetails/:_id/:user_id
    *  Request type : GET
    *  Response: Details of selected flight
      
   ***
   
 * #### The GuestUser should be able to see details of any departure/return flight:
    *  Functionality : viewing details of flight
    *  Route Backend:  http://localhost:8000/flights/flight
    *  Route Frontend: http://localhost:3000/showDetailsGuest/:_id
    *  Request type : GET
    *  Response: Details of selected flight
      
   ***
   
  
 * #### The ExistingUser should be able to see details of to be reserved departure and return flights:
    *  Functionality : summery of reserved flights
    *  Route Backend: http://localhost:8000/flights/flight
    *  Route Frontend: http://localhost:3000/FinalSumm/:_id/:class/:seats/:totalseats/:adnod/:chnod/:tnopd/:_idr/:classr/:seatsr/:totalseatsr/:adnor/:chnor/:tnopr/:user_id
    *  Request type : GET
    *  Response: Details of to be reserved flights

***

  * #### The GuestUser should be able to see details of to be reserved departure and return flights:
    *  Functionality : summery of reserved flights
    *  Route Backend: http://localhost:8000/flights/flight
    *  Route Frontend: http://localhost:3000/FinalSummGuest/:_id/:class/:seats/:totalseats/:adnod/:chnod/:tnopd/:_idr/:classr/:seatsr/:totalseatsr/:adnor/:chnor/:tnopr
    *  Request type : GET
    *  Response: Details of to be reserved flights

***

  * #### The ExistingUser should be able to cancel departure and return flights before confirming reservation:
     *  Functionality : summery of reserved flights
     *  Route Frontend: http://localhost:3000/Home/:user_id
     *  Request type : POST
     *  Response: confirmation message
***

* #### The GuestUser should be able to cancel departure and return flights before confirming reservation:
     *  Functionality : summery of reserved flights
     *  Route Frontend: http://localhost:3000/Home/GuestHomePage
     *  Request type : POST
     *  Response: confirmation message
***

 * #### The ExistingUser should be able to login:
     *  Functionality : logging in
     *  Route Backend: http://localhost:8000/users/login
     *  Route Frontend: http://localhost:3000/Home/:user_id
     *  Request type :POST
     *  Request body:{"username":"Laila","password":123}
     *  Response: message of logging in successfully
    
  ***  
     
  * #### The ExistingUser should be able to update his/her profile:
     *  Functionality : updating profile
     *  Route backend : http://localhost:8000/users/updateUser
     *  Route Frontend:  http://localhost:3000/homePageUser/:user_id
     *  Request type :POST
     *  Request body:{"username":"Laila","first Name":"Laila","Last Name":"Ayman","email":123@gmail.com}
     *  Response: message of update is done successfully

***

 * #### The ExistingUser should be able to change his/her password:
     *  Functionality : changing password
     *  Route backend: http://localhost:8000/users/changePassword
     *  Route frontend:http://localhost:3000/changePassword/:user_id
     *  Request type :POST
     *  Request body:{"oldpassword":"123","newpassword":"137","confirm newpassword":"137"}
     *  Response: message of password has changed successfully
     *  Errors: * old password/new password/comfirm password is null
                * new password and confirm password not equall
                * old password not equal to the one in the database

***

* #### The ExistingUser should be able to reserve flights:
     *  Functionality : reserve flights
     *  Route Backend : ** http://localhost:8000/reservations/create
                        ** http://localhost:8000/flights/redSeats
     *  Request type :POST
     *  Response : message of successful reservation
***


* #### The ExistingUser should be able to view his/her flights:
     *  Functionality : viewing flights
     *  Route Backend : **http://localhost:8000/reservations/getReservation **http://localhost:8000/flights/flightById
     *  Route Frontend:  http://localhost:3000/AllUserFlights/:user_id
     *  Request type :POST
     *  Response: details of reserved flights

***

* #### The ExistingUser should be able to  edit reserved flights:
     *  Functionality : edit reserved flights
     *  Route Backend : http://localhost:8000/flights/update
     *  Route Frontend: **http://localhost:3000/showDetailsEdit/:flight_id/:user_id/:reservation_id/:desiredFlight_id             **http://localhost:3000/editSeats/flight_id/:class/:adultsNumber/:childrenNumber/:user_id/:reservation_id/:desiredFlight_id        **http://localhost:3000/editsumm/:flight_id/:class/:adultsNumber/:childrenNumber/:seats/:user_id/:reservation_id/:desiredFlight_id
     *  Request type :POST
     *  Response : message of successful update


***

* #### The ExistingUser should be able to  delete reserved flights:
     *  Functionality : delete reserved flights
     *  Route Backend : http://localhost:8000/flights/delete
     *  Route Frontend: http://localhost:3000/AllUserFlights/:user_id
     *  Request type :POST
     *  Response : message of successful deletion

***


* #### TheGuestUser should be able to register/sign up:
     *  Functionality : register new user/sign up
     *  Route  Backend: http://localhost:8000/users/register
     *  Route Frontend: http://localhost:3000/Register
     *  Request type :POST
     *  Request body:{"username":"lfm","first Name":"Lidia","last Name":"karim","Email":"1234@gmail.com","address":"cairo","phone number":"123456789","password":"123","confirm password":"123","passport number":""135792468}
     *  Response : redirecting to signing in page


 ## Installations
 * npm install react
 * npm install nodejs
 * npm install express
 * npm install mongoose
 * npm install dotenv
 * npm install stripe
 * npm install @mui/material
 * npm install react-bootstrap
 * npm install nodemailer
 * npm install bycryptjs
 * npm install axios
 * npm install jsonwebtoken
 * npm install uuid
 * npm install react-icons
 * npm install react-stripe-checkout
 * npm install react-dropdown
 * npm install body-parser

 
 # How to use?
 ## To Activate the backend
 * Open a new terminal in visual studio code and write this command:
   * cd backend
   * node app.js (Start File to connect to the database)(Port:8000)
  ## To Activate the frontend
 * Next open a new terminal and write this command:
   * cd frontend
   * npm start
   

 ## Team Members:
* Somia Hossam 
* George Naguib
* Maged
* Mostafa Shaalan
* Mariam Ayman

