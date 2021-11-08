import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom"

export class Leaderboard extends Component {
  render() {
    const { sortedLeaderData, signedInUser } = this.props;
     if (!signedInUser || signedInUser === null) {
      return <Redirect to="/" />;
    } 

    return (
      // map over list of users
      <div className="center">
        <ul>
          {sortedLeaderData.map((user) => (
            <li key={user.id} className="ldr-card">
              <div>
                <img
                  className="ldrboard-img"
                  src={user.avatarURL}
                  alt={`Avatar of ${user.userName}`}
                  className="avatar"
                />

                <h2 className="author-header">{user.userName} </h2>

                <div className="num-questions">
                  <p>Answered Questions: {user.numAnswered}</p>
                  <p>Created questions: {user.numQsCreated}</p>

                  <p className="score">
                    Score: {user.numAnswered + user.numQsCreated}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const sortedLeaderData = Object.values(users).map((user) => ({
    id: user.id,
    userName: user.name,
    avatarURL: user.avatarURL,
    numAnswered: Object.values(user.answers).length,
    numQsCreated: user.questions.length,
    score: Object.values(user.answers).length + user.questions.length,
  }));

  sortedLeaderData.sort((a, b) => b.score - a.score);
  console.log(sortedLeaderData);

  return {
    sortedLeaderData,
  };
}
export default connect(mapStateToProps)(Leaderboard);
