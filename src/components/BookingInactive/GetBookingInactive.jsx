import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getBookingUser} from "../../redux/actions/bookingActions";
import Cookie from "universal-cookie";
import BookingCard from "../CardBooking/BookingCard"
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";

function GetBookingInactive(){

    const cookie = new Cookie();
    const tokenUser = cookie.get("user")?.accessToken
    const bookings = useSelector((state) => state.bookings.bookings);
    const status = useSelector((state) => state.productReducer?.status);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBookingUser({token: tokenUser}))
    },[dispatch, tokenUser])

    return (
        <div>
            {status === "error" && <div>Ha ocurrido un error...</div>}
            <h3 style= {{color: "#F15422"}}>Reservas pasadas</h3>
            {bookings && bookings.length > 0 ? (
            <>
                {bookings.some((book) => !book.active) ? (
                bookings
                    .filter((book) => !book.active)
                    .map((book) => (
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
                    ))
                ) : (
                    <div className= "alert-resto">
                        <p>No hay reservas antiguas</p>
                    </div>
                )}
            </>
            ) : (
                <div className= "alert-resto">
                    <p>No hay reservas vigentes</p>
                </div>
            )}
            <Link to="/reservas">
                    <Button 
                            variant="outline" 
                            className="custom-button btn-sm"
                    >
                        Reservas vigentes
                    </Button>
                </Link>
        </div>
        );
}

export default GetBookingInactive;