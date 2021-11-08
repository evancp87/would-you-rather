import React, { Component } from "react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class QuestionResults extends Component {
  render() {
    const { users, questions, signedInUser, id} = this.props;
    const question = questions[id];
    const optionOne = question.optionOne;
    const optionTwo = question.optionTwo;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOnePercent = Math.floor((optionOne.votes.length / totalVotes) * 100);
    const optionTwoPercent = Math.floor((optionTwo.votes.length / totalVotes) * 100);
    const yourVote = users[signedInUser].answers[question.id]

    if (!signedInUser) {
      return <Redirect to="/" />;
    }

    if (id === null || undefined) {
      return <Redirect to="/NotFound" />;
    }

    return (
      <div className="center">
        <div className="qResult-card">
          <img
            src={users[question.author].avatarURL}
            alt={`Avatar of ${users[question.author].name}`}
            className="avatar-img"
          />
          <h2 className="author-header">
            <b>{users[question.author].name} wants to know...</b>
          </h2>
          <p>Results</p>
          <h3>...Would you rather...</h3>
          <div className="optionResult">
            <p>{optionOne.text}</p>
            <div>
              <ProgressBar
                now={optionOnePercent}
                label={`${optionOnePercent}%`}
              />
            </div>

            <p>
              {question.optionOne.votes.length} out of {totalVotes} votes
            </p>
            <span>{yourVote === 'optionOne' && <p className="your-vote">Your Vote</p>}</span>
          </div>
          <div className="optionResult">
            <p>{question.optionTwo.text}</p>

            <div>
              <ProgressBar
                now={optionTwoPercent}
                label={`${optionTwoPercent}%`}
              />
            </div>

            <p>
              {question.optionTwo.votes.length} out of {totalVotes} votes
            </p>
            <span>{yourVote === 'optionTwo' && <p className="your-vote">Your Vote</p>}</span>

          </div>
          <Link to="/">
            <button className="qResult-btn">Back</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, signedInUser, questions }) {
  return {
    users,
    signedInUser,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionResults);
