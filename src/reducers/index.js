import { combineReducers } from "redux";
import questions from './questions'
import setSignedInUser  from "./signedInUser";
import users from './users'
import { LoadingBarReducer } from "react-redux-loading";


export default combineReducers({
    questions,
    setSignedInUser,
    users,
    loadingBar: LoadingBarReducer,
})