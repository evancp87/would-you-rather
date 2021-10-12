import React, { Component } from 'react'

export class Leaderboard extends Component {
    render() {
    const { name, id, avatar, text, author} = this.props;
    const answeredQs =  Object.keys(user[answers]).length
    const questionsCreated = Object.keys(user[questions]).length
    const score = answeredQs + questionsCreated
        return (
            // map over list of users 
            <div>
              
                <div>
                <img src={avatar} alt={`Avatar of ${name}`} className="avatar"/>
        </div>
        <div className="question-info">
          <h2>{author.name} </h2>
          <p>Answered Questions: {answeredQs}</p>
          <p>Created questions: {questionsCreated}</p>
          <span>{score}</span>
                </div>
            </div>
            
        )
    }
}
// TODO: mapstatetoprops and sort users by score, record score
export default Leaderboard
