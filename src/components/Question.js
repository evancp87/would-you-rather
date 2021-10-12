import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { saveUserQuestion } from "../actions/users";

export class Question extends Component {
  state = {
    option: "",
    answeredQuestion: false,
  };

  handleChange(e) {
    this.setState(() => ({
      option: e.target.id,
    }));
  }

  handleVote = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch, authedUser } = this.props;

    dispatch(handleSaveQuestionAnswer(authedUser));
    this.props.history.push(`/question_result/${id}`);
    this.setState(() => ({
      option: option,
      answered: true,
    }));
  };

  render() {
    const { question, user } = this.props;
    const { optionOne, optionTwo } = question;

    const { name, id, avatar, text, author } = this.props;

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
            <Card.Text>Complete the question:</Card.Text>
            <Card.Title>...Would you rather...</Card.Title>
            <form onSubmit={this.handleSubmit}>
              <input
                id="optionOneText"
                value={this.optionOne.text}
                type="radio"
                name='option'
                onChange={this.handleOptionOne}
              />
              <div>Or</div>
              <input
                id="optionTwoText"
                type="radio"
                value={this.optionTwo.text}
                name='option'
                onChange={this.handleOptionTwo}
              />
              <Link to="/">
                <button type="submit">Back</button>
              </Link>
            </form>
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
