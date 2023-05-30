import axios from "axios";
import {baseUrl} from "./restaurantActions";

export const CREATE_BOOKING = "CREATE_BOOKING";
export const ERROR = "ERROR";
export const GET_BOOKING_USER = "GET_BOOKING_USER";
export const UPDATE_BOOKING_USER = "UPDATE_BOOKING_USER";
export const DELETE_BOOKING_USER = "DELETE_BOOKING_USER";
export const FIND_BOOKINGS_BY_RESTAURANT_NAME = "FIND_BOOKING_BY_RESTAURANT_NAME";
export const FIND_BOOKING_BY_DATE = "FIND_BOOKING_BY_DATE";

export const createBooking = ({bookingDate, bookingTime, bookingPartySize, id, token}) => async (dispatch) => {
    
    await axios.post(`${baseUrl}/api/bookings/restaurant/${id}`, 
        {
            bookingDate, 
            bookingTime, 
            bookingPartySize
        },
        {headers: {"Authorization": "Bearer " + token}})
    .then(
        (response) =>{
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
        }
    )
    .catch(error => {
        console.error("Error en la solicitud", error);
    });
}

export const getBookingUser = ({token}) => async (dispatch) => {

    await axios.get(`${baseUrl}/api/bookings`, 
        {headers: {"Authorization": "Bearer " + token}})
    .then((response) => {
        dispatch({
            type: GET_BOOKING_USER,
            payload: response.data,
        })
    },
    (error) => {
        dispatch({
            type: ERROR,
            payload: error.error,
        });
    })
    .catch(error => {
        console.error("Error en la solicitud", error);
    });
}

export const updateBookingUser = ({data, idBooking, token}) => async (dispatch) => {

    await axios.put(`${baseUrl}/api/bookings/${idBooking}`, 
        data, 
        {headers: {"Authorization": "Bearer " + token}}
    )
    .then(
        (response) => {
            dispatch({
                type: UPDATE_BOOKING_USER,
                payload: response.data,
            })
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error,
            });
        }
    )
    .catch(error => {
        console.error("Error en la solicitud", error)
    })
}

export const deleteBooking = ({idBooking, token}) => async (dispatch) => {

    await axios.delete(`${baseUrl}/api/bookings/${idBooking}`,
        {headers: {"Authorization": "Bearer " + token}}
    )
    .then(
        (response) => {
            dispatch({
                type: DELETE_BOOKING_USER,
                payload: response.data,
            })
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error,
            });
        }
    )
    .catch(error => {
        console.error("Error en la solicitud", error)
    })
}


export const findBookingsByRestaurantName = ({ name, token }) => async (dispatch) => {
    
    try {
        const response = await axios.get(`${baseUrl}/api/restaurants/${name}/bookings`, {
            headers: { 'Authorization': 'Bearer ' + token },
        });
        
        dispatch({
            type: FIND_BOOKINGS_BY_RESTAURANT_NAME,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || 'Error en la solicitud',
        });
    }
};

export const findBookingByDate = ({name, date, token}) => async (dispatch) => {
    
    try {
        const response = await axios.get(`${baseUrl}/api/restaurants/${name}/bookings/${date}`, {
            headers: { 'Authorization': 'Bearer ' + token },
        });

        dispatch({
            type: FIND_BOOKING_BY_DATE,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || 'Error en la solicitud',
        });
    }
};