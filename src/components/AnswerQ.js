import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../actions/shared";

class AnswerQ extends Component {
  state = {
    option: "",
    answered: false,
  };

  handleChange = (e) => {
    this.setState(() => ({
      option: e.target.id,
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
    const { users, signedInUser, id } = this.props;
    const question = this.props.questions[id];

    if (!signedInUser) {
      return <Redirect to="/" />;
    }

    if (id === null || undefined) {
      return <Redirect to="/NotFound" />;
    }

    // TODO: add logic to prevent user from voting twice
    return (
      <div className="center">
        <div className="question-card">
          <h3>
            <b>{users[question.author].name} wants to know...</b>
          </h3>
          <img
            src={this.props.question.author.avatarURL}
            alt={`Avatar of ${this.props.users[id.author].name}`}
            className="avatar"
          />
          <h3 className="answerQ-header">Complete the question:</h3>
          <p>...Would you rather...</p>
          <form onSubmit={this.handleVote}>
            <label>{this.props.question.optionOne.text}
              <input
                id="one"
                value="optionOne"
                type="radio"
                name="option"
                onChange={this.handleChange}
              />
              <div>Or</div>
            </label>

            <label>{this.props.question.optionTwo.text}
              <input
                id="two"
                type="radio"
                value="optionTwo"
                name="option"
                onChange={this.handleChange}
              />
              <Link to="/">
                <button type="submit" className="answer-btn">
                  Submit
                </button>
              </Link>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ signedInUser, users, questions }) {
  // const question = questions[id];

  return {
    signedInUser,
    users,
    questions,
    
    // question: formatQuestion(question, users[this.props.questions.author]),
  };
}

export default connect(mapStateToProps)(AnswerQ);
