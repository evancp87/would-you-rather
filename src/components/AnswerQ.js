import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
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
        answer: this.state.option,
        qid: qid,
        signedInUser: signedInUser,
      })
    );

    this.props.history.push(`/questions/${id}`);
  };

  render() {
    const { users, signedInUser, id , questions, question} = this.props;
    // const question = this.props.questions[id];

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
          <img
            src={users[question.author].avatarURL}
            // alt={`Avatar of ${this.props.users[id].author].name}`}
            className="avatar"
          />
          <h3 className="answerQ-header">
            <b>{users[questions[id].author].name} wants to know...</b>
          </h3>
          <p>...Would you rather...</p>
          <form>
            <label>
              {this.props.question.optionOne.text}
              <input
                id="one"
                value="optionOne"
                type="radio"
                name="option"
                onChange={this.handleChange}
              />
              <div>or</div>
            </label>

            <label>
              {this.props.question.optionTwo.text}
              <input
                id="two"
                type="radio"
                value="optionTwo"
                name="option"
                onChange={this.handleChange}
              />
              
                <button type="submit" className="answer-btn" onClick={this.handleVote} disabled={this.props.question.optionOne.text === "" || this.props.question.optionTwo.text === ""}>
                  Submit
                </button>
             
            </label>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ signedInUser, users, questions}, {id }) {
  const question = questions[id];
 

  return {
    signedInUser,
    users,
    questions,
    question,
    id
    
    // question: formatQuestion(question, users[this.props.questions.author]),
  };
}

export default withRouter(connect(mapStateToProps)(AnswerQ));
