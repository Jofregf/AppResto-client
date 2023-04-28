import axios from "axios";
import {baseUrl} from "./restaurantActions";
import Cookies from "universal-cookie";

export const CREATE_USER = "CREATE_USER";
export const ERROR = "ERROR";
export const USER_LOGIN = "USER_LOGIN";

export const createUser = ({userName, firstName, lastName, userPhone, userEmail, userPassword}) => async (dispatch) => {
    await axios.post(`${baseUrl}/api/auth/register`, {userName, firstName, lastName, userPhone, userEmail, userPassword}).then(
        (response) => {
            dispatch({
                type: CREATE_USER,
                payload: response.data
            })
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error
            })
        }
    ).catch(error => {
        console.error("Error en la solicitud:", error);
    });
}

export const userLogin =({usernameOrEmail, password}) => async (dispatch) => {
    const cookies = new Cookies();
    axios.post(`${baseUrl}/api/auth/login`, {usernameOrEmail, password}).then(
        (response) => {
            cookies.set("user", response.data, {path: "/restaurants", expires: new Date(Date.now() + (3600*100*24))});
            dispatch({
                type: USER_LOGIN,
                payload: response.data
            })
            console.log(response.data)
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: "Usuario/email o contraseña incorrectos", error
            })
        }
    ).catch(error => {
        console.error("Error en la solicitud:", error);
    });
}