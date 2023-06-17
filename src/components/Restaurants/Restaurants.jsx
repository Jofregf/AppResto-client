import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getRestaurants} from "../../redux/actions/restaurantActions"
import RestaurantCard from "../CardRestaurant/RestaurantCard"
import SearchBar from "../SearchBar/SearchBar"
import { Pagination } from "react-bootstrap";

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
    const last = restaurantState?.restaurants[0]?.last;
    const pageNumber = restaurantState?.restaurants[0]?.pageNumber;
    const pageSize = restaurantState?.restaurants[0]?.pageSize;
    const totalElements = restaurantState?.restaurants[0]?.totalElements;
    const totalPages= restaurantState?.restaurants[0]?.totalPages;
    const [currentPage, setCurrentPage] = useState(pageNumber);

    useEffect(() => {
        dispatch(getRestaurants({pageNumber: currentPage-1}));
    }, [dispatch, currentPage]);

    if(!restaurants){
        return <div>Loading...</div>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <SearchBar/>
            <div>
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
            <Pagination>
                {!last && (
                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                />
                )}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                    <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                    >
                    {pageNumber}
                    </Pagination.Item>
                )
                )}
                {!last && (
                <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                />
                )}
            </Pagination>
        </div>
    )
}
export default Restaurants;