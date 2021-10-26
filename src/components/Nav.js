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
    const { avatarURL, name, signedInUser } = this.props;
    return (
      <div className='navbar'>
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
              {this.props.signedInUser !== null && (
                <div>
                  <img src={avatarURL} alt={name} />
                 
              
                  <div>{`Hello, ${signedInUser.name}`}</div>

                  <NavLink to="/login" exact className="">
                    <button onClick={this.handleLogOut}>Sign Out</button>
                  </NavLink>
                </div>
              )}
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
    users,
    // avatar: signedInUser ? users(signedInUser).avatarURL : null,
    // name: signedInUser ? users(signedInUser).name : null,
  };
}

export default connect(mapStateToProps)(Nav);
