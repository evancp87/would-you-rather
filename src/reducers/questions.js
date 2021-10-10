import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  SAVE_QUESTION_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };

//       When a user answers a question it updates the user.answer and concats the answer onto the votes array
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer] : {
                  ...state[action.qid][action.answer],                
                  votes: state[action.qid][action.answer].votes.concat([action.authedUser]),
                }
        },
      };

    default:
      return state;
  }
}
