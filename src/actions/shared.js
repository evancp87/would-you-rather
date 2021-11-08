import { getInitialData } from "../utils/Api";
import { saveQuestion, saveQuestionAnswer } from "../utils/Api";
import {
  receiveQuestions,
  addQuestion,
  saveAnswer,
} from "../actions/questions";
import {
  receiveUsers,
  saveUserQuestion,
  saveUserAnswer,
} from "../actions/users";
import { setSignedInUser, signOutUser } from "../actions/signedInUser";
import { showLoading, hideLoading } from "react-redux-loading";

let SIGNED_ID = null;

//  handles initial data
export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setSignedInUser(SIGNED_ID));
      dispatch(signOutUser(null));
      dispatch(hideLoading());
    });
  };
}

// handles saving answer to question
export function handleSaveQuestionAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(saveAnswer(authedUser, qid, answer));
      dispatch(saveUserAnswer(authedUser, qid, answer));
      dispatch(hideLoading());
    });
  };
}

// handles adding new question
export function handleNewQuestion(signedInUser, optionOneText, optionTwoText) {
  return (dispatch) => {
    const qData = {
      author: signedInUser,
      optionOneText,
      optionTwoText,
    };
    dispatch(showLoading());
    return saveQuestion(qData).then((question) => {
      dispatch(addQuestion(question));
      dispatch(saveUserQuestion(question));
      dispatch(hideLoading());
    });
  };
}
