import {getInitialData} from "../utils/Api"
import {RECEIVE_QUESTIONS} from "..actions/questions"
import {RECEIVE_USERS} from "../actions/users"
import {SET_SIGNED_IN_USER} from "../actions/signedInUser"


let SIGNED_ID =  null

export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
        .then(({users,
            questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setSignedInUser(SIGNED_ID))
        })
    }
}