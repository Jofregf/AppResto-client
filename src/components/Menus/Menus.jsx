import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, Link} from "react-router-dom";
import {getMenusByRestaurantId} from "../../redux/actions/menuActions"
import Cookie from "universal-cookie";
import MenuCard from "../CardMenu/MenuCard";

function Menus(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const cookie = new Cookie();
    const cookieRole = cookie.get("user").role;

    useEffect(() => {
        dispatch(getMenusByRestaurantId(id));
    
    }, [dispatch, id]);

    const menusState = useSelector((state) => {
        return Array.isArray(state.menus.menus)
        ? state.menus.menus
        : [state.menus.menus]
    })

    if (!menusState) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {cookieRole === "ROLE_RESTO" ? (
                <div className="buttons-admin-container-slim">
                    <Link to={`/crear-menu/${id}`} style={{ textDecoration: 'none' }}>
                        <button className="button-card-admin-slim">
                        Crear menú
                        </button>
                    </Link>
                </div>
            ): (null)}
            {menusState && menusState.length > 0 ? (
                menusState.map((menu) => (
                    <MenuCard 
                        key={menu.menuId}
                        idMenu={menu.menuId}
                        name={menu.menuName}
                        image={menu.menuImage}
                        description={menu.menuDescription}
                        menu={menu}
                    />
                ))
            ): (
                <div>No hay menú</div>
            )}
            {cookieRole === "ROLE_RESTO" ? (
                <div className="buttons-admin-container-slim">
                    <Link to={`/resto`} style={{ textDecoration: 'none' }}>
                        <button className="button-card-admin-slim">
                        Resto Panel
                        </button>
                    </Link>
                </div>
            ): (
                <div>
                    <Link to="/restaurantes">
                        <button>Inicio</button>
                    </Link>
                </div>
            )}            
            
        </div>
    )
}



export default Menus;