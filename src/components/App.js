import React, {Component, Fragment } from 'react';
import {connect} from 'react-redux' 
import {handleInitialData} from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Question from './Question'
import AddQ from './AddQ'
import SignIn  from './SignIn'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './NotFound'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {

    return (
      <Router>
        <Fragment>
          <Switch>


      <div className='container'>
        <SignIn/>
        <LoadingBar/>
        <Nav/>
        {this.props.loading === true ? null :
        <div> 
          <Route path='/' exact component={Dashboard}/>
          <Route path='/question/:id'  component={Question}/>
          <Route path='/add'  component={AddQ}/>
          <Route path='/leaderboard'  component={Leaderboard}/>
          <Route component={NotFound}/>
            
          
       
        </div>
        }

      </div>
        </Switch>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps(users, signedInUser) {
  return {
    loading: users === null,
    signedInUser
  }

}
export default connect(mapStateToProps)(App);
