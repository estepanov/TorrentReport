import React, { Component } from 'react';
import axios from 'axios';
import { passwordCheck } from '../utilities/auth';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      data: false,
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    if (token && token.length === 32) {
      axios.post('/auth/access/reset', { token });
    }
  }

  checkPassword() {
    passwordCheck(this.state.password);
  }

  render() {
    const { passsword } = this.state;
    return (
      <div>
        <h1>Reset Password Form</h1>
        <input value={passsword} />
      </div>
    );
  }
}
