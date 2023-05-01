/* eslint-disable no-unused-vars */
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AdminRole from "../AdminRole/AdminRole";
import AdminBan from "../AdminBan/AdminBan";
import GetUserByUserNameOrEmail from "../AdminGetUser/AdminGetUser"

function AdminHome() {

    const navigate = useNavigate();
    const [drawActive, setDrawActive] = useState(false);
    const [state, setState] = useState("");
    const [user, setUser] = useState(null);

    const activeDraw = () => {
        setDrawActive(!drawActive)
    }

    let cookies = new Cookies();
    const tokenUser = cookies.get("user").accessToken;
    const tokenRole = cookies.get("user").role
    
    const handleHome = () => {
        setState("");
    }

    const handleView = (select) => {
        setState(select);
    }

    return (
        (tokenRole === "ROLE_ADMIN")?
        <div>
            <div>
                <button onClick={() => handleView("role")}><p>Modificar roles</p></button>
                <button onClick={() => handleView("banear")}><p>Banear/Desbanear</p></button>
                <button onClick={() => handleView("usuarios")}><p>Usuarios</p></button>
                <button  onClick={() => navigate("/restaurants")}><p>Home</p></button>
                <button onClick={() => window.location.reload()}><p>Panel Admin</p></button>
            </div>
            <div>
                {
                state === "role" ? <AdminRole />
                : state === "banear" ? <AdminBan/>
                : state === "usuarios" ? <GetUserByUserNameOrEmail/>
                : null    
            }
            </div>
        </div>
        : "usuario sin permiso"
    )
}

export default AdminHome;