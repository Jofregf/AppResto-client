import axios from "axios";

export const ERROR = "ERROR";
export const GET_RESTAURANTS = "GET_RESTAURANTS";
export const GET_RESTAURANT_DETAILS = "RESTAURANT_DETAILS";
export const GET_RESTAURANT_BY_MENU_NAME = "GET_RESTAURANT_BY_MENU_NAME";
export const GET_RESTAURANT_BY_AVERAGE_RATING =  "GET_RESTAURANT_BY_AVERAGE_RATING";
export const CREATE_RESTAURANT = "CREATE_RESTAURANT";
export const GET_RESTAURANT_BY_USER = "GET_RESTAURANT_BY_USER";
export const EDIT_RESTAURANT = "EDIT_RESTAURANT";
export const DELETE_RESTAURANT = "DELETE_RESTAURANT";
export const EDIT_ENABLED_RESTAURANT = "EDIT_ENABLED_RESTAURANT";



export const baseUrl = "http://localhost:8080";

export const getRestaurants = () => async (dispatch) => {

    try {
        const response = await axios.get(`${baseUrl}/api/restaurants`);
        dispatch({
            type: GET_RESTAURANTS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud",
        });
    }
};

export const getRestaurantDetails = (id) => async (dispatch) => {

    try {
        const response = await axios.get(`${baseUrl}/api/restaurants/${id}`);
        dispatch({
            type: GET_RESTAURANT_DETAILS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud",
        });
    }
};

export const getRestaurantByMenuName = (menuName) => async (dispatch) => {

    try {
        const response = await axios.get(`${baseUrl}/api/search/menus/restaurants`,
            {headers: {menuName : menuName}}
        );
        dispatch({
            type: GET_RESTAURANT_BY_MENU_NAME,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud",
        });
    }
};

export const getRestaurantByAverageRating = (rating) => async (dispatch) => {

    try {
        const response = await axios.get(`${baseUrl}/api/restaurants/rating`, 
            {headers: {rating: rating}}
        );
        dispatch ({
            type: GET_RESTAURANT_BY_AVERAGE_RATING,
            payload: response.data,
        });
    } catch (error) {
        dispatch ({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        });
    }
};

export const createRestaurant = ({restaurantName, restaurantAddress, restaurantPhone, restaurantEmail, restaurantDescription, openingHoursRestaurant, closingHoursRestaurant , restaurantImages, restaurantCapacity, token}) => async (dispatch) => {

    try {
        const images = Array.isArray(restaurantImages) ? restaurantImages : [restaurantImages];
        const response = await axios.post(`${baseUrl}/api/restaurants`, 
            {
                restaurantName, 
                restaurantAddress, 
                restaurantPhone, 
                restaurantEmail, 
                restaurantDescription, 
                openingHoursRestaurant, 
                closingHoursRestaurant , 
                restaurantImages: images, 
                restaurantCapacity
            }, 
            {headers: {"Authorization": "Bearer " + token}}
        );
        dispatch({
            type: CREATE_RESTAURANT,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        });
    }
};

export const getRestoByUser = ({token}) => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/api/restaurants/list`, 
            {headers: {"Authorization": "Bearer " + token}}
        );
        dispatch ({
            type: GET_RESTAURANT_BY_USER,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud",
        })
    }
};

export const editRestaurant = ({data, id, token}) => async (dispatch) => {
    
    try {
        const response = await axios.put(`${baseUrl}/api/restaurants/${id}`, 
            data, 
            {headers: {"Authorization" : "Bearer " + token}}
        );
        dispatch ({
            type: EDIT_RESTAURANT,
            payload: response.data,
        });
    } catch (error) {
        dispatch ({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        });
    }
};

export const deleteRestaurant = ({id, token}) => async (dispatch) => {

    try {
        const response = await axios.delete(`${baseUrl}/api/restaurants/${id}`, 
            {headers: {"Authorization" : "Bearer " + token}}
        );
        dispatch({
            type: DELETE_RESTAURANT,
            payload: response.data
        })
    } catch (error) {
        dispatch ({
            type: ERROR,
            payload: error.error,
        });
    }
};

export const editEnabledResto = ({id, enabled, token}) => async (dispatch) => {
    
    try {
        const restaurantDTO = { enabled };
        const response = await axios.put(`${baseUrl}/api/admin/restaurants/${id}`, 
            restaurantDTO, 
            {headers: {"Authorization" : "Bearer " + token}}
        );
        dispatch({
            type: EDIT_ENABLED_RESTAURANT,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type:ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        })
    }
};

