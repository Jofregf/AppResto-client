import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom"
import {getRestaurantDetails} from "../../redux/actions/restaurantActions"
import Review from "../Reviews/Reviews"



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
                        <img 
                            src={`${detail.restaurantImages}`}
                            alt = {detail.restaurantName}
                            height = {300}
                            width = {300}
                        />
                    </div>
                ))
            ) : (
                <div>
                <p>No hay restaurantes disponibles</p>
                </div>
            )}
            <Review id={id}/>
            <Link to={`/menus/restaurant/${id}`}>Ver Menús</Link>
            <div>
                <Link to="/restaurants">
                <button>Inicio</button>
                </Link>
            </div>
            </div>    
    );
}
export default RestoDetails;

