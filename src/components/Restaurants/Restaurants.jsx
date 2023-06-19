import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getRestaurants} from "../../redux/actions/restaurantActions"
// import RestaurantCard from "../CardRestaurant/RestaurantCard"
import SearchBar from "../SearchBar/SearchBar"
import { Pagination, Card} from "react-bootstrap";
import "./Restaurants.css";
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

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
        <div className="containerResto">
            
                <SearchBar/>
            
            <div className="containerCardsHome">
                {status === "error" && <div>Ha ocurrido un error...</div>}
                {restaurants && restaurants.length > 0 ? (
                    restaurants.map((resto) => (
                        resto.enabled === true ? (
                            <div key={resto.restaurantId}>
                                <Card
                                    className="card-resto"
                                >
                                    <Card.Body>
                                    <Link
                                        to={"/restaurantes/" + resto.restaurantId}
                                        className="link-resto"
                                    >
                                        <Card.Img 
                                            className="img-resto"
                                            variant="top" 
                                            src={resto.restaurantImages} 
                                        />
                                        <Card.Title className="title-resto">
                                            {resto.restaurantName}
                                        </Card.Title>
                                        <div className="info-resto">
                                            <Card.Text>{resto.restaurantAddress}</Card.Text>
                                            <Card.Text>{resto.restaurantPhone}</Card.Text>
                                            <Card.Text>{resto.restaurantEmail}</Card.Text>
                                            {
                                                resto.averageRating === 0 ? <><span>Sin reseñas</span> </>:
                                                resto.averageRating === 1 ? <span className="starShow"> <AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/> </span>:
                                                resto.averageRating === 2 ? <span className="starShow"> <AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/> </span>:
                                                resto.averageRating === 3 ? <span className="starShow"> <AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/> </span>:
                                                resto.averageRating === 4 ? <span className="starShow"> <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/> </span>:
                                                resto.averageRating === 5 ? <span className="starShow"> <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/> </span>
                                                :null
                                            }
                                            </div>
                                    </Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        ) : null
                    ))
                ):(
                    <div className= "alert-resto">
                        <p>No hay restaurantes disponibles</p>
                    </div>
                )}
            </div>
            <div>
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
        </div>
    )
}
export default Restaurants;