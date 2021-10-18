import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import {withRouter} from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { handleSaveQuestionAnswer } from "../actions/shared";
import PropTypes from 'prop-types'

class AnswerQ extends Component {
  static propTypes = {
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    signedInUser: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleVote: PropTypes.func.isRequired,
  }
  state = {
    option: "",
    answered: false,
  };

  handleChange = (e) => {
    this.setState(() => ({
      option: e.target.id,
      answered: false,
    }));
  };

  handleVote = (e) => {
    e.preventDefault();
    const { dispatch, signedInUser, id, question } = this.props;
    const qid = question.id;

    dispatch(
      handleSaveQuestionAnswer({
        qid: qid,
        answer: this.state.answer,
        signedInUser,
      })
    );

    this.props.history.push(`/question_result/${id}`);
  };

  render() {

const {user} = this.props
     // TODO: add logic to prevent user from voting twice
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
            <form onSubmit={this.handleVote}>
              <input
                id="optionOneText"
                value={this.optionOne.text}
                type="radio"
                name="option"
                onChange={this.handleChange}
              />
              <div>Or</div>
              <input
                id="optionTwoText"
                type="radio"
                value={this.optionTwo.text}
                name="option"
                onChange={this.handleChange}
              />
             
                <Button type="submit">Submit</Button>
           
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

export default withRouter(connect(mapStateToProps)(AnswerQ));
