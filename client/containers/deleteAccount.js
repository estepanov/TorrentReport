import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import PageHeader from '../components/pageHeader';
import Notification from '../components/notification';
import Loading from '../components/loader';

const ConfirmDelete = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  color: #68291e;
  background-color: tomato;
  border: solid 1px #a74130;
`;

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      timeToReload: 10000,
      intervalHolder: 0,
      timeUpdateSeconds: 1000,
    };
  }

  startTimer = () => {
    const intervalHolder = setInterval(this.timerUpdater, this.state.timeUpdateSeconds);
    this.setState({ intervalHolder });
  };

  timerUpdater = () => {
    if (this.state.timeToReload <= 0) {
      clearInterval(this.state.intervalHolder);
      window.location.href = '../'; // eslint-disable-line
    }
    const newTime = this.state.timeToReload - this.state.timeUpdateSeconds;
    return this.setState({ timeToReload: newTime });
  };

  confirmedDelete = () => {
    this.setState({ status: 'deleting' });
    axios
      .get('/api/users/deleteMyAccount')
      .then(res => res.data)
      .then((message) => {
        if (message.trim() === 'success') {
          this.startTimer();
          return this.setState({ status: 'deleted' });
        }
        return this.setState({ status: 'error' });
      })
      .catch((err) => {
        console.log('error in confirm delete', err);
        return this.setState({ status: 'error' });
      });
  };

  askToConfirm = () => {
    this.setState({ status: 'confirm' });
  };

  render() {
    if (this.state.status === 'error') {
      return (
        <div>
          <PageHeader>Delete Your Account</PageHeader>
          <Notification title="Your Account Has NOT Been Deleted." type="error">
            Sorry we encountered an error, please try this action again later.
          </Notification>
        </div>
      );
    }
    if (this.state.status === 'deleted') {
      const timeLeft = this.state.timeToReload / this.state.timeUpdateSeconds;
      return (
        <div>
          <PageHeader>Delete Your Account</PageHeader>
          <Notification title="Your Account Has Been Deleted!" type="success">
            {timeLeft >= 2 ? (
              <p>
                This page will roload in <b>{timeLeft}</b> seconds and you are all done!
              </p>
            ) : (
              <p>Good bye my friend...</p>
            )}
          </Notification>
        </div>
      );
    }
    if (this.state.status === 'deleting') {
      return (
        <div>
          <PageHeader>Delete Your Account</PageHeader>
          <Loading message="Awaiting for server to confirm your acount has been deleted." />
        </div>
      );
    }
    if (this.state.status === 'confirm') {
      return (
        <div>
          <PageHeader>Delete Your Account</PageHeader>
          <h1>Almost There. Just Confirm.</h1>
          <p>Just a reminder that you can not undo this.</p>
          <p>It was fun while it lasted mi amigo.</p>
          <p>Thanks for coming! Come back whenever.</p>
          <ConfirmDelete onClick={this.confirmedDelete}>
            I AM SURE. NOW DELETE THE ACCOUNT!
          </ConfirmDelete>
        </div>
      );
    }
    return (
      <div>
        <PageHeader>Delete Your Account</PageHeader>
        <p>
          This will delete all of our info associated with your account. This can not be undone.
        </p>
        <ConfirmDelete onClick={this.askToConfirm}>DELETE MY ACCOUNT</ConfirmDelete>
      </div>
    );
  }
}

export default DeleteAccount;
