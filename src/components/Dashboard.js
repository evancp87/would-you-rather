import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {Link} from 'react-router-dom'

export class Dashboard extends Component {
  state = {
    answered: false,
  };

  render() {
    const { users, questions, qid, signedInUser, optionOne, user} = this.props;
    // const {showUnansweredQs, showAnsweredQs} = this.state

    const answeredQs = Object.keys(users[signedInUser].answers).map((qid) => questions[qid])
    
    answeredQs.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
 
    const unansweredQs = Object.keys(questions)
      .filter((question) => !answeredQs(question))
      .includes(qid)
      unansweredQs.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
   
    return (
      <Tabs>
        <TabList>
          <Tab>Unanswered Questions</Tab>
          <Tab>Answered Questions</Tab>
        </TabList>

        <TabPanel>
          <ul>
            {unansweredQs.map((qid) => (
              <li key={qid}>
                <div>
                  <p>{user.name} wants to know...</p>
                  <Question
                    id={qid}
                    userAvatar={user.AvatarURL}
                    userName={user.name}
                    questionState="unanswered"
                    userQuestion={questions[optionOne.text]}
                  />
                  <p>or...</p>
                  <Link
                    to={{
                      pathname: "questions/:question_id",
                      state: { answered: false },
                    }}
                  >
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
                  <p>{user.name} asks...</p>
                  <Question
                    id={id}
                    userAvatar={user.AvatarURL}
                    userName={user.name}
                    questionState="answered"
                    userQuestion={questions[optionOne.text]}
                  />
                  <Link
                    to={{
                      pathname: "questions/:question_id",
                      state: { answered: true },
                    }}
                  >
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

function mapStateToProps({ users, signedInUser, questions  }) {
  return {
    users,
    signedInUser,
    qid: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
