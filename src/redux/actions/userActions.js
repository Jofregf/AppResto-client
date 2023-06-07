import axios from "axios";
import {baseUrl} from "./restaurantActions";
import Cookies from "universal-cookie";

export const CREATE_USER = "CREATE_USER";
export const ERROR = "ERROR";
export const USER_LOGIN = "USER_LOGIN";
export const UPDATE_ROLE = "UPDATE_ROLE";
export const GET_USERS = "GET_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const BAN_USER = "BAN_USER";
export const GET_USER_BY_USERNAME_OR_EMAIL = "GET_USER_BY_USERNAME_OR_EMA"
export const EDIT_USER = "EDIT_USER";

export const createUser = ({userName, firstName, lastName, userPhone, userEmail, userPassword}) => async (dispatch) => {

    await axios.post(`${baseUrl}/api/auth/register`, 
        {   
            userName, 
            firstName, 
            lastName, 
            userPhone, 
            userEmail, 
            userPassword
        }
    )
    .then(
        (response) => {
            dispatch({
                type: CREATE_USER,
                payload: response.data
            });
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error
            });
        },
    )
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });
};

export const userLogin =({usernameOrEmail, password}) => async (dispatch) => {

    const cookies = new Cookies();
    axios.post(`${baseUrl}/api/auth/login`, 
        {usernameOrEmail, password})
    .then(
        (response) => {
            cookies.set("user", response.data, {path: "/", expires: new Date(Date.now() + (3600*100*24))});
            dispatch({
                type: USER_LOGIN,
                payload: response.data
            });
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: "Usuario/email o contraseña incorrectos", error
            });
        },
    )
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });
};

export const getUsers = ({token}) => async (dispatch) => {

    await axios.get(`${baseUrl}/api/admin/users`, 
        {headers: {"Authorization": "Bearer " + token}})
    .then(
        (response) => {
            dispatch({
                type: GET_USERS,
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
        console.error("Error en la solicitud", error)
    });
};

export const getUserById = ({token}) => async (dispatch) => {
    
    await axios.get(`${baseUrl}/api/users`, 
        {headers: {"Authorization": "Bearer " + token}})
    .then(
        (response) => {
            dispatch({
                type: GET_USER_BY_ID,
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
        console.error("Error en la solicitud", error);
    })
}

export const updateRole = ({usernameOrUserEmail, role, token}) => async (dispatch) => {
    
    await axios.put(`${baseUrl}/api/admin/users/${usernameOrUserEmail}/role`, 
        {role}, 
        {headers: {"Authorization": "Bearer " + token}}
    )
    .then(
        (response) => {
            dispatch({
                type: UPDATE_ROLE,
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
        console.error("Error en la solicitud", error);
    });
};

export const unbanBanUser = ({usernameOrUserEmail, enabled, token}) => async (dispatch) => {

    await axios.put(`${baseUrl}/api/admin/users/${usernameOrUserEmail}`, 
        {enabled}, 
        {headers: {"Authorization" : "Bearer " + token}}
    )
    .then(
        (response) => {
            dispatch({
                type: BAN_USER,
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
        console.error("Error en la solicitud", error);
    });
};

export const getUserByUsernameOrEmail = ({usernameOrEmail, token}) => async (dispatch) => {
    
    await axios.get(`${baseUrl}/api/admin/users/search/${usernameOrEmail}`, 
        {headers: {"Authorization": "Bearer " + token}})
    .then(
        (response) => {
            dispatch({
                type: GET_USER_BY_USERNAME_OR_EMAIL,
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
        console.error("Error en la solicitud", error);
    });
};

export const editUser = ({userName, firstName, lastName, userPhone, userEmail, token}) => async (dispatch) => {
    
    await axios.put(`${baseUrl}/api/users`,
        {
            userName, 
            firstName, 
            lastName, 
            userPhone, 
            userEmail
        }, 
        {headers: {"Authorization": "Bearer " + token}}
    )
    .then(
        (response) => {
            dispatch({
                type: EDIT_USER,
                payload: response.data,
            });
            console.log(response.data, "edituserACTION")
        },
        (error) => {
            dispatch({
                type: ERROR,
                payload: error.error,
            });
        },
    )
    .catch(error => {
        console.error("Error en la solicitud", error);
    });
};

