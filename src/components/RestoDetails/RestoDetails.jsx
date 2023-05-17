import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom"
import {getRestaurantDetails} from "../../redux/actions/restaurantActions"
import Review from "../Reviews/Reviews"
import Cookie from "universal-cookie"



function RestoDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [details] = useState(id);

    useEffect(() => {
        dispatch(getRestaurantDetails(details));
    
    }, [dispatch, details]);

    const detailsState = useSelector((state) => {
        return Array.isArray(state.restaurants.restaurantDetails)
        ? state.restaurants.restaurantDetails
        : [state.restaurants.restaurantDetails]
    });

    if (!detailsState) {
        return <div>Loading...</div>;
    }

    const cookie = new Cookie();
    const cookieRole = cookie.get("user").role;
    


    return (
        <div>
            {detailsState && detailsState.length > 0 ? (
                detailsState.map((detail) => (
                    <div key={detail.restaurantId}>
                        <h2>{detail.restaurantName}</h2>
                        <p>{detail.restaurantAddress}</p>
                        <p>{detail.restaurantDescription}</p>
                        <p>{detail.restaurantPhone}</p>
                        <p>{detail.restaurantEmail}</p>
                        <p>{detail.openingHoursRestaurant}</p>
                        <p>{detail.closingHoursRestaurant}</p>
                        {detail.restaurantImages && detail.restaurantImages.length > 0 ? (
                            detail.restaurantImages.map((img, i) => (
                                <div key={i}>
                                    <img
                                        src={img}
                                        alt={`Imagen ${i+1}`}
                                        height = {300}
                                        width = {300}
                                    />
                                </div>
                            ))
                        ) : (
                            <div>No hay imagenes disponibles</div>
                        )}
                    </div>
                ))
            ) : (
                <div>
                <p>No hay restaurantes disponibles</p>
                </div>
            )}
            <Review id={id}/>
            <Link to={`/menus/restaurantes/${id}`}>Ver Menús</Link>
            {cookieRole === "ROLE_RESTO" ? (
                <div>
                    <Link to="/resto">
                        <button>RESTO PANEL</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <Link to="/restaurantes">
                        <button>Inicio</button>
                    </Link>
                </div>
            )}
            
            </div>    
    );
}
export default RestoDetails;

