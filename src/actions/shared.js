import {getInitialData} from "../utils/Api"
import {_saveQuestion} from '../utils/_DATA'
import {receiveQuestions, addQuestion, saveQuestionAnswer} from "../actions/questions"
import {receiveUsers, saveUserQuestion, saveUserAnswer} from "../actions/users"
import {setSignedInUser, signOutUser} from "../actions/signedInUser"
import {showLoading, hideLoading} from 'react-redux-loading'


let SIGNED_ID =  null

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
        .then(({users,
            questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setSignedInUser(SIGNED_ID))
            dispatch(hideLoading())
        })
    }
}

// TODO: asynchronous handles
export function handleSaveQuestionAnswer (answer, qid, signedInUser) {
    // TODO: finish this -  return (dispatch)=> {
    //     dispatch(showLoading)
    //     .then()
    // }
}


export function handleNewQuestion (optionOneText, optionTwoText) {}