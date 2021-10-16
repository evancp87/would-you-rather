import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
// import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import AnswerQ from "./AnswerQ";
import QuestionResult from "./QuestionResult";
import {withRouter} from 'react-router-dom'
import NotFound from "./NotFound";
// import PropTypes from 'prop-types'

class Question extends Component {
  // static propTypes = {
  //   }


  
  // handleClick = (e) => {
  //   e.preventDefault();

   
  //   this.props.history.push("/");

  //   this.setState(() => ({
  //     optionOne: "",
  //     optionTwo: "",
  //     submittedQuestion: true,
  //   }))
  // }
  render() {
    const { question, questionState, user } = this.props;

    if (question === null || undefined) {
      return <NotFound/>
    } else if (questionState === "unanswered") {
      return <AnswerQ 
      avatar={this.props.avatarURL}
      userName={this.props.user.name}
      onSubmit={this.handleVote}
      onChange={this.handleChange}
      
      />;
    }
     else if (questionState === "answered") {
      return <QuestionResult  />;

     }
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>
              <b>{user.name} wants to know...</b>
            </Card.Text>
            <Card.Img
              variant="top"
              src={user.avatarURL}
              alt={`Avatar of ${user.name}`}
              className="avatar"
            />
            <Card.Title>...Would you rather...</Card.Title>
            <Card.Text>{this.optionOne.text}</Card.Text>

            <Card.Text>Or...</Card.Text>

            {/* <Link to="/question/:question_id/">
              <Button type="submit">{this.state.questionState}</Button>
            </Link> */}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ signedInUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    signedInUser,
    users,
    question: formatQuestion(question, users[question.author]),
  };
}
export default withRouter(connect(mapStateToProps)(Question));
