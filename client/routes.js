import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';
import history from './history';
import Template from './template';
import {
  Faq,
  About,
  AccountHome,
  Test,
  NoMatch,
  ScrollToTop,
  Privacy,
  Cookies,
  Terms,
  WithTracker,
} from './components/';

import {
  Login,
  Signup,
  Home,
  Listing,
  TopCurrent,
  Info,
  Site,
  Group,
  ActivateAccount,
  DeleteAccount,
  NewListings,
  ResetPassword,
} from './containers';

import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <ScrollToTop>
          <Template>
            <Switch>
              <Route exact path="/" component={WithTracker(Home)} />
              <Route exact path="/faq" component={WithTracker(Faq)} />
              <Route exact path="/about" component={WithTracker(About)} />
              <Route exact path="/listing/:id" component={WithTracker(Listing)} />
              <Route exact path="/info/:id" component={WithTracker(Info)} />
              <Route exact path="/group/:id" component={WithTracker(Group)} />
              <Route exact path="/site/:id" component={WithTracker(Site)} />
              <Route exact path="/new/listings" component={WithTracker(NewListings)} />
              <Route exact path="/test" component={WithTracker(Test)} />
              <Route exact path="/top" component={WithTracker(TopCurrent)} />
              <Route exact path="/login" component={WithTracker(Login)} />
              <Route exact path="/signup" component={WithTracker(Signup)} />
              <Route exact path="/policy/privacy" component={WithTracker(Privacy)} />
              <Route exact path="/policy/cookies" component={WithTracker(Cookies)} />
              <Route exact path="/policy/terms-of-service" component={WithTracker(Terms)} />
              <Route path="/activate/:token" component={WithTracker(ActivateAccount)} />
              <Route path="/resetpassword/:token" component={WithTracker(ResetPassword)} />
              {isLoggedIn && (
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path="/account" component={WithTracker(AccountHome)} />
                  <Route exact path="/account/delete" component={WithTracker(DeleteAccount)} />
                  <Route path="*" component={WithTracker(NoMatch)} status={404} />
                </Switch>
              )}
              <Route path="*" component={WithTracker(NoMatch)} status={404} />
            </Switch>
          </Template>
        </ScrollToTop>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  /*
   Being 'logged in' for our purposes will be defined has having a state.user
   that has a truthy id. Otherwise, state.user will be an empty object, and
   state.user.id will be falsey.
  */
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Routes);
