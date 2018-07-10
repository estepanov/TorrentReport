import React, { Component } from 'react';
import axios from 'axios';

import Loader from '../components/loader';
import PageHeader from '../components/pageHeader';
import Notification from '../components/notification';

class ActivateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
      error: false,
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    if (token && token.length === 32) {
      axios
        .post('/auth/access', { token })
        .then((res) => {
          if (res.data === 'activated') this.setState({ activated: true });
          else this.setState({ error: res.data });
        })
        .catch((err) => {
          console.log('error in confirming account componet', err);
          return this.setState({ error: 'Supplied token rejected' });
        });
    } else {
      this.setState({ error: 'Invalid token supplied' });
    }
  }

  render() {
    return (
      <div>
        <PageHeader>Account Activation</PageHeader>
        <div>
          {!this.state.activated &&
            !this.state.error && (
              <Notification type="info" title="Please Wait While We Activate Your Account">
                <Loader message="We are activating your account..." />
              </Notification>
            )}
          {this.state.activated && (
            <Notification type="success" title="Your Account Has Been Activated">
              Welcome to Torrent Report!
            </Notification>
          )}
          {this.state.error && (
            <Notification type="error" title="We Encountered a Problem...">
              Sorry, we had a problem while trying to activate your account.{' '}
              {`${this.state.error}.`}
            </Notification>
          )}
        </div>
      </div>
    );
  }
}

export default ActivateAccount;
