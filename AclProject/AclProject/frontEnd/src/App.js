import './App.css';
import {BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import AllFlights from './comp/AllFlights';
import Create from './comp/Create';
import Update from './comp/Update';
import Search from './comp/Search';
import Login from './comp/Login';
import Delete from './comp/Delete';
import Register from './comp/Register';
import HomePageUser from './comp/HomePageUser';
import EditProfile from './comp/EditProfile';
import Usersearchflights from './comp/Usersearchflights';
import ShowDetails from './comp/ShowDetails';
import Showdetret from './comp/Showdetret';
import Reserve from './comp/Reserve';
import ChooseSeats from './comp/ChooseSeats';
import FinalSumm from './comp/FinalSumm';
import DepSumm from './comp/DepSumm';
import ReturnFlight from './comp/ReturnFlight';
import ChooseSeats2 from './comp/ChooseSeats2';
import AllFlightsUser from './comp/AllFlightsUser';
import ChangePassword from './comp/ChangePassword';
import AllUserFlights from './comp/AllUserFlights';

import ShowDetailsChange from './comp/ShowDetailsChange';
import ChangeSeats from './comp/ChangeSeats';
import Changesumm from './comp/Changesumm';
import UserEditSearchFlights from './comp/UserEditSearchFlights';
import ShowDetailsEdit from './comp/ShowDetailsEdit';
import EditSeats from './comp/EditSeats';
import Editsumm from './comp/Editsumm';

import AllFlightsGuest from './comp/guestUser/AllFlightsGuest';
import GuestSearch from './comp/guestUser/GuestSearch';
import ShowDetailsGuest from './comp/guestUser/ShowDetailsGuest';
import ChooseSeatsGuest from './comp/guestUser/ChooseSeatsGuest';
import DepSummGuest from './comp/guestUser/DepSummGuest';
import ReturnFlightGuest from './comp/guestUser/ReturnFlightGuest';
import ShowdetretGuest from './comp/guestUser/ShowdetretGuest';
import ChooseSeats2Guest from './comp/guestUser/ChooseSeats2Guest';
import FinalSummGuest from './comp/guestUser/FinalSummGuest';
import GuestHomePage from './comp/guestUser/GuestHomePage';
import './comp/img/background.css';


function App() {

  var isLogged = true ;



  if(localStorage.getItem('userInfo') === null)
  {
    isLogged = null
    
      
  }

  return (
    <Router>
    <div className="App">
      <div className="content" style={{margintop: 0}}>
       <Routes>
       <Route  path="/" element={<Login />}/>
       <Route  path ="/Register" element ={<Register />}/>
       {isLogged && <Route  path="/Home/:user_id" element ={ <AllFlights />}/>}  
       {isLogged && <Route  path="/AllFlightsUser/:user_id/" element ={ <AllFlightsUser />}/>}  
       {isLogged && <Route  path="/create/:user_id" element={<Create />}/>}
       {isLogged && <Route  path="/delete/:_id/:user_id" element={<Delete />}/>}
       {isLogged && <Route  path="/update/:_id/:user_id" element={<Update />}/>}
       {isLogged && <Route  path="/search/:user_id" element={<Search />}/>}
       {isLogged && <Route  path="/homePageUser/:user_id" element={<HomePageUser />}/>}
       {isLogged && <Route  path="/editProfile/:user_id" element={<EditProfile />}/>}
       {isLogged && <Route  path="/changePassword/:user_id" element={<ChangePassword />}/>} 
       {isLogged && <Route  path="/Usersearchflights/:user_id" element={<Usersearchflights />}/>}
       {isLogged && <Route  path="/showDetails/:_id/:user_id" element={<ShowDetails />}/>}
       {isLogged && <Route  path="/AllUserFlights/:user_id" element={<AllUserFlights />}/>}
       {isLogged && <Route  path="/reserve/:_id/:user_id" element={<Reserve />}/>}
       {isLogged && <Route  path="/chooseSeats/:_id/:class/:adno/:chno/:tnop/:user_id" element={<ChooseSeats />}/>}
       {isLogged && <Route  path="/DepSumm/:_id/:class/:seats/:totalseats/:adnod/:chnod/:tnopd/:user_id" element={<DepSumm />}/>}
       {isLogged && <Route  path="/ReturnFlight/:_id/:class/:seats/:totalseats/:adnod/:chnod/:tnopd/:user_id" element={<ReturnFlight />}/>}
       {isLogged && <Route  path="/Showdetret/:_idr/:_idd/:class/:seats/:totalseats/:adnod/:chnod/:tnopd/:user_id" element={<Showdetret />}/>}
       {isLogged && <Route  path="/chooseSeats2/:_id/:class/:adnor/:chnor/:tnopr/:_idd/:classd/:seats/:totalseats/:adnod/:chnod/:tnopd/:user_id" element={<ChooseSeats2 />}/>}
       {isLogged && <Route  path="/FinalSumm/:_id/:class/:seats/:totalseats/:adnod/:chnod/:tnopd/:_idr/:classr/:seatsr/:totalseatsr/:adnor/:chnor/:tnopr/:user_id" element={<FinalSumm />}/>}
       
       
        <Route  path="/showDetailsChange/:flight_id/:user_id/:reservation_id" element={<ShowDetailsChange />}/>
        <Route  path="/changeSeats/:flight_id/:class/:adultsNumber/:childrenNumber/:user_id/:reservation_id" element={<ChangeSeats />}/>
        <Route  path="/changesumm/:flight_id/:class/:adultsNumber/:childrenNumber/:seats/:user_id/:reservation_id" element={<Changesumm />}/>
       
        <Route  path="/UserEditSearchFlights/:flight_id/:user_id/:reservation_id" element={<UserEditSearchFlights />}/>
        <Route  path="/showDetailsEdit/:flight_id/:user_id/:reservation_id/:desiredFlight_id" element={<ShowDetailsEdit />}/>
        <Route  path="/editSeats/:flight_id/:class/:adultsNumber/:childrenNumber/:user_id/:reservation_id/:desiredFlight_id" element={<EditSeats />}/>
        <Route  path="/editsumm/:flight_id/:class/:adultsNumber/:childrenNumber/:seats/:user_id/:reservation_id/:desiredFlight_id" element={<Editsumm />}/>
       
       <Route  path ="/GuestHomePage" element ={<GuestHomePage />}/>
       <Route  path ="/AllFlightsGuest" element ={<AllFlightsGuest />}/>
       <Route  path ="/GuestSearchFlights" element ={<GuestSearch />}/>
       <Route  path="/showDetailsGuest/:_id" element={<ShowDetailsGuest />}/>
       <Route  path="/chooseSeatsGuest/:_id/:class/:adno/:chno/:tnop" element={<ChooseSeatsGuest />}/>
       <Route  path="/DepSummGuest/:_id/:class/:seats/:totalseats/:adnod/:chnod/:tnopd" element={<DepSummGuest />}/>
       <Route  path="/ReturnFlightGuest/:_id/:class/:seats/:totalseats/:adnod/:chnod/:tnopd" element={<ReturnFlightGuest />}/>
       <Route  path="/ShowdetretGuest/:_idr/:_idd/:class/:seats/:totalseats/:adnod/:chnod/:tnopd" element={<ShowdetretGuest />}/>
       <Route  path="/chooseSeats2Guest/:_id/:class/:adnor/:chnor/:tnopr/:_idd/:classd/:seats/:totalseats/:adnod/:chnod/:tnopd" element={<ChooseSeats2Guest />}/>
       <Route  path="/FinalSummGuest/:_id/:class/:seats/:totalseats/:adnod/:chnod/:tnopd/:_idr/:classr/:seatsr/:totalseatsr/:adnor/:chnor/:tnopr" element={<FinalSummGuest />}/>
       
      </Routes>
      </div>
      </div> 
           
      </Router>
  );
}

export default App;
