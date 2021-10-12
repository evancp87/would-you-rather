import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";

class AnswerQ extends Component {
  state = {
    optionOne: {
      checked: false,
    },
    optionTwo: {
      checked: false,
    },
    answeredQuestion: false,
  };

  handleOptionOne() {
    let optionOne = e.target.value;

    this.setState(() => ({
      optionOne: {
        checked: true,
      },
    }));
  }

  handleOptionTwo = () => {
    let optionTwo = e.target.value;
    this.setState(() => ({
      optionTwo: {
        checked: true,
      },
    }));
  };

  handleSubmit = () => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch, authedUser } = this.props;

    dispatch(saveQuestionAnswer(optionOne, optionTwo, authedUser));
    this.props.history.push("/questionresult");

    this.setState(() => ({
      optionOne: {
        checked: true,
      },
      optionTwo: {
        checked: true,
      },
      answeredQuestion: true,
    }));
  };
  render() {
    // const {optionOne, optionTwo} = this.state
    // const {addQuestion} = this.props

    // TODO: redirect to home view if submitted
    return (
      <div>
        <h2>{user.name} wants to know...</h2>
        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.name}`}
          className="avatar"
        />
        <p>Complete the question:</p>
        <p>...Would you rather...</p>

        <form onSubmit={this.handleSubmit}>
          <input
            id="optionOneText"
            value={this.optionOne.text}
            type="radio"
            name='option'
            placeholder="Enter option one..."
            onChange={this.handleOptionOne}
          />
<div>Or</div>
          <input
            id="optionTwoText"
            type="radio"
            value={this.optionTwo.text}
            name='option'
            placeholder='Enter option two'
            onChange={this.handleOptionTwo}
          />

          <button type="submit">Back</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps() {}
export default connect(mapStateToProps)(AnswerQ);
