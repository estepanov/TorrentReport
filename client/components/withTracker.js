import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-54538481-3');

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    // eslint-disable-next-line
    if (PRODUCTION) {
      GoogleAnalytics.set({
        page,
        ...options,
      });
      GoogleAnalytics.pageview(page);
    }
  };

  class HOC extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    shouldComponentUpdate(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
        return true;
      }
      return false;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return HOC;
};

export default withTracker;
