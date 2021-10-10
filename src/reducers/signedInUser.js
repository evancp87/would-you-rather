import { SET_SIGNED_IN_USER, SIGN_OUT_USER } from "../actions/signedInUser";

export default function signedInUser(state = null, action) {
  switch (action.type) {
    case SET_SIGNED_IN_USER: {

      return action.id;
    }
      
      case SIGN_OUT_USER :  { 
        return null;
      }
      default :
      return state;
    }
}
