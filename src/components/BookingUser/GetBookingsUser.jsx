import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import BookingCard from "../CardBooking/BookingCard";
import {getBookingUser} from "../../redux/actions/bookingActions";
import Cookie from "universal-cookie";
import bookingReducers from "../../redux/reducers/bookingReducers";

function GetBookingUser(){

    const cookie = new Cookie();
    const tokenUser = cookie.get("user")?.accessToken
    const bookings = useSelector((state) => state.bookings.bookings)
    console.log(bookings)
    const status = bookingReducers.status;
    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch(getBookingUser({token: tokenUser}))
    },[dispatch, tokenUser]);

    return (
        <div>
            {status === "error" && <div>Ha ocurrido un error...</div>}
            {bookings && bookings.length > 0 ? (
                bookings.map((book) => (
                    book.active === true ? (
                        <BookingCard
                            key = {book.bookingId}
                            id = {book.bookingtId}
                            date = {book.bookingDate}
                            time = {book.bookingTime}
                            partySize = {book.bookingPartySize}
                            name = {book.restaurant.restaurantName}
                            address = {book.restaurant.restaurantAddress}
                            email = {book.restaurant.restaurantEmail}
                            phone = {book.restaurant.restaurantPhone}
                        />
                    ) : null
                ))
            ):(
                <div>
                    <p>No hay reservas vigentes</p>
                </div>
            )}
        </div>
    )
    
}

export default GetBookingUser;