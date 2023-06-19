import { useDispatch } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button } from "react-bootstrap";
import {getRestaurantByMenuName, getRestaurantByAverageRating} from "../../redux/actions/restaurantActions";
import "./SearchBar.css";

function SearchBar() {
    const [menuName, setMenuName] = useState("");
    const dispatch = useDispatch();
    const [rating, setRating] = useState("");

    function handleInputMenuChange(event) {
        event.preventDefault();
        setMenuName(event.target.value.toLowerCase());
    }

    function handleInputRatingChange(event) {
        event.preventDefault();
        setRating(event.target.value);
    }

    function handleMenuSubmit(event) {
        event.preventDefault();
        dispatch(getRestaurantByMenuName(menuName));
        setMenuName("");
    }

    function handleRatingSubmit(event) {
        event.preventDefault();
        dispatch(getRestaurantByAverageRating(rating));
        setRating("");
    }

    return (

        <div className="search-container">
            <form onSubmit={(event) => handleMenuSubmit(event)}>
                <input
                    className="input-login"
                    type="text"
                    placeholder="Ingrese una comida"
                    value={menuName} 
                    onChange={(event) => handleInputMenuChange(event)}
                />
                <Button variant="outline" className="custom-button" type="submit">Buscar</Button>
            </form>

            <form onSubmit={(event) => handleRatingSubmit(event)}>
            <label className="input-label-search">Ingrese un rating</label>
            <input 
                type="range" 
                min="0" 
                max="5" 
                step="1" 
                value={rating} 
                onChange={(value) => handleInputRatingChange(value)}
            />
            <p className="input-label-search">Rating actual: {rating}</p>
            <Button variant="outline" className="custom-button" type="submit">Buscar</Button>
            </form>
        </div>
    );
}

export default SearchBar;
