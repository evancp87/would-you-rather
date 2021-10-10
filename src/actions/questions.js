import {saveQuestion} from '../utils/Api'
import { loadingBarReducer, showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receiveQuestions (questions) {
    return { 
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function saveQuestionAnswer (authedUser, qid, answer) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        answer,
        qid,
    }

}


export function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }

}

export function handleAddQuestion(optionOne, optionTwo) {
return (dispatch, getState) => {
    const {authedUser} = getState();

    dispatch(showLoading())

    return saveQuestion({
        author: authedUser,
        optionOne, 
        optionTwo,
    })
    .then((question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading())) 
}
}