import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import {findBookingsByRestaurantName, findBookingByDate} from "../../redux/actions/bookingActions"

function SearchBookings({name, tokenUser}){

    const dispatch = useDispatch();
    const [date, setDate] = useState("");
    const bookings = useSelector((state) => state.bookings.bookings)
    const navigate = useNavigate();
    const [bookingResults, setBookingResults] = useState(null);

    function handleInputDateChange(event) {
        event.preventDefault();
        setDate(event.target.value);
    }

    function handleNameSubmit(event) {
        event.preventDefault();
        dispatch(findBookingsByRestaurantName({ name, token: tokenUser }))
        navigate(`/restaurante/${name}/reservas`);

    }

    function handleDateSubmit(event) {
        event.preventDefault();
        dispatch(findBookingByDate({date, name, token: tokenUser}))
        navigate(`/restaurante/${name}/reservas`);
        setDate("");
    }

    return (
        <div>
            <div>
                <Button variant="outline" className="custom-button" type="submit"onClick={(event) => handleNameSubmit(event)}>Buscar Reservas</Button>
            </div>
            <div>
                <form onSubmit={(event) => handleDateSubmit(event)}>
                
                        <label style={{marginRight: "12px"}}>Ingrese una fecha</label>
                    
                    <input style={{border: "1px solid #F15422"}} type="date" value={date} onChange={handleInputDateChange} />
                    <Button variant="outline" className="custom-button" type="submit">Buscar</Button>
                </form>
            </div>
        </div>
    )
}

export default SearchBookings;