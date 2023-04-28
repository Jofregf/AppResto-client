import axios from "axios";
import {baseUrl} from "./restaurantActions";

export const GET_MENUS_BY_RESTAURANT_ID = "GET_MENUS_BY_RESTAURANT_ID";
export const ERROR = "ERROR";

export const getMenusByRestaurantId = (id) => async (dispatch) => {
    await axios.get(`${baseUrl}/api/menus/restaurant/${id}`).then(
        (response) => {
            dispatch({
                type: GET_MENUS_BY_RESTAURANT_ID,
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
        console.error("Error en la solicitud:", error);
    });
}