import React, { Component } from "react";
import { connect } from "react-redux";
import Question from './Question'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export class Dashboard extends Component {
  state = {
    answered: false,
  }

  render() {


    // add redirect if user is not logged in
    // if (this.props.signedInUser === null) {

    //   return {
    //     <Redirect to='/signn'>
    //   }
    // }
    const answeredQs = Object.keys(users[authedUser].answers).map((qid) => questions(qid))
    answeredQs.sort((a, b) => questions[b].timestamp - questions[a].timestamp
    )

    const unansweredQs = Object.keys(users[authedUser].answers).filter((qid) => !answeredQs(qid)).includes(question)
    answeredQuestions.sort((a, b) => questions[b].timestamp - questions[a].timestamp)




    return (
<Tabs>
    <TabList>
      <Tab>Unanswered Questions</Tab>
      <Tab>Answered Questions</Tab>
    </TabList>

    <TabPanel>
      <ul>
          {unansweredQs.map((id) => (
            <li key={id}>
              <div>
                <p>{user.name} asks...</p>
              <Question id={id}
              userAvatar={this.props.user.AvatarURL}
              userName={this.props.user.name}
              userQuestion={this.props.questions[optionOne]}
              
              />
              <p>or...</p>
              <Link to={{ 
                pathname: 'questions/:question_id',
                state: {answered: false}
              }}>

              <button>Answer Question</button>
              </Link>
              </div>
            </li>
          ))}
        </ul>
    </TabPanel>
    <TabPanel>
    <ul>
          {answeredQs.map((id) => (
            <li key={id}>
              <div>
              <Question id={id}
              
              />
              <Link to={{ 
                pathname:'questions/:question_id',
                state: {answered: true}
              }}>
              <button>Results</button>
              </Link>
              </div>
            </li>
          ))}
        </ul>
    </TabPanel>
  </Tabs>
);
        
    
  }
}

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
