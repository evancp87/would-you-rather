import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";

export class Dashboard extends Component {
  state = {
    answered: false,
  };

  render() {
    const { answeredQs, unansweredQs, user, id } = this.props;
    //     const { users, questions, qid, signedInUser, id, optionOne, user} = this.props;
    //     // const {showUnansweredQs, showAnsweredQs} = this.state
    // console.log(users)
    //     const answeredQs = users[signedInUser] && Object.keys(users[signedInUser].answers).map((qid) => questions[qid])

    //     answeredQs && answeredQs.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    //     const unansweredQs = questions && Object.keys(questions)
    //       .filter((question) => !answeredQs(question))
    //       .includes(qid)
    //       unansweredQs && unansweredQs.sort(
    //       (a, b) => questions[b].timestamp - questions[a].timestamp
    //     )
    return (
      <Tabs className="question-dashboard">
        <TabList>
          <Tab>Unanswered Questions</Tab>
          <Tab>Answered Questions</Tab>
        </TabList>

        <TabPanel>
          <ul>
            {unansweredQs &&
              unansweredQs.map((question) => (
                <li key={question.id}>
                  <div>
                    <p>{user.name} wants to know...</p>
                    <Question
                      qid={id}
                      userAvatar={user.AvatarURL}
                      userName={user.name}
                      question={question}
                      questionState="unanswered"
                      // userQuestion={questions[optionOne.text]}
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
            {answeredQs &&
              answeredQs.map((question) => (
                <li key={question.id}>
                  <div>
                    <p>{user.name} asks...</p>
                    <Question
                      qid={id}
                      userAvatar={user.AvatarURL}
                      userName={user.name}
                      question={question}
                      questionState="answered"
                      // userQuestion={questions[optionOne.text]}
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

// function mapStateToProps(state) {
//   console.log(state)
//   return {
//     users: state.users,
//     signedInUser: state.signedInUser,
//     questions: state.questions,
//   };
// }

function mapStateToProps({ users, signedInUser, questions }, { qid }) {
  // const { users, questions, qid, signedInUser, id, optionOne, user} = this.props;
  // const {showUnansweredQs, showAnsweredQs} = this.state

  const answeredQs =
    users[signedInUser] &&
    Object.keys(users[signedInUser].answers).map((qid) => questions[qid]);

  answeredQs &&
    answeredQs.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const unansweredQs =
    questions &&
    Object.keys(questions)
      .filter((question) => !answeredQs(question))
      .includes(qid);
  unansweredQs &&
    unansweredQs.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
  const question = questions[qid];
  const user = users[questions.author];
  return {
    users,
    user,
    signedInUser,
    questions,
    question,
    qid,
  };
}

export default connect(mapStateToProps)(Dashboard);
