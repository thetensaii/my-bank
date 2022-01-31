import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { reducers } from "./reducers";
import config from "config";

const middlewares = [thunk]
export const store = config.NODE_ENV === "production" ?  
    createStore(
        reducers,
        applyMiddleware(...middlewares)
    )
    : 
    createStore(
        reducers,
        composeWithDevTools(
            applyMiddleware(...middlewares)
        )
    );