import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../actions/shared";

class AnswerQ extends Component {
  state = {
    option: "",
    answered: false,
  };

  // handles state of answer question form

  handleChange = (e) => {
    this.setState(() => ({
      option: e.target.value,
    }));
  };

  // handles submission of vote option
  handleVote = (e) => {
    e.preventDefault();
    const { dispatch, signedInUser, id, question } = this.props;
    const qid = question.id;

    dispatch(
      handleSaveQuestionAnswer({
        authedUser: signedInUser,
        qid: qid,
        answer: this.state.option,
      })
    );

    this.props.history.push(`/questions/${id}`);
  };

  render() {
    const { users, id, questions } = this.props;
    // TODO: add logic to prevent user from voting twice - const alreadyAnswered =

    if (!questions[id]) {
      return <Redirect to="/NotFound" />;
    }

    return (
      <section className="center">
        <article className="question-card">
          <img
            src={users[questions[id].author].avatarURL}
            alt={`Avatar of ${users[questions[id].author].name}`}
            className="avatar"
          />
          <h2 className="answerQ-header">
            <b>{users[questions[id].author].name} wants to know...</b>
          </h2>

          <h3>...Would you rather...</h3>
          <form className="answer-form">
            <div>
              <label className="answer-labels">
                {this.props.question.optionOne.text}
                <input
                  id="one"
                  value="optionOne"
                  type="radio"
                  name="option"
                  onChange={this.handleChange}
                  className="radio-btn"
                />
              </label>
            </div>
            <p>or</p>

            <div>
              <label className="answer-labels">
                {this.props.question.optionTwo.text}
                <input
                  id="two"
                  type="radio"
                  value="optionTwo"
                  name="option"
                  onChange={this.handleChange}
                  className="radio-btn"
                />
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="answer-btn"
                onClick={this.handleVote}
                disabled={this.state.option === "" || this.state.option === ""}
              >
                Submit
              </button>
            </div>
          </form>
        </article>
      </section>
    );
  }
}

function mapStateToProps({ signedInUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    signedInUser,
    users,
    questions,
    question,
    id,
  };
}

export default withRouter(connect(mapStateToProps)(AnswerQ));
