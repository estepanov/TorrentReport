import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SiteStats from './siteStats';
import DailyListing from './dailyListing';
import TopSnapshotWeek from './topSnapshotWeek';

import Notification from '../components/notification';

const FlexLine = styled.div`
  display: inline-flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

/**
 * COMPONENT
 */
const Home = (props) => {
  const { isLoggedIn } = props;

  return (
    <div>
      {!isLoggedIn && (
        <Notification
          title="What is Torrent Report?"
          links={[{ to: '/about', text: 'Learn More' }]}
          type="info"
        >
          This is a torrent information platform and aggregator. This site does not create, host, or
          distribute any torrents or their files. Instead this site crawls and scrapes top torrent
          sites to get their top torrents.
        </Notification>
      )}
      <FlexLine>
        <SiteStats />
        <DailyListing />
      </FlexLine>
      <FlexLine>
        <TopSnapshotWeek />
      </FlexLine>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email,
  isLoggedIn: !!state.user.id,
});

export default connect(mapState)(Home);
