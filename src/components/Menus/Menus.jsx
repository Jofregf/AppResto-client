import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, Link} from "react-router-dom";
import {getMenusByRestaurantId} from "../../redux/actions/menuActions"

function Menus(){

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMenusByRestaurantId(id));
    
    }, [dispatch, id]);

    const menusState = useSelector((state) => {
        return Array.isArray(state.menus.menus)
        ? state.menus.menus
        : [state.menus.menus]
    })

    console.log(id, "id")
    console.log(menusState)

    if (!menusState) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {menusState && menusState.length > 0 ? (
                menusState.map((menu) => (
                    <div key={menu.menuId}>
                        <p>{menu.menuName}</p>
                        <img 
                            src={`${menu.menuImage}`}
                            alt = {menu.menuName}
                            height = {300}
                            width = {300}
                            loading="lazy"
                            />
                        <p>{menu.menuDescription}</p>
                    </div>
                ))
            ): (
                <div>No hay menú</div>
            )}
            <div>
                <Link to="/restaurants">
                <button>Inicio</button>
                </Link>
            </div>
        </div>
    )
}

export default Menus;