import {CREATE_USER, ERROR, USER_LOGIN} from "../actions/userActions";

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
            return {...state, status: action.payload, user: action.payload || null, token: action.payload?.tokenSession || null}

        default:
            return{...state}
    }
}

export default userReducer;