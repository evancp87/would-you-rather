import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { saveUserQuestion } from "../actions/Users";

class QuestionCard extends Component {
  handleVote = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;

    this.setState(() => ({
      answered: true,
    }));
    dispatch(saveUserQuestion(signedInUser))
  };

  render() {
    const { question, user } = this.props;
    const { optionOne, optionTwo } = question;

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

function mapStateToProps({questions, signedInUser, users}, {id}) {
    return {signedInUser,
    questions,
    users,
}}
export default connect(mapStateToProps)(QuestionCard);
