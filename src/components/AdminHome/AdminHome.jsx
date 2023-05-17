/* eslint-disable no-unused-vars */
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AdminRole from "../AdminRole/AdminRole";
import AdminBan from "../AdminBan/AdminBan";
import GetUserByUserNameOrEmail from "../AdminGetUser/AdminGetUser";
import AdminGetResto from "../AdminGetResto/AdminGetResto";
import AdminGetBanResto from "../AdminGetBanResto/AdminGetBanResto";

function AdminHome() {

    const navigate = useNavigate();
    const [drawActive, setDrawActive] = useState(false);
    const [state, setState] = useState("");
    const [user, setUser] = useState(null);
    const [restaurantSend, setRestaurantSend] = useState(null)

    const activeDrawer = () => {
        setDrawActive(!drawActive)
    }

    let cookies = new Cookies();
    const tokenUser = cookies.get("user").accessToken;
    const tokenRole = cookies.get("user").role
    
    const handleHome = () => {
        setState("");
    }

    const receiveRestaurant = (resto) => {
        setRestaurantSend(resto)
        setState("enabled?")
    }

    const handleView = (select) => {
        setState(select);
    }

    return (
        (tokenRole === "ROLE_ADMIN")?
        <div>
            <div>
                <button className="link-home" onClick={() => handleHome("")}><p>Restaurantes</p></button>
                <button onClick={() => handleView("role")}><p>Modificar roles</p></button>
                <button onClick={() => handleView("desactivados")}><p>Desactivados</p></button>
                <button onClick={() => handleView("banear")}><p>Banear/Desbanear</p></button>
                <button onClick={() => handleView("usuarios")}><p>Usuarios</p></button>
                <button  onClick={() => navigate("/restaurants")}><p>Home</p></button>
                <button onClick={() => window.location.reload()}><p>Panel Admin</p></button>
            </div>
            <div>
                {
                state === "role" ? <AdminRole />
                :state === "" ? <AdminGetResto receiveRestaurant={receiveRestaurant} activeDrawer={activeDrawer} />
                : state === "banear" ? <AdminBan/>
                : state === "usuarios" ? <GetUserByUserNameOrEmail/>
                : state === "desactivados" ? <AdminGetBanResto />
                : null    
            }
            </div>
        </div>
        : "usuario sin permiso"
    )
}

export default AdminHome;