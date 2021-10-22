import React, { Component } from "react";
import { connect } from "react-redux";

export class Leaderboard extends Component {
  render() {
    const { name, avatar, answers, author, users, questions } = this.props;
    const answeredQs = users[answers] && Object.values(users[answers]).length;
    const questionsCreated = users[questions] && Object.values(users[questions]).length;
    const score = answeredQs + questionsCreated;

    return (
      // map over list of users
      <div>
        <ul>
          {users && Object.keys(users).map((id) => (
            <li key={id}>
              <div>
                <div>
                  <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className="avatar"
                  />
                </div>
                <div className="question-info">
                  <h2>{author.name} </h2>
                  <p>Answered Questions: {answeredQs && answeredQs}</p>
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

function mapStateToProps({ users }) {
  const sortedLeaders = Object.values(users).sort((a, b) => {
    return (
      Object.keys(b.answers).length +
      b.questions.length -
      (Object.keys(a.answers.length) + a.questions.length)
    );
  });
  return { sortedLeaders };
}
export default connect(mapStateToProps)(Leaderboard);
