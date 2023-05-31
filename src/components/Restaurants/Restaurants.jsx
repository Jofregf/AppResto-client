import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getRestaurants} from "../../redux/actions/restaurantActions"
import RestaurantCard from "../CardRestaurant/RestaurantCard"
import SearchBar from "../SearchBar/SearchBar"

function Restaurants(){

    const dispatch = useDispatch();

    
    const restaurantState = useSelector((state) => {
        return {
            restaurants: Array.isArray(state.restaurants.restaurants)
                ? state.restaurants.restaurants
                : [state.restaurants.restaurants],
            filteredRestaurants: Array.isArray(state.restaurants.filteredRestaurants)
                ? state.restaurants.filteredRestaurants
                : [state.restaurants.filteredRestaurants],
            status: state.restaurants.status
        }
    });

    const restaurants = restaurantState.filteredRestaurants.length > 0
        ? restaurantState.filteredRestaurants
        : restaurantState.restaurants[0]?.contents || [];

    const status = restaurantState.status;

    useEffect(() => {
        dispatch(getRestaurants());
    }, [dispatch]);

    if(!restaurants){
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SearchBar/>
            {status === "error" && <div>Ha ocurrido un error...</div>}
            {restaurants && restaurants.length > 0 ? (
                restaurants.map((resto) => (
                    resto.enabled === true ? (
                        <RestaurantCard
                            key = {resto.restaurantId}
                            id = {resto.restaurantId}
                            name = {resto.restaurantName}
                            image = {resto.restaurantImages}
                            address = {resto.restaurantAddress}
                            phone = {resto.restaurantPhone}
                            email = {resto.restaurantEmail}
                            rating = {resto.averageRating}
                        />
                    ) : null
                ))
            ):(
                <div>
                    <p>No hay restaurantes disponibles</p>
                </div>
            )}
        </div>
    )
}
export default Restaurants;