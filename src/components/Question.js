import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
  render() {
    const { question } = this.props;

    return (
      <section>
        <article>
          <img
            src={this.props.users[question.author].avatarURL}
            alt={this.props.author}
            className="avatar"
          />
          <h2 className="author-header">
            <b>{this.props.author} wants to know...</b>
          </h2>
          <h3>...Would you rather...</h3>
          <p>{this.props.question.optionOne.text}</p>

          <p>or...</p>
        </article>
      </section>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];

  return {
    questions,
    question,
    users,
  };
}
export default connect(mapStateToProps)(Question);
