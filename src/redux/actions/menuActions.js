import axios from "axios";
import {baseUrl} from "./restaurantActions";

export const GET_MENUS_BY_RESTAURANT_ID = "GET_MENUS_BY_RESTAURANT_ID";
export const ERROR = "ERROR";
export const CREATE_MENU = "CREATE_MENU";
export const EDIT_MENU = "EDIT_MENU";
export const DELETE_MENU = "DELETE_MENU";

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

export const createMenu = ({menuName, menuDescription, menuImage, token, id}) => async (dispatch) => {
    
    await axios.post(`${baseUrl}/api/menus/restaurant/${id}`, {
            menuName, 
            menuDescription, 
            menuImage
        }, {headers: {"Authorization": "Bearer " + token}}).then(
        (response) => {
            dispatch({
                type: CREATE_MENU,
                payload: response.data,
            })
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error,
            })
        }
    ).catch(error => {
        console.error("Error en la solicitud:", error);
    })
}

export const editMenu = ({data, token, idMenu, idResto}) => async (dispatch) => {

    await axios.put(`${baseUrl}/api/menus/${idMenu}/restaurant/${idResto}`, data, 
    {headers: {"Authorization": "Bearer " + token}}).then(
        (response) => {
            dispatch({
                type: EDIT_MENU,
                payload: response.data,
            })
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error,
            })
        }
    ).catch(error => {
        console.error("Error en la solicitud", error);
    })
}

export const deleteMenu = ({idMenu, idResto, token}) => async (dispatch) => {
    
    await axios.delete(`${baseUrl}/api/menus/${idMenu}/restaurant/${idResto}`, {headers: {"Authorization" : "Bearer " + token}}).then(
        (response) => {
            dispatch({
                type: DELETE_MENU,
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