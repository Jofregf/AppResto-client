import {ERROR, 
    CREATE_BOOKING
} from "../actions/bookingActions";

const initialState = {
    bookings : [],
    booking: [],
    status: ""
};

export default function bookingReducers(state = initialState, action) {

    switch(action.type) {
        
        case CREATE_BOOKING:
            return {...state, status: action.payload}

        case ERROR:
            return {...state, status: action.payload};

        default:
            return {...state};
    }
}