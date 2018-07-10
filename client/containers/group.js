import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { fetchGroups } from '../store';
import PageHeader from '../components/pageHeader';
import Loader from '../components/loader';

const Group = (props) => {
  const id = parseInt(props.match.params.id, 10);
  const group = props.groups.items[id] || props.fetchAllGroups();
  if (!group) return <Loader />;
  return (
    <div>
      <PageHeader>group info</PageHeader>
      <b>
        {group && group.name} (tag: {group && group.tag})
      </b>
      <p>createdAt : {moment(group.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p>updatedAt : {moment(group.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p>url : {group.url}</p>
      <p>
        from site:{group.torrentSite.name}
        <Link to={`/site/${group.torrentSiteId}`}>View Details for {group.torrentSite.short}</Link>
      </p>
    </div>
  );
};

const mapState = state => ({
  groups: state.groups,
  sites: state.sites,
});

const mapDispatch = dispatch => ({
  fetchAllGroups: () => dispatch(fetchGroups()),
});

export default connect(
  mapState,
  mapDispatch,
)(Group);
