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
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";

export const createUser = ({userName, firstName, lastName, userPhone, userEmail, userPassword}) => async (dispatch) => {

    try {
        const response = await axios.post(`${baseUrl}/api/auth/register`, 
            {   
                userName, 
                firstName, 
                lastName, 
                userPhone, 
                userEmail, 
                userPassword
            }
        );
        dispatch({
            type: CREATE_USER,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: Error,
            payload: error.response?.data?.message || "Error en la solicitud",
        });
    }
};

export const userLogin =({usernameOrEmail, password}) => async (dispatch) => {

    try {
        const cookies = new Cookies();
        const response = await axios.post(`${baseUrl}/api/auth/login`, 
            {usernameOrEmail, password}
        );
        cookies.set("user", response.data, {path: "/", expires: new Date(Date.now() + (3600*100*24))});
        dispatch({
            type: USER_LOGIN,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Usuario o contraseña incorrecta"
        });
        
    }
};

export const getUsers = ({token}) => async (dispatch) => {

    try {
        const response = await axios.get(`${baseUrl}/api/admin/users`, 
            {headers: {"Authorization": "Bearer " + token}}
        );
        dispatch({
            type: GET_USERS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        });
    }
};

export const getUserById = ({token}) => async (dispatch) => {

    try {
        const response = await axios.get(`${baseUrl}/api/users`, 
            {headers: {"Authorization": "Bearer " + token}}
        );
        dispatch({
            type: GET_USER_BY_ID,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        });
    }
}

export const updateRole = ({usernameOrUserEmail, role, token}) => async (dispatch) => {
    
    try {
        const response = await axios.put(`${baseUrl}/api/admin/users/${usernameOrUserEmail}/role`, 
            {role}, 
            {headers: {"Authorization": "Bearer " + token}}
        )
        dispatch({
            type: UPDATE_ROLE,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        })
    }
};

export const unbanBanUser = ({usernameOrUserEmail, enabled, token}) => async (dispatch) => {

    try {
        const response = await axios.put(`${baseUrl}/api/admin/users/${usernameOrUserEmail}`, 
            {enabled}, 
            {headers: {"Authorization" : "Bearer " + token}}
        );
        dispatch({
            type: BAN_USER,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        });
    }
};

export const getUserByUsernameOrEmail = ({usernameOrEmail, token}) => async (dispatch) => {
    
    try {
        const response = await axios.get(`${baseUrl}/api/admin/users/search/${usernameOrEmail}`, 
            {headers: {"Authorization": "Bearer " + token}}
        );
        dispatch({
            type: GET_USER_BY_USERNAME_OR_EMAIL,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        });
    }
};

export const editUser = ({userName, firstName, lastName, userPhone, userEmail, token}) => async (dispatch) => {

    try {
        const response = await axios.put(`${baseUrl}/api/users`,
            {
                userName, 
                firstName, 
                lastName, 
                userPhone, 
                userEmail
            }, 
            {headers: {"Authorization": "Bearer " + token}}
        );
        dispatch({
            type: EDIT_USER,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        });
    }
};

export const editPassword = ({userPassword, token}) => async (dispatch) => {
    console.log(userPassword);
    console.log(token)
    try {
        const response = await axios.put(`${baseUrl}/api/users/password`,
            {userPassword}, 
            {headers: {"Authorization": "Bearer " + token}}
        );
        dispatch({
            type: UPDATE_PASSWORD,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        })
    }
};

export const forgotPassword = ({usernameOrEmail}) => async (dispatch) => {
    
    try {
        const response = await axios.put(`${baseUrl}/api/users/forgotpassword`, usernameOrEmail);
        dispatch({
            type: FORGOT_PASSWORD,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response?.data?.message || "Error en la solicitud"
        })
    }
}


