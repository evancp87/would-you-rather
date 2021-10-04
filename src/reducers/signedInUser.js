import { bindActionCreators } from "redux";
import { SET_SIGNED_IN_USER } from "../actions/signedInUser";

export default function signedInUser(state = null, action) {
  switch (action.type) {
    case SET_SIGNED_IN_USER:
      return action.id;
    default:
      state;
  }
}
