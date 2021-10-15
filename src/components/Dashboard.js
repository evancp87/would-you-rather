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

    const {users, questions, signedInUser, optionOne} = this.props;
    // add redirect if user is not logged in
    // if (this.props.signedInUser === null) {

    //   return {
    //     <Redirect to='/signn'>
    //   }
    // }
    const answeredQs = Object.keys(users[signedInUser].answers).map((qid) =>
      questions(qid)
    );
    answeredQs.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    const unansweredQs = Object.keys(users[signedInUser].answers)
      .filter((qid) => !answeredQs(qid))
      .includes(questions);
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
            {unansweredQs.map((id) => (
              <li key={id}>
                <div>
                  <p>{this.props.user.name} wants to know...</p>
                  <Question
                    id={id}
                    userAvatar={this.props.user.AvatarURL}
                    userName={this.props.user.name}
                    userQuestion={this.props.questions[optionOne.text]}
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
                  <p>{this.props.users.name} asks...</p>
                  <Question
                    id={id}
                    userAvatar={this.props.users.AvatarURL}
                    userName={this.props.users.name}
                    userQuestion={this.props.questions[optionOne]}
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

function mapStateToProps({ questions }) {
  return {
    qid: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
