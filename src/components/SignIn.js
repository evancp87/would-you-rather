import React, { Component } from "react";
import { connect } from "react-redux";
import { setSignedInUser } from "../actions/signedInUser";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types'

class SignIn extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    toHome: PropTypes.bool.isRequired,
    signedInUser: PropTypes.object.isRequired,
  }
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
              {users.id.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
    ))}
            </select>
            <button
              type="submit"
              disabled={!users.name}
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

function mapStateToProps({ questions, users, signedInUser }) {
  return {
    users: Object.keys(users).map((id) => {
      return { id: users[id]["id"], name: users[id]["name"] };
    }),
    signedInUser,
    questions,
  };
}

export default connect(mapStateToProps)(SignIn);
