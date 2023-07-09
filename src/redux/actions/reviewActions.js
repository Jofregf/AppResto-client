import axios from "axios";
import {baseUrl} from "./restaurantActions";

export const ERROR = "ERROR";
export const GET_REVIEWS_BY_RESTAURANT_ID = "GET_REVIEWS_BY_RESTAURANT_ID";
export const CLEAR_REVIEWS = "CLEAR_REVIEWS";
export const POST_REVIEW = "POST_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const EDIT_REVIEW = "EDIT_REVIEW";

export const getReviewsByRestaurantId = (id) => async (dispatch) => {
    
    await axios.get(`${baseUrl}/api/restaurants/${id}/reviews`)
    .then(
        (response) => {
            dispatch({
                type: GET_REVIEWS_BY_RESTAURANT_ID,
                payload: response.data,
            });
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error,
            });
        },
    )
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });
};

export const clearReviews = () => ({
    type: "CLEAR_REVIEWS",
});

export const postReview = ({ratingReview, commentReview, id, token}) => async (dispatch) => {
    
    await axios.post(`${baseUrl}/api/reviews/restaurant/${id}`, 
        {
            ratingReview,
            commentReview,
        },
        {headers: {"Authorization": "Bearer " + token}}
    )
    .then(
        (response) => {
            dispatch({
                type: POST_REVIEW,
                payload: response.data
            })
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error
            })
        }
    )
    .catch(error => {
        console.error("Error en la solicitud", error);
    });
};

export const deleteReview = ({id, token}) => async (dispatch) => {
    console.log(token)
    console.log(id)
    await axios.delete(`${baseUrl}/api/reviews/${id}`, 
        
        {headers: {"Authorization": "Bearer " + token}}
    )
    .then(
        (response) => {
            dispatch({
                type: DELETE_REVIEW,
                payload: response.data
            })
            console.log(response.data)
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error
            })
        }
    )
    .catch(error => {
        console.error("Error en la solicitud", error);
    });
};

export const editReview = ({ratingReview, commentReview, id, token}) => async (dispatch) => {
    console.log(token)
    console.log(ratingReview)
    console.log(commentReview)
    console.log(id)
    await axios.put(`${baseUrl}/api/reviews/${id}`, 
        {
            ratingReview,
            commentReview,
        },
        {headers: {"Authorization": "Bearer " + token}}
    )
    .then(
        (response) => {
            dispatch({
                type: EDIT_REVIEW,
                payload: response.data
            })
            console.log(response.data)
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error
            })
        }
    )
    .catch(error => {
        console.error("Error en la solicitud", error);
    });
};