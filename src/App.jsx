import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Restaurants from "../src/components/Restaurants/Restaurants";
import RestoDetails from "../src/components/restoDetails/restoDetails";
import Menus from "../src/components/Menus/Menus";
import Register from "../src/components/Register/Register";
import Login from "../src/components/Login/Login";
import AdminHome from "../src/components/AdminHome/AdminHome";
import UserCard from "../src/components/CardUser/UserCard"
import AdminGetUsers from "../src/components/AdminGetUser/AdminGetUser"
import 'bootstrap/dist/css/bootstrap.min.css';
import EditUser from "../src/components/EditUser/EditUser";
import CreateRestaurant from "../src/components/CreateRestaurant/CreateRestaurant";
// import EditRestaurant from "../src/components/EditRestaurant/EditRestaurant";
import RestoHome from "../src/components/RestoHome/RestoHome";
import AdminCardResto from "../src/components/AdminRestoCard/AdminRestoCard"
import CreateMenu from "../src/components/RestoCreateMenu/CreateMenu";
import EditMenu from "../src/components/EditMenu/EditMenu";
import CreateBooking from "./components/CreateBooking/CreateBooking";
import GetBookingUser from "./components/BookingUser/GetBookingsUser";
import EditBooking from "./components/EditBooking/EditBooking";
import GetBookingInactive from "./components/BookingInactive/GetBookingInactive";
import BookingResults from "./components/RestoBookingResults/BookingResults";
import EditPassword from "./components/EditPassword/EditPassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UserDetails from "./components/UserDetails/UserDetails";
import NavBar from "./components/NavBar/NavBar";


function App() {
  
  
  return (
    <>
        <BrowserRouter>
            <div>
              <NavBar/>
                <Routes>
                    <Route path="/restaurantes" element={<Restaurants/>}/>
                    <Route path="/restaurantes/:id" element={<RestoDetails/>}/>
                    <Route path="/menus/restaurantes/:id" element={<Menus/>}/>
                    <Route path="/auth/registro" element={<Register/>}/>
                    <Route path="/auth/login" element={<Login/>}/>
                    <Route path="/admin" element={<AdminHome/>}/>
                    <Route path="/admin/user/:userName" element={<UserCard/>}/>
                    <Route path="/admin/users" element={<AdminGetUsers/>}/>
                    <Route path="/resto" element={<RestoHome/>}/>
                    <Route path="/crear" element={<CreateRestaurant/>}/>
                    <Route path="/editar" element={<AdminCardResto/>}/>
                    <Route path="/crear-menu/:id" element={<CreateMenu/>}/>
                    <Route path="/menu/:idMenu/restaurant/:id" element={<EditMenu/>}/>
                    <Route path="/restaurantes/:id/reserva" element={<CreateBooking/>}/>
                    <Route path="/reservas" element={<GetBookingUser/>}/>
                    <Route path="/reservas/:id" element={<EditBooking/>}/>
                    <Route path="/probar-inactivos" element={<GetBookingInactive/>}/>
                    <Route path="/restaurante/:name/reservas" element={<BookingResults/>}/>
                    <Route path="/usuario/editarpassword" element={<EditPassword/>}/>
                    <Route path="/usuario/olvidarpassword" element={<ForgotPassword/>}/>
                    <Route path="/usuario/perfil" element={<UserDetails/>}/>
                    <Route path="/usuario/editar" element={<EditUser/>}/>

                </Routes>
            </div>
            
        </BrowserRouter>
    </>
  )
}

export default App
