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
      
        <nav className='navbar'>
          <ul className='navitems'>
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
            </ul>
            <ul className="loguser">
            <li >
              {this.props.signedInUser !== null && (
                <div >
                  <div className="loguserdetails">

                  <img src={avatarURL} alt={name} className="avatar-pic"/>
                  <div >{`Hello, ${signedInUser.name}`}</div>
                  </div>

                  <NavLink to="/login" exact className="signout-btn">
                    <button onClick={this.handleLogOut}>Sign Out</button>
                  </NavLink>
                </div>
              )}
            </li>
          </ul>
        </nav>
      
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
