import React, { Component } from "react";
import { connect } from "react-redux";
import { handleNewQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

export class AddQ extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    // submittedQuestion: false,
    toHome: false,
  };

  handleOptionOne = (e) => {
    let optionOne = e.target.value;

    this.setState(() => ({
      optionOne: optionOne,
    }));
  };

  handleOptionTwo = (e) => {
    let optionTwo = e.target.value;

    this.setState(() => ({
      optionTwo: optionTwo,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch, signedInUser } = this.props;

    dispatch(handleNewQuestion(signedInUser, optionOne, optionTwo)).then(() =>
      this.setState(() => ({
        optionOne: "",
        optionTwo: "",
        toHome: true,
      }))
    );
  };
  render() {
    const { optionOne, optionTwo } = this.state;
    if (this.state.toHome === true) return <Redirect to="/" />;

    return (
      <div className="center">
        <div className='addQ'>

        <h2 className="newQ-header">Add a New Question</h2>
        <p>Complete the question</p>
        <h3>Would you rather...</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter option one"
            value={optionOne}
            onChange={this.handleOptionOne}
            />
          <p>Or</p>
          <input
            type="text"
            placeholder="Enter option two"
            value={optionTwo}
            onChange={this.handleOptionTwo}
            />
          <button
          className='add-btn'
            onClick={this.handleSubmit}
            disabled={
              optionOne === "" || optionTwo === "" || optionOne === optionTwo
            }
            >
            Submit
          </button>
        </form>
            </div>
      </div>
    );
  }
}

function mapStateToProps({ signedInUser }) {
  return { signedInUser };
}

export default connect(mapStateToProps)(AddQ);
