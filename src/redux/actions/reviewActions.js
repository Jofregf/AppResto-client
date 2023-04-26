import axios from 'axios';
import {baseUrl} from './restaurantActions';

export const ERROR = 'ERROR';
export const GET_REVIEWS_BY_RESTAURANT_ID = 'GET_REVIEWS_BY_RESTAURANT_ID';
export const CLEAR_REVIEWS = 'CLEAR_REVIEWS';

export const getReviewsByRestaurantId = (id) => async (dispatch) => {
    
    await axios.get(`${baseUrl}/api/restaurants/${id}/reviews`).then(
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
    ).catch(error => {
        console.error('Error en la solicitud:', error);
    });
};

export const clearReviews = () => ({
    type: 'CLEAR_REVIEWS',
});



// TODO: @PostMapping("/login") loguearse http://localhost:8080/api/auth/login
// TODO: @PostMapping("/register") crear usuario http://localhost:8080/api/auth/register