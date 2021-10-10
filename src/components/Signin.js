import React, { Component } from "react";
import { connect } from "react-redux";
import { setSignedInUser } from "../actions/signedInUser";
import { Redirect } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";

class SignIn extends Component {
  state = {
    signedInUser: "",
    toHome: false,
    loading: false,
  };

  handleChange = (e) => {
    const { dispatch } = this.props;
    const signedInUser = e.target.value;
    dispatch(setSignedInUser(signedInUser));

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

    
    this.setState(() => ({
        signedInUser: signedInUser,
        toHome: true,
        loading: true,
    }));

    dispatch(setSignedInUser(signedInUser));
  };
  render() {
    const { signedInUser, toHome } = this.state;
    const { users } = Object.values(this.props.users);
    if (this.state.toHome === true) {
      <Redirect path="/" />;
    }

    return (
      <div>
        <div>
          <div>
            <p>Welcome! Please sign in to your account.</p>
          </div>
          <form>
            <select onChange={this.handleChange}>
              {users.id.map((user) => {
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>;
              })}
            </select>
            <button type='submit' disabled={!users.name} onSubmit={this.handleSubmit}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, signedInUser }) {
  return {
    users: Object.keys(users).map((id) => {
      return { id: users[id]["id"], name: users[id]["name"] };
    }),
    signedInUser,
  };
}

export default connect(mapStateToProps)(SignIn);
