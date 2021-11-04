import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";

class QuestionResults extends Component {
  render() {
    const { optionOne, optionTwo, question, user, signedInUser, id } =
      this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePercent = (optionOneVotes / totalVotes) * 100;
    const optionTwoPercent = (optionTwoVotes / totalVotes) * 100;

    if (!signedInUser) {
      return <Redirect to="/" />;
    }

    if (id === null || undefined) {
      return <Redirect to="/NotFound" />;
    }

    return (
      <div className="center">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>
              <b>{user.name} wants to know...</b>
            </Card.Text>
            <Card.Img
              variant="top"
              src={user.avatarURL}
              alt={`Avatar of ${user.name}`}
              className="avatar"
            />
            <Card.Text>Results</Card.Text>
            <Card.Title>...Would you rather...</Card.Title>
            {user.vote === optionOne && <div>Your vote</div>}
            <Card.Text>{optionOne.text}</Card.Text>
            <div>
              <ProgressBar
                now={optionOnePercent}
                label={`${optionOnePercent}%`}
              />
              ;
            </div>

            <p>
              {optionOneVotes} out of {totalVotes} votes
            </p>

            <Card.Text>{optionTwo.text}</Card.Text>
            {user.vote === optionTwo && <div>Your vote</div>}

            <div>
              <ProgressBar
                now={optionTwoPercent}
                label={`${optionTwoPercent}%`}
              />
              ;
            </div>

            <p>
              {optionTwoVotes} out of {totalVotes} votes
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser, questions }) {
  return {
    users,
    authedUser,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionResults);
