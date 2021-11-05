import React, { Component } from "react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom"

class QuestionResults extends Component {
  render() {
    const { users, questions, signedInUser, id } = this.props;
    const question = questions[id];
    const optionOne = question.optionOne;
    const optionTwo = question.optionTwo;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOnePercent = (optionOne.votes.length / totalVotes) * 100;
    const optionTwoPercent = (optionTwo.votes.length / totalVotes) * 100;
    // const yourVote = optionOne.votes.includes(signedInUser.name) ? "optionOne" : "optionTwo"
    
  //   if (optionOne.votes.includes(signedInUser.name)) {
  //      "optionOne"
  // } else {
  //    "optionTwo"
  // }



    if (!signedInUser) {
      return <Redirect to="/" />;
    }

    if (id === null || undefined) {
      return <Redirect to="/NotFound" />;
    }

    return (
      <div className="center">
        <div className="qResult-card">
          <h3>
            <b>{users[question.author].name} wants to know...</b>
          </h3>
          <img
            src={users[question.author].avatarURL}
            alt={`Avatar of ${users[question.author].name}`}
            className="avatar-img"
          />
          <p>Results</p>
          <h3>...Would you rather...</h3>
          {/* TODO: finish logic for the signedInUser's vote  */}
          {/* {user.vote === optionOne && <div>Your vote</div>} */}
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
          </div>
          <div className="optionResult">
            <p>{question.optionTwo.text}</p>
            {/* {user.vote === optionTwo && <div>Your vote</div>} */}

            <div>
              <ProgressBar
                now={optionTwoPercent}
                label={`${optionTwoPercent}%`}
              />
            </div>

            <p>
              {question.optionTwo.votes.length} out of {totalVotes} votes
            </p>
          </div>
          <Link to="/">
        <button>Back</button>
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
