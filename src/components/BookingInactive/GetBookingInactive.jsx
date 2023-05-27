import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getBookingUser} from "../../redux/actions/bookingActions";
import Cookie from "universal-cookie";
import BookingCard from "../CardBooking/BookingCard"

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
                <p>Las reservas antiguas se eliminan pasados los 30 días</p>
                )}
            </>
            ) : (
            <p>No hay reservas vigentes</p>
            )}
        </div>
        );
}

export default GetBookingInactive;