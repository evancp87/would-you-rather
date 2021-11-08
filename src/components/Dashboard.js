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
    const { answeredArr, unansweredQs } = this.props;

    return (
      // toggable tabs- mapping over list of users by answered or unanswered questions
      <Tabs className="tabs-container">
        <TabList className="tabs">
          <Tab>Unanswered Questions</Tab>
          <Tab>Answered Questions</Tab>
        </TabList>

        <TabPanel className="tabs-body">
          <ul className="card-list">
            {unansweredQs &&
              unansweredQs.map((question) => (
                <li key={question.id} className="card-list">
                  <div className="question-card">
                    {/* <p>{question.author} wants to know...</p> */}
                    <Question
                      id={question.id}
                      author={this.props.avatarDetails[question.author].name}
                      authorPic={
                        this.props.avatarDetails[question.author].avatarURL
                      }
                      answered="false"
                    />

                    <Link
                      to={{
                        pathname: `questions/${question.id}`,
                        state: { answered: false },
                      }}
                    >
                      <button className="dashbrd-btn">Answer Question</button>
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul className="card-list">
            {answeredArr &&
              answeredArr.map((id) => (
                <li key={id} className="card-list">
                  <div className="question-card">
                    <Question
                      id={id}
                      author={
                        this.props.avatarDetails[
                          this.props.questions[id].author
                        ].name
                      }
                      authorPic={
                        this.props.avatarDetails[
                          this.props.questions[id].author
                        ].avatarURL
                      }
                      answered="true"
                    />

                    <Link
                      to={{
                        pathname: `questions/${id}`,
                        state: { answered: true },
                      }}
                    >
                      <button className="dashbrd-btn">Results</button>
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

function mapStateToProps({ users, signedInUser, questions }, { id }) {
  const answeredArr = Object.keys(users[signedInUser].answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const unansweredQs = Object.values(questions)
    .filter((question) => !answeredArr.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const avatarDetails = users;

  return {
    answeredArr,
    unansweredQs,
    signedInUser,
    avatarDetails,
    questions,
    id,
  };
}

export default connect(mapStateToProps)(Dashboard);
