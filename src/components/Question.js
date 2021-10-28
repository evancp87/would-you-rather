import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AnswerQ from "./AnswerQ";
import QuestionResult from "./QuestionResult";

class Question extends Component {
  render() {
    const { question, questionState } = this.props;
    const { optionOne, optionTwo } = question;

    if (question === null || undefined) {
      return <p>This question does not exist</p>;
    }

    if (questionState === "answered") {
      <QuestionResult />;
    } else if (questionState === "unanswered") {
      <AnswerQ />;
    }

    // TODO: add redirect/error handling here

    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>
              <b>{this.props.author} wants to know...</b>
            </Card.Text>
            <Card.Img
              variant="top"
              src={this.props.avatarURL}
              alt={this.props.author}
              className="avatar"
            />
            <Card.Title>...Would you rather...</Card.Title>
            <Card.Text>{optionOne.text}</Card.Text>

            <Card.Text>Or...</Card.Text>
            <Card.Text>{optionTwo.text}</Card.Text>
            <Link to="/">
              <Button type="submit">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];

  return {
    question,
    users
  };
}
export default connect(mapStateToProps)(Question);
