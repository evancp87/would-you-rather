import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AnswerQ from "./AnswerQ";
import QuestionResult from "./QuestionResult";

class Question extends Component {
  render() {
    const { question, user } = this.props;
    const { optionOne, optionTwo } = question;

    const { name, id, avatar, text, author } = this.props;

    if (question === null || undefined) {
      return <p>This question does not exist</p>;
    }

    if (question === "answered") {
      <QuestionResult />;
    } else if (question === "unanswered") {
      <AnswerQ />;
    }

    // TODO: add redirect/error handling here

    return (
      <div>
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
            <Card.Title>...Would you rather...</Card.Title>
            <Card.Text>{this.optionOne.text}</Card.Text>

            <Card.Text>Or...</Card.Text>

            <Link to="/">
              <Button type="submit">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ signedInUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    signedInUser,
    users,
    question: formatQuestion(question, users[question.author]),
  };
}
export default connect(mapStateToProps)(Question);
