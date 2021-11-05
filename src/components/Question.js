import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Question extends Component {
  render() {
    const { question } = this.props;

    // const { optionOne, optionTwo } = question;

    if (question === null || undefined) {
      return <p>This question does not exist</p>;
    }

    // TODO: add redirect/error handling here

    return (
      <div className="card-list">
          <div className='question-card'>
            <img
              variant="top"
              src={this.props.users[question.author].avatarURL}
              alt={this.props.author}
              className="avatar"
            />
            <h3>
              <b>{this.props.author} wants to know...</b>
            </h3>
            <h3>...Would you rather...</h3>
            <p>{this.props.question.optionOne.text}</p>

            <p>Or...</p>
            {/* <Card.Text>{this.props.question.optionTwo.text}</Card.Text> */}
            
          </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  // const { optionOne, optionTwo } = question;

  return {
    questions,
    question,
    users,
  };
}
export default connect(mapStateToProps)(Question);
