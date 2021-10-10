import React, { Component } from "react";
import { connect } from "react-redux";
import Question from './Question'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export class Dashboard extends Component {
  // state = {
  //   unansweredQuestion
  // }
  render() {
    return (
<Tabs>
    <TabList>
      <Tab>Unanswered Questions</Tab>
      <Tab>Answered Questions</Tab>
    </TabList>

    <TabPanel>
      <ul>
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <Question id={id}/>
            </li>
          ))}
        </ul>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
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
