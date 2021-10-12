import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import { ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



class QuestionResults extends Component {
    render() {
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes

        

        
        return (
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
             <Card.Text>Results</Card.Text>
            <Card.Title>...Would you rather...</Card.Title>
            {user.vote === optionOne && (<div>Your vote</div>)}
            <Card.Text>{optionOne.text}</Card.Text>
            {user.vote === optionTwo && (<div>Your vote</div>)}
            <span>{optionOneVotes} out of {totalVotes} votes</span>

            <Card.Text>{optionTwo.text}</Card.Text>
            <span>{optionTwoVotes} out of {totalVotes} votes</span>
           
            <Link to='/'>
            <Button variant="primary" onClick={}>Back</Button>
            </Link>
          </Card.Body>
        </Card>
        )
    }
}

function mapStateToProps (user, answers, votes) {

}

export default connect(mapStateToProps)(QuestionResults)
