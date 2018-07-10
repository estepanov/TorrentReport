import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../../store';
import Loader from '../loader';
import styled from 'styled-components';

import PageHeader from '../pageHeader';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
    };
  }

  componentDidMount() {}

  render() {
    return <PageHeader>Rendered</PageHeader>;
  }
}

export default Test;
