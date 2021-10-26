import React, { Component } from "react";
import { connect } from "react-redux";

export class Leaderboard extends Component {
  render() {
    const {  users, user,  } = this.props;
    const leaders = Object.keys(users)
    // const numAnswered = users[answers] && Object.values(users[answers]).length;
    // const questionsCreated = users[questions] && Object.values(users[questions]).length;
    const numAnswered =  Object.values(leaders.answers).length
    const questionsCreated = leaders.questions.length;
    const score = numAnswered + questionsCreated;

    leaders.sort((a, b) => (b.score - a.score))



    return (
      // map over list of users
      <div>
        <ul>
          {users && Object.keys(users).map((id) => (
            <li key={id}>
              <div>
                <div>
                  <img
                    src={user.avatar}
                    alt={`Avatar of ${user.name}`}
                    className="avatar"
                  />
                </div>
                <div className="question-info">
                  <h2>{user.name} </h2>
                  <p>Answered Questions: {numAnswered && numAnswered}</p>
                  <p>Created questions: {questionsCreated && questionsCreated}</p>
                  <div>
                    <p>Score</p>

                    <span>{score}</span>
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

function mapStateToProps({ users, signedInUser}) {
  // const sortedLeaders = Object.keys(users).sort((a, b) => {
  //   return (
  //     Object.values(b.answers).length +
  //     b.questions.length -
  //     (Object.keys(a.answers.length) + a.questions.length)
  //   );
  // });
  // return { 
  //   users: sortedLeaders };
  return {

  users,
  signedInUser
  }
}
export default connect(mapStateToProps)(Leaderboard);
