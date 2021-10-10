import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import {Link} from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {saveUserQuestion} from '../actions/users'

export class Question extends Component {
    state = {
        answered: false,
    }


    handleVote = (e) => {
      e.preventDefault();
      const {signedInUser} = this.state
      const { dispatch } = this.props;
  
      this.setState(() => ({
        answered: true,
      }));
      dispatch(saveUserQuestion(signedInUser))
    };
  
  render() {

    const { question, user } = this.props;
    const { optionOne, optionTwo } = question;

    const { name, id, avatar, text, author} = this.props;

    // TODO: add redirect/error handling here

    return (
      <Link to={`/question/${id}`}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>
            <b>{user.name} wants to know...</b>
          </Card.Text>
          <Card.Img
            variant="top"
            src={user.avatarURL}
            alt={`Avatar of ${user.name}`}
          className='avatar'
          />
          <Card.Title>...Would you rather...</Card.Title>
          <Card.Text>{optionOne.text}</Card.Text>
          <Card.Text>OR</Card.Text>
          <Card.Text>{optionTwo.text}</Card.Text>
          <Button variant="primary" onClick={this.handleVote}>View Poll</Button>
        </Card.Body>
      </Card>
    </Link>
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
export default connect(mapStateToProps)(Question);
