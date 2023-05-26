// import { useState } from 'react'
// import { BsPencilSquare } from 'react-icons/bs';
// import { useDispatch } from 'react-redux';
// import { editProduct } from '../../redux/actions/productActions';
// import { Link } from "react-router-dom";
// import Cookies from "universal-cookie";

function BookingCard({id, date, time, partySize, name, address, email, phone}){

    const bookingDate = new Date(date);
    const day = bookingDate.getDate();
    const month = bookingDate.getMonth() + 1;
    const year = bookingDate.getFullYear();

    const formattedDate = ("0" + day).slice(-2) + "-" + ("0" + month).slice(-2) + "-" + year;

    const formattedTime = time.slice(0, 5);

    return (
        <div >
            
            <p>{formattedDate}</p>
            <p>{formattedTime}</p>
            <p>{partySize}</p>
            <p>{name}</p>
            <p>{address}</p>
            <p>{email}</p>
            <p>{phone}</p>
        </div>
    )
}

export default BookingCard;
// Debo hacer el update y delete de booking