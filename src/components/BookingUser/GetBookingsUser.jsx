import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Link} from "react-router-dom";
import BookingCard from "../CardBooking/BookingCard";
import {getBookingUser} from "../../redux/actions/bookingActions";
import Cookie from "universal-cookie";
import bookingReducers from "../../redux/reducers/bookingReducers";
import { Button } from "react-bootstrap";

function GetBookingUser(){

    const cookie = new Cookie();
    const tokenUser = cookie.get("user")?.accessToken
    const bookings = useSelector((state) => state.bookings.bookings)
    const status = bookingReducers.status;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBookingUser({token: tokenUser}))
    },[dispatch, tokenUser]);
    
    return (
        <div className="container-get-products">
            <h3 style= {{color: "#F15422"}}>Reservas</h3>
            {status === "error" && <div>Ha ocurrido un error...</div>}
            {bookings && bookings.length > 0 ? (
                <>
                {bookings.filter((book) => book.active).map((book) => (
                    <BookingCard
                    key={book.bookingId}
                    id={book.bookingId}
                    date={book.bookingDate}
                    time={book.bookingTime}
                    partySize={book.bookingPartySize}
                    name={book.restaurant.restaurantName}
                    address={book.restaurant.restaurantAddress}
                    email={book.restaurant.restaurantEmail}
                    phone={book.restaurant.restaurantPhone}
                    booking={book}
                    />
                    
                ))}
                {bookings.every((book) => !book.active) && (
                    <p>No hay reservas vigentes</p>
                )}
                </>
            ) : (
                <p>No hay reservas vigentes</p>
            )}
            <Link to="/reservas-inactivos">
                <Button 
                        variant="outline" 
                        className="custom-button btn-sm"
                >
                    Reservas pasadas
                </Button>
            </Link>
        </div>
    )
    
}

export default GetBookingUser;