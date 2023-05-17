import {GET_MENUS_BY_RESTAURANT_ID, ERROR, CREATE_MENU} from "../actions/menuActions";

const initialState = {
    menus : [],
    menu : [],
    status: ""
};

export default function menuReducers (state = initialState, action) {

    switch(action.type) {

        case GET_MENUS_BY_RESTAURANT_ID:
            return {...state, menus: action.payload};

        case ERROR:
            return {...state, status: action.payload};

        case CREATE_MENU:
            return {...state, status: action.payload};

        default:
            return {...state};
    }
}