import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOutUser } from "../actions/signedInUser";


class Nav extends Component {
  handleLogOut = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    this.setState(() => ({
      signedInUser: null,
    }));

    dispatch(signOutUser());
  };

  render() {
    const { avatarURL, name } = this.props;
    return (
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact className="">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" className="">
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard" className="">
                Leaderboard
              </NavLink>
            </li>
            <li className="loguser">
              {this.props.signedInUser !== null ? (
                <div>
                  <img src={avatarURL} alt={name} />
                 
              
                  <div>Hello, {name}</div>

                  <NavLink to="/login" exact className="">
                    <button onClick={this.handleLogOut}>Sign Out</button>
                  </NavLink>
                </div>
              ) : null}
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ signedInUser, users }) {
  return {
    signedInUser,
    avatar: signedInUser ? users(signedInUser).avatarURL : null,
    name: signedInUser ? users(signedInUser).name : null,
  };
}

export default connect(mapStateToProps)(Nav);
