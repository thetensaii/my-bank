import { combineReducers } from "redux";
import { accountReducer } from "./accountReducer";
import { userReducer } from "./userReducer";

export const reducers = combineReducers({
    user : userReducer,
    accounts : accountReducer
});