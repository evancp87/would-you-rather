import React, { Component } from "react";
import AnswerQ from "./AnswerQ";
import QuestionResult from "./QuestionResult";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ShowQByState extends Component {
  render() {
    const { answered, id } = this.props;

    if (!id) {
      return <Redirect to="/NotFound" />;
    }

    return (
      // logic to render either the answer question page or the results of a question based on the state of the question 
      <div>
        {answered === false && <AnswerQ id={id} />}
        {answered === true && <QuestionResult id={id} />}
      </div>
    );
  }
}

function mapStateToProps({ signedInUser, questions, users }, props) {
  const { id } = props.match.params;
  let answered = Object.keys(users[signedInUser].answers).includes(id);
  return {
    id,
    answered,
  };
}

export default connect(mapStateToProps)(ShowQByState);
