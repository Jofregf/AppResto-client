import axios from "axios";
import {baseUrl} from "./restaurantActions";

export const CREATE_BOOKING = "CREATE_BOOKING";
export const ERROR = "ERROR";

export const createBooking = ({bookingDate, bookingTime, bookingPartySize, id, token}) => async (dispatch) => {
    console.log(id, "ID")
    console.log(token, "TOKEN")
    console.log(bookingDate, "BOOKINGDATE")
    console.log(bookingTime, "BOOKINGTIME")
    console.log(bookingPartySize, "BOOKINGPART")
    await axios.post(`${baseUrl}/api/bookings/restaurant/${id}`, {
        bookingDate, 
        bookingTime, 
        bookingPartySize
    },
    {headers: {"Authorization": "Bearer " + token}}).then((response) =>{
        dispatch({
            type: CREATE_BOOKING,
            payload: response.data,
        });
    },
    (error) => {
        dispatch({
            type: ERROR,
            payload: error.error,
        });
    },
).catch(error => {
    console.error("Error en la solicitud", error);
});
}