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
    const { answeredArr, unansweredQs, id, question } = this.props;

    return (
      <Tabs className="center">
        <TabList className="tabs">
          <Tab>Unanswered Questions</Tab>
          <Tab>Answered Questions</Tab>
        </TabList>

        <TabPanel>
          <ul className="card-list">
            {unansweredQs &&
              unansweredQs.map((question) => (
                <li key={question.id}>
                  <div>
                    {/* <p>{question.author} wants to know...</p> */}
                    <Question
                      id={question.id}
                      author={this.props.avatarDetails[question.author].name}
                      authorPic={
                        this.props.avatarDetails[question.author].avatarURL
                      }
                      answered="false"
                      // answered='false'
                    />

                  
                    <Link
                      to={{
                        pathname: `questions/${id}`,

                        // pathname: `questions/:question_id`,
                        state: { answered: false },
                      }}
                    >
                      <button className='dashbrd-btn'>Answer Question</button>
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
                <li key={id}>
                  <div>
                    {/* <p>{id.author} wants to know...</p> */}
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
                        
                      } // qText={this.props.avatarDetails}
                      answered="true"
                      // answered="true"
                    />
                  
                    <Link
                      to={{
                        pathname: `questions/${id}`,
                        // pathname: "questions/:question_id",
                        state: { answered: true },
                      }}
                    >
                      <button className='dashbrd-btn'>Results</button>
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
    .filter((question) => !answeredArr.includes(question))
    .sort((a, b) => b.timestamp - a.timestamp);

  const avatarDetails = users;

  return {
    answeredArr,
    unansweredQs,
    signedInUser,
    avatarDetails,
    questions,
  };
}

export default connect(mapStateToProps)(Dashboard);
