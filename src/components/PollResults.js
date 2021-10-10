import React, { Component } from 'react'
import {connect} from 'react-redux'

class PollResults extends Component {
    render() {
        return (
            <div>
                <div>
                <img src={avatar} alt={`Avatar of ${name}`} className="avatar"/>
        </div>
        <div className="question-info">
          <h2>{author.name} wants to know...</h2>
          <p>Results</p>
          <h3>...would you rather...</h3>
          <p>{optionOne.text}</p>
          <p>{question.votes}</p>
          <p>{optionTwo.text}</p>
          <p>{question.votes}</p>
          <button>Back</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps (user, answers, votes) {

}

export default connect(mapStateToProps)(PollResults)
