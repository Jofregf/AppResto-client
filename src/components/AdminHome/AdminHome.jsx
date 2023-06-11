/* eslint-disable no-unused-vars */
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AdminRole from "../AdminRole/AdminRole";
import AdminBan from "../AdminBan/AdminBan";
import GetUserByUserNameOrEmail from "../AdminGetUser/AdminGetUser";
import AdminGetResto from "../AdminGetResto/AdminGetResto";
import AdminGetBanResto from "../AdminGetBanResto/AdminGetBanResto";
import { Button } from "react-bootstrap";

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
                <Button variant="outline" 
                        className="custom-button" 
                        onClick={() => handleHome("")}
                >
                    Restaurantes
                </Button>
                <Button variant="outline" 
                        className="custom-button"
                        onClick={() => handleView("role")}
                >
                    Modificar roles
                </Button>
                <Button variant="outline" 
                        className="custom-button"
                        onClick={() => handleView("desactivados")}
                >
                    Desactivados
                </Button>
                <Button variant="outline" 
                        className="custom-button"
                        onClick={() => handleView("banear")}
                >
                    Banear/Desbanear
                </Button>
                <Button variant="outline" 
                        className="custom-button"
                        onClick={() => handleView("usuarios")}
                >
                    Usuarios
                </Button>
                <Button variant="outline" 
                        className="custom-button"
                        onClick={() => navigate("/restaurantes")}
                >
                    Home
                </Button>
                <Button variant="outline" 
                        className="custom-button"
                        onClick={() => window.location.reload()}
                >
                    Panel Admin
                </Button>
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