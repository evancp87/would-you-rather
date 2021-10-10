import React, { Component } from 'react'

export class Leaderboard extends Component {
    render() {
    const { name, id, avatar, text, author} = this.props;
        
        return (
            // map over list of users 
            <div>
              
                <div>
                <img src={avatar} alt={`Avatar of ${name}`} className="avatar"/>
        </div>
        <div className="question-info">
          <h2>{author.name} </h2>
          <p>Answered Questions</p>
          <p>Created questions</p>
                </div>
            </div>
            
        )
    }
}

export default Leaderboard
