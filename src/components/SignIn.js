import React, { Component } from "react";
import { connect } from "react-redux";
import { setSignedInUser } from "../actions/signedInUser";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    signedInUser: "",
    toHome: false,
    loading: false,
  };

  handleChange = (e) => {
    const signedInUser = e.target.value;

    this.setState(() => ({
      signedInUser: signedInUser,
      toHome: false,
      loading: false,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let { signedInUser } = this.state;
    const { dispatch } = this.props;

    if (!signedInUser) {
      alert("Please sign in");
    } else if (signedInUser) {
      return <Redirect to="/" />;
    }

    dispatch(setSignedInUser(signedInUser));

    this.setState(() => ({
      signedInUser: signedInUser,
      toHome: signedInUser ? false : true,
      loading: true,
    }));
  };
  render() {
    // const { users } = Object.values(this.props.users);
    if (this.state.toHome === true) {
      <Redirect path="/" />;
    }
const {signedInUser} = this.state
    return (
      <div className="signIn">
        <div>
          <div>
            <p>Welcome! Please sign in to your account.</p>
          </div>
          <form>
            <select onChange={this.handleChange}>
              <option value=''>Select User</option>
              {(this.props.users || []).map((user) => {
                return (

                  <option key={user.id} value={user.id}>
                  {user.name}
                </option> ) })}
                  
              {/* {Object.values(this.props.users).map((user) => (
                <option value={user.name}>
                  {user.name}
                </option> */}

    {/* ))} */}
    console.log(users)
            </select>
            <button
              type="submit"
              disabled={!signedInUser.name}
              onSubmit={this.handleSubmit}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, signedInUser, answers }) {
  return {
    users: Object.keys(users).map((id) => {
      return { id: users[id]["id"], name: users[id]["name"] };
    }),
    signedInUser,
    questions,
    answers,
   
  };
}

export default connect(mapStateToProps)(SignIn);
