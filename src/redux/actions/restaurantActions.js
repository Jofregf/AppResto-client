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
    await axios.get(`${baseUrl}/api/restaurants`).then (
        (response) => {
            dispatch({
                type: GET_RESTAURANTS,
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
        console.error("Error en la solicitud:", error);
    });
};

export const getRestaurantDetails = (id) => async (dispatch) => {
    await axios.get(`${baseUrl}/api/restaurants/${id}`).then(
        (response) => {
            dispatch({
                type: GET_RESTAURANT_DETAILS,
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
        console.error("Error en la solicitud:", error);
    });
};

export const getRestaurantByMenuName = (menuName) => async (dispatch) => {
    await axios.get(`${baseUrl}/api/search/menus/restaurants`,
    { headers: {menuName : menuName}}).then(
        (response) => {
            dispatch({
                type: GET_RESTAURANT_BY_MENU_NAME,
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
        console.error("Error en la solicitud:", error);
    });
};

export const getRestaurantByAverageRating = (rating) => async (dispatch) => {
    await axios.get(`${baseUrl}/api/restaurants/rating`, 
    {headers: {rating: rating}}).then(
        (response) => {
            dispatch ({
                type: GET_RESTAURANT_BY_AVERAGE_RATING,
                payload: response.data,
            });
        },
        (error) => {
            dispatch ({
                type: ERROR,
                payload: error.error,
            });
        },
    ).catch(error => {
        console.error("Error en la solicitud", error);
    });
};

export const createRestaurant = ({restaurantName, restaurantAddress, restaurantPhone, restaurantEmail, restaurantDescription, openingHoursRestaurant, closingHoursRestaurant , restaurantImages, restaurantCapacity, token}) => async (dispatch) => {    
    const images = Array.isArray(restaurantImages) ? restaurantImages : [restaurantImages];
    await axios.post(`${baseUrl}/api/restaurants`, {
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
    {headers: {"Authorization": "Bearer " + token}}).then(
        (response) => {
            dispatch({
                type: CREATE_RESTAURANT,
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
        console.error("Error en la solicitud", error);
    });
};

export const getRestoByUser = ({token}) => async (dispatch) => {
    
    await axios.get(`${baseUrl}/api/restaurants/list`, {headers: {"Authorization": "Bearer " + token}}).then(
        (response) => {
            dispatch ({
                type: GET_RESTAURANT_BY_USER,
                payload: response.data,
            })
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error,
            });
        },
    ).catch(error => {
        console.error("Error en la solicitud", error);
    });
};

export const editRestaurant = ({data, id, token}) => async (dispatch) => {
    
    await axios.put(`${baseUrl}/api/restaurants/${id}`, data, {headers: {"Authorization" : "Bearer " + token}}).then(
        (response) => {
            dispatch ({
                type: EDIT_RESTAURANT,
                payload: response.data,
            });
        },
        (error) => {
            dispatch ({
                type: ERROR,
                payload: error.error,
            });
        },
        ).catch(error => {
            console.error("Error en la solicitud", error);
        });
};

export const deleteRestaurant = ({id, token}) => async (dispatch) => {
  
    await axios.delete(`${baseUrl}/api/restaurants/${id}`, {headers: {"Authorization" : "Bearer " + token}}).then(
        (response) => {
            dispatch({
                type: DELETE_RESTAURANT,
                payload: response.data
            })
        },
        (error) => {
            dispatch ({
                type: ERROR,
                payload: error.error,
            });
        },
        ).catch(error => {
            console.error("Error en la solicitud", error);
        });
}

export const editEnabledResto = ({id, enabled, token}) => async (dispatch) => {
    console.log(id, "ID ACTION")
    console.log(enabled, "ENABLED ACTION")
    console.log(token, "TOKEN ACTION")
    const restaurantDTO = { enabled };
    await axios.put(`${baseUrl}/api/admin/restaurants/${id}`, restaurantDTO, {headers: {"Authorization" : "Bearer " + token}}).then(
        (response) => {
            dispatch({
                type: EDIT_ENABLED_RESTAURANT,
                payload: response.data,
            })
        },
        (error) => {
            dispatch({
                type:ERROR,
                payload: error.error,
            })
        }
    ).catch(error => {
        console.error("Error en la solicitud", error);
    });
}