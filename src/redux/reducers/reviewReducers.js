import  {
            GET_REVIEWS_BY_RESTAURANT_ID, 
            ERROR,
            POST_REVIEW,
            DELETE_REVIEW,
            EDIT_REVIEW
        } from "../actions/reviewActions";

const initialState = {
    reviews : [],
    review: [],
    status: ""
};

export default function reviewReducers (state = initialState, action) {

    switch (action.type) {

        case GET_REVIEWS_BY_RESTAURANT_ID:
            return {...state, reviews: action.payload};
    
        case ERROR:
        return {...state, status: action.payload};

        case "CLEAR_REVIEWS":
            return {...state, reviews: []};

        case POST_REVIEW:
            return { ...state, status: action.payload, review: action.payload };

        case DELETE_REVIEW:
            return {...state, status: action.payload};

        case EDIT_REVIEW:
            return {...state, status: action.payload};    

        default:
            return {...state};
    }
}