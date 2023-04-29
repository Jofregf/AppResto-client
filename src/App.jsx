import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Restaurants from "../src/components/Restaurants/Restaurants";
import RestoDetails from "../src/components/restoDetails/restoDetails";
import Menus from "../src/components/Menus/Menus";
import Register from "../src/components/Register/Register";
import Login from "../src/components/Login/Login";
import AdminRole from "../src/components/AdminRole/AdminRole";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <Route path="/prueba" element={<AdminRole/>}/>
                </Routes>
            </div>
            
        </BrowserRouter>
    </>
  )
}

export default App
