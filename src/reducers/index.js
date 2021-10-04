import { combineReducers } from "redux";
import {questions} from './reducers/questions'
import { setSignedInUser } from "./reducers/signedInUser";
import {users} from './reducers/users'

export default combineReducers({
    questions,
    setSignedInUser,
    users,
})