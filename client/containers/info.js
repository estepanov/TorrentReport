import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchInfoById } from '../store';

import Loader from '../components/loader';
import InfoHeader from '../components/info/header';
import Stats from '../components/info/stats';
import SectionHeader from '../components/sectionHeader';
import SnapshotsGraph from '../components/info/snapshotsGraph';
import SnapshotsList from '../components/info/snapshotsList';
import Groups from '../components/info/groups';

/**
 * STYLES
 */

const SnapshotsContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

/**
 * COMPONENT
 */

const Info = (props) => {
  const id = parseInt(props.match.params.id, 10);
  const info = props.infos.items[id] || props.fetchInfo(id);
  const listing = props.listings.items[info.torrentListingId] || info.torrentListing;
  if (!info || !listing) return <Loader message="random" />;

  const sortedSnapshots = info.torrentSnapshots.slice().sort((lhs, rhs) => {
    const leftDate = new Date(lhs.date);
    const rightDate = new Date(rhs.date);
    if (leftDate > rightDate) {
      return 1;
    } else if (leftDate < rightDate) {
      return -1;
    }
    return 0;
  });

  return (
    <div>
      <InfoHeader listing={listing} uploadUser={info.uploadUser} />
      <Stats info={info} />
      <SectionHeader>Snapshots</SectionHeader>
      <SnapshotsContainer>
        <SnapshotsGraph sortedSnapshots={sortedSnapshots} />
        <SnapshotsList sortedSnapshots={sortedSnapshots} />
      </SnapshotsContainer>
      <Groups groups={info.Group} />
    </div>
  );
};

const mapState = state => ({
  infos: state.infos,
  listings: state.listings,
});

const mapDispatch = dispatch => ({
  fetchInfo: (id) => {
    dispatch(fetchInfoById(id));
    return false;
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Info);
