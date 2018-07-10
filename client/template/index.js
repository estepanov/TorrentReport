import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CookiesUse from '../components/cookiesUse';
import { getWindowWidth } from '../store';
import Header from './header';
import ContentRender from './content';
import Footer from './footer';

const Main = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  min-height: 100%;
`;

class Template extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // eslint-disable-next-line
    window.addEventListener('resize', this.props.updateWidth);
  }
  componentWillUnmount() {
    // eslint-disable-next-line
    window.removeEventListener('resize', this.props.updateWidth);
  }

  render() {
    const { children, userCount } = this.props;
    return (
      <Main>
        <CookiesUse />
        <Header />
        <ContentRender>{children}</ContentRender>
        <Footer userCount={userCount} />
      </Main>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  userCount: state.stats.userCount,
});

const mapDispatch = dispatch => ({
  updateWidth() {
    dispatch(getWindowWidth());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(
  mapState,
  mapDispatch,
)(Template));
