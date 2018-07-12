import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize(GOOGLE_ANALYTICS_ID);

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    // eslint-disable-next-line
    if (PRODUCTION && GOOGLE_ANALYTICS_ID) {
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
