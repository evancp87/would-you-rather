import { combineReducers } from "redux";
import questions from './questions'
import signedInUser  from "./signedInUser";
import users from './users'
import { loadingBarReducer } from "react-redux-loading";


export default combineReducers({
    questions,
    signedInUser,
    users,
    loadingBar: loadingBarReducer,
})