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

function App() {
  
  
  return (
    <>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/restaurants" element={<Restaurants/>}/>
                    <Route path="/restaurants/:id" element={<RestoDetails/>}/>
                    <Route path="/menus/restaurant/:id" element={<Menus/>}/>
                    <Route path="/auth/register" element={<Register/>}/>
                    <Route path="/auth/login" element={<Login/>}/>
                    <Route path="/admin" element={<AdminHome/>}/>
                    <Route path="/admin/user/:userName" element={<UserCard />}/>
                    <Route path="/admin/users" element={<AdminGetUsers />}/>
                    <Route path="/prueba" element={<EditUser />}/>
                    <Route path="/crear" element={<CreateRestaurant/>}/>
                </Routes>
            </div>
            
        </BrowserRouter>
    </>
  )
}

export default App
