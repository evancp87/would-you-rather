import React, { Component } from "react";
import { connect } from "react-redux";

export class Leaderboard extends Component {
  render() {
    const { sortedLeaderData } = this.props;

    return (
      // map over list of users
      <div className="center">
        <ul>
          {sortedLeaderData.map((user) => (
            <li key={user.name}>
              <div className="ldr-card">
                <div className="ldr-info">
                  <img
                    className="ldrboard-img"
                    src={user.avatar}
                    alt={`Avatar of ${user.name}`}
                    className="avatar"
                  />
                </div>
                
                  <div className="num-questions">

                  <h2>{user.name} </h2>
                  <p>Answered Questions: {user.numAnswered}</p>
                  <p>Created questions: {user.numQsCreated}</p>
                  </div>
                  <div className="score">
                    <p>Score</p>

                    <span>{user.numAnswered + user.numQsCreated}</span>
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
