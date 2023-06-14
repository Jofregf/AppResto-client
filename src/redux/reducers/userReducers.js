import {CREATE_USER, 
        ERROR, 
        USER_LOGIN, 
        UPDATE_ROLE,
        GET_USERS,
        GET_USER_BY_ID,
        BAN_USER,
        GET_USER_BY_USERNAME_OR_EMAIL,
        EDIT_USER,
        UPDATE_PASSWORD,
        FORGOT_PASSWORD,
        LOGOUT,

    } from "../actions/userActions";

const initialState = {
    users: [],
    user : [],
    status : "",
    token : ""
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER:
            return {...state, status: action.payload};

        case ERROR:
            return {...state, status: action.payload};

        case USER_LOGIN:
            return {...state, status: action.payload, user: action.payload || null, token: action.payload || null};

        case UPDATE_ROLE:
            return {...state, status: action.payload};    
        
        case GET_USERS:
            return {...state, users: action.payload};

        case BAN_USER:
            return {...state, status: action.payload};

        case GET_USER_BY_ID:
            return {...state, user: action.payload};

        case GET_USER_BY_USERNAME_OR_EMAIL:
            return {...state, user: action.payload};

        case EDIT_USER:
            return {...state, status: action.payload};

        case UPDATE_PASSWORD:
            return {...state, status: action.payload};

        case FORGOT_PASSWORD:
            return {...state, status: action.payload};

        case LOGOUT:
            return {...state, status: action.payload, user: action.payload || null, token: action.payload || null};

        default:
            return{...state};
    }
}

export default userReducer;