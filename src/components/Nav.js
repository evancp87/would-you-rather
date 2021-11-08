import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOutUser } from "../actions/signedInUser";

class Nav extends Component {
  handleLogOut = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(signOutUser());
    this.setState(() => ({
      signedInUser: null,
    }));
  };

  render() {
    const { signedInUser } = this.props;
    return (
      <nav className="nav-bar">
        <ul className="items">
          <div className="links">
            <li className="navitem">
              <NavLink
                to="/"
                exact
                activeStyle={{ textDecoration: "underline"}}
              >
                Home
              </NavLink>
            </li>
            <li className="navitem">
              <NavLink to="/add" activeStyle={{ textDecoration: "underline" }}>
                New Question
              </NavLink>
            </li>
            <li className="navitem">
              <NavLink
                to="/leaderboard"
                activeStyle={{ textDecoration: "underline" }}
              >
                Leaderboard
              </NavLink>
            </li>
          </div>

          <div>
            <li className="loguser">
              {this.props.signedInUser !== null && (
                <div>
                  <div className="loguserdetails">
                    <div>
                      <img
                        src={this.props.users[signedInUser].avatarURL}
                        alt={this.props.users[signedInUser].name}
                        className="avatar-pic"
                      />
                    </div>
                    <div>{`Hello, ${this.props.users[signedInUser].name}`}</div>
                    <NavLink to="/login" exact>
                      <button
                        onClick={this.handleLogOut}
                        className="signout-btn"
                      >
                        Sign Out
                      </button>
                    </NavLink>
                  </div>
                </div>
              )}
            </li>
          </div>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ signedInUser, users }) {
  return {
    signedInUser,
    users,
  };
}

export default connect(mapStateToProps)(Nav);
