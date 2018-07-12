import React, { Component } from 'react';
import 'babel-polyfill'
import loadScript from 'load-script';

class AuthMiner extends Component {
  constructor(props) {
    super(props)
    const enabled = COINHIVE_ENABLED === 'true';
    this.state = {
      enabled,
      key: COINHIVE_SITE_KEY,
      miner: null,
      loading: false,
      error: false,
      errorMessage: '',
      callBackFunc: props.callBackFunc
    }
  }

  buildMiner = async () => {
    console.log('loading script')
    return await new Promise((resolve, reject) => {
      loadScript('https://authedmine.com/lib/captcha.min.js', () => {
        console.log('loaded script')
        resolve(CoinHive)
        return this.setState({ miner: CoinHive, loading: false });
      })
    })
      .catch(err => {
        if (err === 'close') return '';
        console.log('error building miner', err)
        this.setState({ error: true, errorMessage: err, loading: false })
      })
  };

  componentDidMount() {
    if (this.state.enabled) {
      if (!this.state.miner) this.buildMiner()
      window.addEventListener('message', this.onMessage.bind(this))
    }
  }
  componentWillUnmount() {
    if (this.state.enabled) {
      window.removeEventListener('message', this.onMessage.bind(this))
    }
  }

  onMessage(ev) {
    console.log('message->', ev)
    if (this.state.enabled && ev.data.type === 'coinhive-goal-reached' && ev.data.params) {
      console.log('token', ev.data.params.token)
      this.state.callBackFunc()
    }
  }

  render() {
    const { callBackFunc } = this.state;

    if (!this.state.enabled) { // eslint-disable-line
      return <div />;
    }

    console.log('this.state', this.state)
    return (<div>
      {this.state.error && this.state.errorMessage}
      <div
        className="coinhive-captcha"
        data-hashes="1024"
        data-key={this.state.key}
      >
        <em>Loading Captcha...<br />
          If it does not load, please disable Adblock!</em>
      </div>
    </div>);
  }
};

export default AuthMiner;
