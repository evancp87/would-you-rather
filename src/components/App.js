import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import AddQ from "./AddQ";
import SignIn from "./SignIn";
import Nav from "./Nav";
import Leaderboard from "./Leaderboard";
import ShowQByState from "./ShowQByState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { signedInUser } = this.props;

    return (
      <Router>
        <Fragment>
          <div >
            <LoadingBar />
            {!signedInUser ? (
              <div>
                <Switch>
                  <Route component={SignIn} />
                </Switch>
              </div>
            ) : (
              <div>
                <Nav signedInUser={signedInUser} />
                <Switch className="contain">
                  <Route
                    exact
                    path="/"
                    component={Dashboard}
                    signedInUser={signedInUser}
                  />
                  <Route  path="/questions/incorrect_id" component={NotFound} />
                  <Route path="/questions/:id" component={ShowQByState} />
                  <Route path="/add" component={AddQ} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users, signedInUser }) {
  return {
    loading: users === null,
    users,
    signedInUser,
  };
}
export default connect(mapStateToProps)(App);
