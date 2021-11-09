import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export class Leaderboard extends Component {
  render() {
    const { sortedLeaderData, signedInUser } = this.props;

    if (signedInUser === null) {
      return <Redirect to="/" />;
    }

    return (
      // map over list of users, showing questions created/answered and sorted by score
      <div className="center">
        <ul>
          {sortedLeaderData.map((user) => (
            <li key={user.id} className="ldr-card">
              <div>
                <img
                  src={user.avatarURL}
                  alt={`Avatar of ${user.userName}`}
                  className="avatar"
                />

                <h2 className="author-header">{user.userName} </h2>

                <div className="num-questions">
                  <div className='q-container'>

                  <p className="ansQs">
                    
                    Answered Questions: {user.numAnswered}
                  </p>
                  <p className="createdQs">
                    Created questions: {user.numQsCreated}
                  </p>
                  </div>
                  <div className='star-label'>
                    <p className="score">
                      Score: {user.numAnswered + user.numQsCreated}
                    </p>
                  </div>
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
  // iterating users and mapping into a new object with user info/questions created and answered for use above
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
