import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PageHeader from '../components/pageHeader';
import Filter from '../components/top/filter';
import { fetchTopNewSnapshots, setFilterVisibiility, changeCurrentPage } from '../store';
import Loader from '../components/loader';
import scrollToTopFunc from '../utilities/scrollToTopFunc';
import InfoListItem from '../components/top/infoListItem';
import PageButtonMaker from '../components/pagination/pageButtonMaker';

/**
 * STYLES
 */
const PaginationContainer = styled.div`
  margin: 10px 0 10px 0;
`;

/**
 *  COMPONENT
 */
const filterSortSnapshots = (arraySnapshots, topFilter) =>
  arraySnapshots
    .filter((snapshot) => {
      for (let x = 0; x < snapshot.torrentInfo.Group.length; x += 1) {
        const currentGroup = snapshot.torrentInfo.Group[x].name;
        const currentGroupSiteId = snapshot.torrentInfo.Group[x].torrentSite.id;
        if (topFilter.showingGroups[currentGroup] && topFilter.showingSites[currentGroupSiteId]) {
          return true;
        }
        return false;
      }
      return false;
    })
    .sort((a, b) => {
      const currentSortBy = topFilter.sortBy; // seed or leech
      const currentOrder = topFilter.sortOrder; // top or bottom
      if (currentOrder === 'top') {
        return b[currentSortBy] - a[currentSortBy];
      }
      return a[currentSortBy] - b[currentSortBy];
    });

const getArrayFromPage = (dataArray, topFilter) => {
  const begin = topFilter.currentPage * topFilter.itemsPerPage;
  const end = begin + topFilter.itemsPerPage;
  return dataArray.slice(begin, end);
};

const TopNewSnapshots = (props) => {
  if (props.topNewSnapshots.state !== 'ready') {
    if (props.topNewSnapshots.state !== 'loading') {
      props.load();
    }
    return <Loader message="random" />;
  }
  const filteredSnapshots = filterSortSnapshots(props.topNewSnapshots.items, props.topFilter);
  const numberOfPages = Math.ceil(filteredSnapshots.length / props.topFilter.itemsPerPage);
  const currentItems = getArrayFromPage(filteredSnapshots, props.topFilter);
  const pageButtons = [];
  for (let x = 0; x < numberOfPages; x += 1) {
    pageButtons.push(<div
      className={
        x === props.topFilter.currentPage
          ? 'top-filter-pagination-link-active'
          : 'top-filter-pagination-link'
      }
      key={`pagination${x}`}
      onClick={() => props.changePage(x)}
    >
      {x + 1}
    </div>);
  }

  return (
    <div>
      <PageHeader>CURRENT TORRENTS</PageHeader>
      <Filter
        count={filteredSnapshots.length}
        currentPage={props.topFilter.currentPage + 1}
        numberOfPages={numberOfPages}
        onChangePage={() => props.changePage(0)}
      />
      {currentItems.map(snapshot => (
        <InfoListItem
          listingId={snapshot.torrentInfo.torrentListing.id}
          listingName={snapshot.torrentInfo.torrentListing.name}
          seed={snapshot.seed}
          leech={snapshot.leech}
          uploadDate={snapshot.torrentInfo.uploadDate}
          uploader={snapshot.torrentInfo.uploadUser}
          groupsArr={snapshot.torrentInfo.Group}
          key={snapshot.id}
        />
      ))}
      <PaginationContainer>
        {numberOfPages > 1 && (
          <PageButtonMaker
            numberOfPages={numberOfPages}
            currentPage={props.topFilter.currentPage}
            changePageFunc={props.changePage}
            funcToCall={() => props.changeFilterVisibility(false)}
          />
        )}
      </PaginationContainer>
    </div>
  );
};

const mapState = state => ({
  topNewSnapshots: state.stats.topNewSnapshots,
  topFilter: state.topFilter,
});

const mapDispatch = dispatch => ({
  changePage(pageNumber) {
    scrollToTopFunc();
    return dispatch(changeCurrentPage(pageNumber));
  },
  changeFilterVisibility(visibility) {
    return dispatch(setFilterVisibiility(visibility));
  },
  load() {
    return dispatch(fetchTopNewSnapshots(1));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(TopNewSnapshots);
