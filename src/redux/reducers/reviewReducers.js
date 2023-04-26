import {GET_REVIEWS_BY_RESTAURANT_ID, ERROR} from '../actions/reviewActions';

const initialState = {
    reviews : [],
    review: [],
    status: ''
};

export default function reviewReducers (state = initialState, action) {

    switch (action.type) {

        case GET_REVIEWS_BY_RESTAURANT_ID:
            return {...state, reviews: action.payload};
    
        case ERROR:
        return {...state, status: action.payload};

        case 'CLEAR_REVIEWS':
            return {...state, reviews: []};

        default:
            return {...state};
    }
}