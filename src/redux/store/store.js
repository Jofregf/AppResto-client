import { configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import restaurantReducers from "../reducers/restaurantReducers";
import reviewReducers from "../reducers/reviewReducers";
import menuReducers from "../reducers/menuReducers";
import userReducers from "../reducers/userReducers"

export const makeStore = () => {
    const store = configureStore({
        reducer:{
            restaurants: restaurantReducers,
            reviews: reviewReducers,
            menus: menuReducers,
            users: userReducers,
        },
        middleware: [thunk],
    });

    return store;
};

export default makeStore();