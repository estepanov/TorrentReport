import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Loader from '../components/loader';
import BreakdownListingsInfos from '../components/listing/breadkdownListingsInfos';
import GeneralListingInfo from '../components/listing/generalListingInfo';
import ListingHeader from '../components/listing/listingHeader';
import { fetchListingById } from '../store';

/**
 * COMPONENT
 */

const Listing = (props) => {
  const id = parseInt(props.match.params.id, 10);
  const listing = props.listings.items[id] || props.fetchListing(id);
  const infos = listing ? listing.Infos : false;
  if (!listing || !infos) return <Loader message="random" />;

  const holderObj = {};

  infos.forEach((item) => {
    item.torrentSnapshots.forEach((snap) => {
      const generalDate = moment(new Date(snap.date)).format('MM/DD/YYYY');
      if (holderObj[generalDate]) {
        if (snap.seed > holderObj[generalDate].seed) holderObj[generalDate].seed = snap.seed;
        if (snap.leech > holderObj[generalDate].leech) holderObj[generalDate].leech = snap.leech;
      } else {
        holderObj[generalDate] = {
          date: generalDate,
          seed: snap.seed,
          leech: snap.leech,
        };
      }
    });
  });

  const aggregateSnapshotCount = Object.keys(holderObj).map(key => holderObj[key]);

  return (
    <div>
      <ListingHeader>{listing.name}</ListingHeader>
      <GeneralListingInfo
        listing={listing}
        infos={infos}
        aggregateSnapshotCount={aggregateSnapshotCount}
      />
      <BreakdownListingsInfos infos={infos} aggregateSnapshotCount={aggregateSnapshotCount} />
    </div>
  );
};

const mapState = state => ({
  listings: state.listings,
  infos: state.infos,
});

const mapDispatch = dispatch => ({
  fetchListing: (id) => {
    dispatch(fetchListingById(id));
    return false;
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Listing);
