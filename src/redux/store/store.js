import { configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import restaurantReducers from "../reducers/restaurantReducers";
import reviewReducers from '../reducers/reviewReducers';
import menuReducers from '../reducers/menuReducers';

export const makeStore = () => {
    const store = configureStore({
        reducer:{
            restaurants: restaurantReducers,
            reviews: reviewReducers,
            menus: menuReducers,
        },
        middleware: [thunk],
    });

    return store;
};

export default makeStore();