import {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AdminEdit } from '../AdminEdit/AdminEdit';
// import AdminGetProducts from '../AdminGetProducts/AdminGetProducts';
// import AdminGetProductsDisabled from '../AdminGetProductDisabled/AdminGetProductDisabled';
// import { AdminCreate } from '../AdminCreate/AdminCreate';
// import AdminDetail from '../AdminDetail/AdminDetail';
// import AdminRoles from '../AdminRoles/AdminRoles';
// import AdminOrders from '../AdminOrders/AdminOrders';
// import AdminMetaOrder from '../AdminMetaOrder/AdminMetaOrder';
import Cookies from "universal-cookie";
import CreateRestaurant from "../CreateRestaurant/CreateRestaurant";
import EditRestaurant from "../EditRestaurant/EditRestaurant";
import RestoGetRestaurants from '../RestoGetRestaurants/RestoGetRestaurants';

function RestoHome(){
    
    // const navigate = useNavigate();
    const [drawerActive, setDraweActive] = useState(false);
    const [state, setState] = useState("")

    const [restoSend, setRestoSend] = useState(null)

    let cookie = new Cookies();
    const tokenUser = cookie.get("user")?.accessToken;
    const tokenRole =  cookie.get("user")?.role;

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
        (tokenRole === "ROLE_RESTO")?
            <div>
            <div>
                <button onClick={() => handleHome("")}><p>Restaurantes</p></button>
                {/* <button onClick={() => handleView("mi cuenta")}><p>Mi cuenta</p></button> */}
                <button onClick={() => handleView("crear")}><p>Crear Restaurante</p></button>

            </div>
            <div>
                {
                    state === "" ? <RestoGetRestaurants receiveRestaurant={receiveRestaurant} activeDrawer={activeDrawer} tokenUser={tokenUser} />
                    : state === "restos" ? <EditRestaurant restaurante={restoSend} handleHome={handleHome} activeDrawer={activeDrawer} /> 
                    : state === "crear" ? <CreateRestaurant handleHome={handleHome} />
                    // : state === "mi cuenta" ? <AdminDetail />
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