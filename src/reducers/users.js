import {RECEIVE_USERS, SAVE_USER_ANSWER, SAVE_USER_QUESTION} from '../actions/users'


export default function users (state={}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
           return {
                ...state,
                ...action.users,
            }
            case SAVE_USER_ANSWER : return {
                ...state,
            //    TODO: finish object
            }

            case SAVE_USER_QUESTION : return {
                ...state,
                 //    TODO: finish object
            }
            default : return state
    }

}