import {CREATE_USER, 
        ERROR, 
        USER_LOGIN, 
        UPDATE_ROLE,
        GET_USERS,
        BAN_USER,
        GET_USER_BY_USERNAME_OR_EMAIL,
    } from "../actions/userActions";

const initialState = {
    users: [],
    user : {},
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

        case GET_USER_BY_USERNAME_OR_EMAIL:
            return {...state, user: action.payload};

        default:
            return{...state};
    }
}

export default userReducer;