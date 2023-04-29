/* eslint-disable no-unused-vars */
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import AdminRole from "../AdminRole/AdminRole";
import Cookies from "universal-cookie";

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
                <button onClick={() => handleView("users")}><p>Usuarios</p></button>
                <button  onClick={() => navigate("/restaurants")}><p>Volver al Home</p></button>
            </div>
            <div>
                {
                state === "users" ? <AdminRole />
                : null    
            }
            </div>
        </div>
        : "usuario sin permiso"
    )
}

export default AdminHome;