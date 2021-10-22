import {getInitialData} from "../utils/Api"
import {saveQuestion} from '../utils/Api'
// import {_saveQuestion} from '../utils/_DATA'
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
            dispatch(signOutUser(null))
            dispatch(hideLoading())
        })
    }
}


export function handleSaveQuestionAnswer (answer, qid, authedUser) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer(answer, qid, authedUser)
        .then(() => {
            dispatch(saveQuestionAnswer(answer, qid, authedUser))
                dispatch(saveUserAnswer(qid, authedUser, answer))
                dispatch(hideLoading()) 
        })

    }
}


export function handleNewQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const {signedInUser} = getState()
        dispatch(showLoading())
        return saveQuestion(signedInUser,optionOneText, optionTwoText)
        .then(question => {
            dispatch(addQuestion(question))
                dispatch(saveUserQuestion(question))
                dispatch(hideLoading()) 
        })

    }
}