import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

export class Leaderboard extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
    answer: PropTypes.array.isRequired,
    
  }
  render() {
    const { name, avatar, answers, author, users, questions } = this.props;
    const answeredQs = Object.keys(users[answers]).length;
    const questionsCreated = Object.keys(users[questions]).length;
    const score = answeredQs + questionsCreated;

    return (
      // map over list of users
      <div>
        <ul>
          {users.map((id) => (
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
                  <p>Answered Questions: {answeredQs}</p>
                  <p>Created questions: {questionsCreated}</p>
                  <div>
                    <p>Score</p>

                    <span>{score}</span>
                  </div>
                </div>
              </div>
              {/* // TODO: logic with leaderboard place trophy icon */}
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
