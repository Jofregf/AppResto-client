import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, Link} from "react-router-dom";
import {getMenusByRestaurantId} from "../../redux/actions/menuActions"
import Cookie from "universal-cookie";
import MenuCard from "../CardMenu/MenuCard";
import {Button} from "react-bootstrap"

function Menus(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const cookie = new Cookie();
    const cookieRole = cookie.get("user")?.role;
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getMenusByRestaurantId(id));
    }, [dispatch, id]);

    const menusState = useSelector((state) => {
        return Array.isArray(state.menus.menus)
        ? state.menus.menus
        : [state.menus.menus]
    })

    const menuName = menusState.filter(menu => menu.menuName.toLowerCase().includes(search.toLowerCase()));

    if (!menusState) {
        return <div>Loading...</div>;
    }
    const handleInputChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    return (
        <div>
            {cookieRole === "ROLE_RESTO" ? (
                <div className="buttons-admin-container-slim">
                    <Link to={`/crear-menu/${id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="outline" className="custom-button">
                            Crear menú
                        </Button>
                    </Link>
                    <form>
                            <input
                                id="form"
                                type="text"
                                placeholder="Busca menú"
                                className="input-get-product"
                                value={search}
                                onChange ={(e) => {handleInputChange(e)}}
                            />
                    </form>
                </div>
                
            ): (null)}
            {menusState.length 
                    ?   <div>
                            {menuName.length 
                                ?   <div>
                                        {menuName.reverse()?.map( (menu) => 
                                            <MenuCard 
                                            key={menu.menuId}
                                            idMenu={menu.menuId}
                                            name={menu.menuName}
                                            image={menu.menuImage}
                                            description={menu.menuDescription}
                                            menu={menu}
                                            />
                                        )}
                                    </div>
                                :   <p className="text-no-products">No se encontraron menús con ese nombre</p>
                            }
                            </div>
                        
                        : <p className="text-no-products">Loading...</p>
                    }
            {cookieRole === "ROLE_RESTO" ? (
                <div className="buttons-admin-container-slim">
                    <Link to={`/resto`} style={{ textDecoration: 'none' }}>
                        <Button variant="outline" className="custom-button">
                            Resto Panel
                        </Button>
                    </Link>
                </div>
            ): (
                <div>
                    <Link to="/restaurantes">
                        <Button variant="outline" className="custom-button">
                            Inicio
                        </Button>
                    </Link>
                </div>
            )}            
            
        </div>
    )
}



export default Menus;