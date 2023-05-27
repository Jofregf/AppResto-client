import {ERROR, 
    CREATE_BOOKING,
    GET_BOOKING_USER,
    DELETE_BOOKING_USER,
} from "../actions/bookingActions";

const initialState = {
    bookings : [],
    booking: [],
    status: ""
};

export default function bookingReducers(state = initialState, action) {

    switch(action.type) {
        
        case CREATE_BOOKING:
            return {...state, status: action.payload};

        case ERROR:
            return {...state, status: action.payload};

        case GET_BOOKING_USER:
            return {...state, bookings: action.payload};

        case DELETE_BOOKING_USER:
            return {...state, status: action.payload};

        default:
            return {...state};
    }
}