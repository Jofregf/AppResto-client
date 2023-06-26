import {useState} from 'react';
import Cookies from "universal-cookie";
import CreateRestaurant from "../CreateRestaurant/CreateRestaurant";
import EditRestaurant from "../EditRestaurant/EditRestaurant";
import RestoGetRestaurants from "../RestoGetRestaurants/RestoGetRestaurants";
import { Button } from 'react-bootstrap';


function RestoHome(){
    
    const [drawerActive, setDraweActive] = useState(false);
    const [state, setState] = useState("");

    const [restoSend, setRestoSend] = useState(null);

    let cookie = new Cookies();
    const tokenUser = cookie.get("user")?.accessToken;
    const cookieRole =  cookie.get("user")?.role;

    const activeDrawer = () => {
        setDraweActive(!drawerActive)
    }

    const receiveRestaurant = (restaurant) => {
        setRestoSend(restaurant)
        setState("restos")
    }
    
    const handleHome = () => {
        setState("")
    }

    const handleView = (select) => {
        setState(select)
    }
    

    return (
        (cookieRole === "ROLE_RESTO")?
            <div>
            <div>
                <Button variant="outline" className="custom-button" onClick={() => handleHome("")}><p>Restaurantes</p></Button>
                <Button variant="outline" className="custom-button" onClick={() => handleView("crear")}><p>Crear Restaurante</p></Button>
            </div>
            <div>
                {
                    state === "" ? <RestoGetRestaurants receiveRestaurant={receiveRestaurant} activeDrawer={activeDrawer} tokenUser={tokenUser}/>
                    : state === "restos" ? <EditRestaurant restaurante={restoSend} handleHome={handleHome} activeDrawer={activeDrawer} /> 
                    : state === "crear" ? <CreateRestaurant handleHome={handleHome} />
                    : null
                }
            </div>
            </div>
        :(
            <div>No tiene permisos</div>
        )
    )
}

export default RestoHome;