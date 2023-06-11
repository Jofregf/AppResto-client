import { useDispatch } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button} from "react-bootstrap"
import {getRestaurantByMenuName, getRestaurantByAverageRating} from "../../redux/actions/restaurantActions"

function SearchBar(){

    const [menuName, setMenuName] = useState("");
    const dispatch = useDispatch();
    const [rating, setRating] = useState("")

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
        <div>
            <Form onSubmit={(event) => handleMenuSubmit(event)}>
                <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Ingrese una comida" value={menuName} onChange={(event) => handleInputMenuChange(event)} />
                </Form.Group>
                <Button variant="outline" className="custom-button" type="submit">Buscar</Button>
            </Form>

            <Form onSubmit={(event) => handleRatingSubmit(event)}>
                <Form.Group controlId="formBasicRange">
                <Form.Label>Ingrese un rating</Form.Label>
                <Form.Range value={rating} onChange={(value) => handleInputRatingChange(value)} min={0} max={5} step={1} />
                <Form.Label className="mt-2">Rating actual: {rating}</Form.Label>
                </Form.Group>
                <Button variant="outline" className="custom-button" type="submit">Buscar</Button>
            </Form>
        </div>
    )
}

export default SearchBar;