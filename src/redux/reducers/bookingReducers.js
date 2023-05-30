import {ERROR, 
    CREATE_BOOKING,
    GET_BOOKING_USER,
    DELETE_BOOKING_USER,
    FIND_BOOKINGS_BY_RESTAURANT_NAME,
    FIND_BOOKING_BY_DATE
} from "../actions/bookingActions";

const initialState = {
    bookings : [],
    booking: [],
    status: "",
    error: null
};

export default function bookingReducers(state = initialState, action) {

    switch(action.type) {
        
        case CREATE_BOOKING:
            return { ...state, status: action.payload };

        case ERROR:
            return { ...state, error: action.payload };

        case GET_BOOKING_USER:
            return { ...state, bookings: action.payload, error: null }; // Reiniciar el error al obtener las reservas

        case DELETE_BOOKING_USER:
            return { ...state, status: action.payload };

        case FIND_BOOKINGS_BY_RESTAURANT_NAME:
            return { ...state, bookings: action.payload, status: action.payload, error: null }; // Reiniciar el error al encontrar reservas por nombre

        case FIND_BOOKING_BY_DATE:
            return { ...state, bookings: action.payload, status: action.payload, error: null }; // Reiniciar el error al encontrar reservas por fecha

        default:
            return { ...state };
    }
}