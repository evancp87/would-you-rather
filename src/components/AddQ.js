import React, { Component } from "react";
import { connect } from "react-redux";
import { handleNewQuestion } from "../actions/shared";
import { withRouter } from "react-router-dom";

export class AddQ extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    submittedQuestion: false,
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

    dispatch(handleNewQuestion(optionOne, optionTwo, signedInUser));
    this.props.history.push("/");

    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      submittedQuestion: true,
    }));
  };
  render() {
    const { optionOne, optionTwo } = this.state;

    return (
      <div>
        <h2>Add New Question</h2>
        <p>Complete the question</p>
        <h3>Would you rather...</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter an option"
            value={optionOne}
            onChange={this.handleOptionOne}
          />
          <p>Or</p>
          <input
            type="text"
            placeholder="Enter an option"
            value={optionTwo}
            onChange={this.handleOptionTwo}
          />
          <button
            onSubmit={this.handleSubmit}
            disabled={optionOne === "" && optionTwo === ""}
          ></button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ signedInUser }) {
  return { signedInUser };
}

export default withRouter(connect(mapStateToProps)(AddQ));
