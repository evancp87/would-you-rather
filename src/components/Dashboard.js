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
    const { answeredArr, unansweredQs} = this.props;

    return (
      <Tabs className="question-dashboard">
        <TabList>
          <Tab>Unanswered Questions</Tab>
          <Tab>Answered Questions</Tab>
        </TabList>

        <TabPanel>
          <ul>
            {unansweredQs &&
              unansweredQs.map((id) => (
                <li key={id}>
                  <div>
                    <p>{id.author} wants to know...</p>
                    <Question
                      id={id}
                      author={
                       this.props.avatarDetails[id.author].name
                      }
                      authorPic={
                        this.props.avatarDetails[id.author].avatarURL
                      }
                      questionState="unanswered"
                      // answered='false'
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
            {answeredArr.map((id) => (
              <li key={id}>
                <div>
                <p>{id.author} wants to know...</p>
                    <Question
                      id={id}
                      author={
                        this.props.avatarDetails[id.author].name
                       }
                       authorPic={
                         this.props.avatarDetails[id.author].avatarURL
                       }
                    questionState="answered"
                    // answered="true"
                  />
                  <p>or...</p>
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

function mapStateToProps({ users, signedInUser, questions }) {
  const answeredArr = Object.keys(users[signedInUser].answers).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const unansweredQs = Object.values(questions)
    .filter((question) => !answeredArr.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

    const avatarDetails = users
  return {
    answeredArr,
    unansweredQs,
    signedInUser,
    avatarDetails,
  };
}

export default connect(mapStateToProps)(Dashboard);
