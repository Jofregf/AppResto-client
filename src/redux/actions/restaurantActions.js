import axios from "axios";

export const ERROR = "ERROR";
export const GET_RESTAURANTS = "GET_RESTAURANTS";
export const GET_RESTAURANT_DETAILS = "RESTAURANT_DETAILS";
export const GET_RESTAURANT_BY_MENU_NAME = "GET_RESTAURANT_BY_MENU_NAME";
export const GET_RESTAURANT_BY_AVERAGE_RATING =  "GET_RESTAURANT_BY_AVERAGE_RATING";
export const CREATE_RESTAURANT = "CREATE_RESTAURANT";


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
    console.log(images)
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

// export const createRestaurant = ({restaurantName, restaurantAddress, restaurantPhone, restaurantEmail, restaurantDescription, openingHoursRestaurant, closingHoursRestaurant , restaurantImages, restaurantCapacity, token}) => async (dispatch) => {
//     const images = Array.isArray(restaurantImages) ? restaurantImages : [restaurantImages];
//     await axios.post(`${baseUrl}/api/restaurants`, {
//           restaurantName, 
//           restaurantAddress, 
//           restaurantPhone, 
//           restaurantEmail, 
//           restaurantDescription, 
//           openingHoursRestaurant, 
//           closingHoursRestaurant , 
//           restaurantImages: images, 
//           restaurantCapacity
//       }, 
//       {headers: {"Authorization": "Bearer " + token}}).then(
//           (response) => {
//               dispatch({
//                   type: CREATE_RESTAURANT,
//                   payload: response.data,
//               });
//           },
//           (error) => {
//               dispatch({
//                   type: ERROR,
//                   payload: error.error,
//               });
//           },
//       ).catch(error => {
//           console.error("Error en la solicitud", error);
//       });
//   };
  