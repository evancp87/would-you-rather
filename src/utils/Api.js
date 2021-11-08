import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

// saves question
export function saveQuestion(question) {
  return _saveQuestion(question);
}

// saves answer
export function saveQuestionAnswer({ authedUser, qid, answer }) {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}
