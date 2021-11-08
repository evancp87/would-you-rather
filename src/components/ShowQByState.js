import React, { Component } from "react";
import AnswerQ from "./AnswerQ";
import QuestionResult from "./QuestionResult";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ShowQByState extends Component {
  render() {
    const { answered, id, signedInUser } = this.props;

    // if (!signedInUser) {
    //   return <Redirect to="/" />;
    // }

    if (!id) {
      return <Redirect to="/NotFound" />;
    }

    return (
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
