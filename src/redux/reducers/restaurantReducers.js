import {ERROR, GET_RESTAURANTS, 
        GET_RESTAURANT_DETAILS, 
        GET_RESTAURANT_BY_MENU_NAME, 
        GET_RESTAURANT_BY_AVERAGE_RATING,
    } from "../actions/restaurantActions";

const initialState = {
    restaurants : [],
    restaurant: [],
    restaurantDetails: [],
    filteredRestaurants: [],
    status: ""
};

export default function restaurantReducers(state = initialState, action) {

    switch(action.type) {
        
        case GET_RESTAURANTS:
            return {...state, restaurants: action.payload};

        case GET_RESTAURANT_DETAILS:
            return {...state, restaurantDetails: action.payload};

        case GET_RESTAURANT_BY_MENU_NAME:
            return {...state, filteredRestaurants: action.payload};

        case GET_RESTAURANT_BY_AVERAGE_RATING:
            return{...state, filteredRestaurants: action.payload};
            
        case ERROR:
            return {...state, status: action.payload};

        default:
            return {...state};
    }
}