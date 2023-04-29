import {CREATE_USER, 
        ERROR, 
        USER_LOGIN, 
        UPDATE_ROLE,
        GET_USERS,
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
            return {...state, users: action.payload}

        default:
            return{...state}
    }
}

export default userReducer;