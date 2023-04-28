import { useDispatch } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
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
                <Button type="submit" className="btn btn-primary">Buscar</Button>
            </Form>

            <Form onSubmit={(event) => handleRatingSubmit(event)}>
                <Form.Group controlId="formBasicRange">
                <Form.Label>Ingrese un rating</Form.Label>
                <Form.Range value={rating} onChange={(value) => handleInputRatingChange(value)} min={0} max={5} step={0.5} />
                <Form.Label className="mt-2">Rating actual: {rating}</Form.Label>
                </Form.Group>
                <Button type="submit" className="btn btn-primary">Buscar</Button>
            </Form>
        </div>
    )
}

export default SearchBar;