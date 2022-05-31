import React, { Component } from "react";
import { connect } from "react-redux";
import { setSignedInUser } from "../actions/signedInUser";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    signedInUser: null,
    toHome: false,
    loading: false,
  };

  // handles state change of dropdown menu of users
  handleChange = (e) => {
    const id = e.target.value;

    this.setState(() => ({
      signedInUser: id,
      toHome: false,
      loading: false,
    }));
  };

  // handles sign in process of user
  handleSubmit = (e) => {
    e.preventDefault();

    // let { signedInUser } = this.state;
    const { dispatch } = this.props;

    dispatch(setSignedInUser(this.state.signedInUser));
    // this.props.history.push("/")

    this.setState(() => ({
      signedInUser: "",
      toHome: true,
      loading: true,
    }));
  };
  render() {
    console.log(this.props);
    const { users } = this.props;
    let userData = Object.values(users);
    if (this.state.toHome === true) {
      <Redirect path="/home" />;
    }
    return (
      <section className="center">
        <div className="signIn">
          <h2 className="signin-header">Would You Rather</h2>
          <div>
            <img src="/Cat-paws.jpg" alt="cat paws" className="paws" />
          </div>
          <p>Please sign in</p>
          <form className="signin-form">
            <div>
              <select onChange={this.handleChange} className="user-select">
                <option value="">Select User</option>
                {(userData || []).map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <button
                className="signin-btn"
                type="submit"
                disabled={!this.state.signedInUser}
                onClick={this.handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </section>
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
