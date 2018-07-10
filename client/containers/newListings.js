import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

import scrollToTopFunc from '../utilities/scrollToTopFunc';
import worker from '../utilities/filterWorker';

import PageHeader from '../components/pageHeader';
import Loader from '../components/loader';
import { fetchDailyListings } from '../store';
import ListItem from '../components/newListings/listItem';
import PageButtonMaker from '../components/pagination/pageButtonMaker';

/**
 * STYLES
 */

const NewListingsContainer = styled.div`
  flex-grow: 1;
  display: inline-flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TitleSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SearchInput = styled.input`
  border-radius: 3px;
  background-color: ${props => lighten(0.8, props.theme.colors.quinary)};
  border: solid 1px ${props => lighten(0.5, props.theme.colors.quinary)};
  color: ${props => lighten(0.4, props.theme.colors.quinary)};
  width: 100%;
  font-size: 16px;
  margin: 5px;
  padding: 10px 20px 10px 20px;
  &:focus {
    border: solid 4px ${props => lighten(0.4, props.theme.colors.quinary)};
    margin: 2px;
    outline-width: 0;
    outline: none;
    background-color: ${props => lighten(0.87, props.theme.colors.quinary)};
  }
`;

const NoResultContainer = styled.div`
  font-size: 18px;
  padding: 2em;
`;

const ItemListContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const NowSearching = styled.div`
  display: inline-flex;
  padding: 10px;
  font-weight: bold;
  font-style: italic;
  font-size: 1.1em;
  justify-content: center;
  align-items: center;
`;

/**
 * COMPONENT
 */

class NewListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'seed',
      order: 'top',
      search: '',
      searchResults: [],
      searching: false,
      itemsPerPage: 15,
      currentPage: 0,
    };

    this.workerHolder = undefined;
    this.initWorker();
  }
  componentDidMount() {
    if (!_.has(this.props.dailyListings, 'days1')) this.props.load();
  }

  // eslint-disable-next-line
  shouldComponentUpdate(nextProps) {
    return _.has(nextProps.dailyListings, 'days1');
  }

  toggleOrder = (order) => {
    this.setState({ order });
  };

  toggleFilter = (filter) => {
    this.setState({ filter });
  };

  getArrayFromPage = (dataArray) => {
    const begin = this.state.currentPage * this.state.itemsPerPage;
    const end = begin + this.state.itemsPerPage;
    return dataArray.slice(begin, end);
  };

  searchChange = (event) => {
    const searchInput = event.target.value;
    if (!searchInput.trim().length) {
      return this.setState({
        search: '',
        searching: false,
        searchResults: [],
        currentPage: 0,
      });
    }
    this.setState({
      search: searchInput,
      searching: true,
      currentPage: 0,
    });
    const isMoreGeneral = searchInput.length < this.state.search;
    const arrToUse =
      this.state.searchResults.length && isMoreGeneral
        ? this.state.searchResults
        : this.props.dailyListings.days1.listings;
    return this.sendSearchToWorker(arrToUse, searchInput);
  };

  sendSearchToWorker = (array, target) => {
    this.initWorker();
    this.workerHolder.postMessage({ array, target });
  };

  killWorker = () => {
    if (this.workerHolder) {
      this.workerHolder.terminate();
      this.workerHolder = undefined;
    }
  };
  initWorker = () => {
    this.killWorker();

    this.workerHolder = new Worker(worker); // eslint-disable-line
    this.workerHolder.onmessage = (m) => {
      const { result } = m.data;
      this.setState({ searchResults: result, searching: false });
    };
  };

  changePage = (pageNumber) => {
    scrollToTopFunc();
    this.setState({ currentPage: pageNumber });
  };

  render() {
    if (
      !_.has(this.props.dailyListings, 'days1') ||
      this.props.dailyListings.days1.status !== 'loaded'
    ) {
      return <Loader message="random" />;
    }
    const orderArr = this.state.order === 'top' ? ['desc'] : ['asc'];
    let arrToStartWith;
    if (this.state.search !== '' && !this.state.searching) {
      arrToStartWith = this.state.searchResults;
    } else {
      arrToStartWith = this.props.dailyListings.days1.listings;
    }

    const finalSize = _.orderBy(
      arrToStartWith,
      (obj) => {
        const data = obj.Infos.reduce((acc, curr) => acc + curr[this.state.filter], 0);
        return data;
      },
      orderArr,
    );

    const numberOfPages = Math.ceil(finalSize.length / this.state.itemsPerPage);
    const currentPageArr = this.getArrayFromPage(finalSize);
    const itemNumberBase = this.state.itemsPerPage * this.state.currentPage;

    return (
      <NewListingsContainer>
        <TopRow>
          <PageHeader>NEWLY LISTED TORRENTS</PageHeader>
          <TitleSide>
            <SearchInput
              placeholder="search these listings..."
              id="nl-search"
              name="nl-search"
              onChange={this.searchChange}
            />
          </TitleSide>
        </TopRow>
        {this.state.searching && (
          <NowSearching>{`currently searching for ${this.state.search}`}</NowSearching>
        )}
        {this.props.dailyListings.days1.status === 'loaded' &&
          currentPageArr.length === 0 && (
            <NoResultContainer>
              {!this.state.search ? (
                <div>No new items</div>
              ) : (
                <div>No search results for: {this.state.search}.</div>
              )}
            </NoResultContainer>
          )}
        {currentPageArr.length > 0 && (
          <ItemListContainer>
            {currentPageArr.map((item, index) => (
              <ListItem
                key={item.id}
                active={this.state.filter}
                index={index + itemNumberBase}
                item={item}
              />
            ))}
          </ItemListContainer>
        )}
        {numberOfPages > 1 && (
          <PageButtonMaker
            numberOfPages={numberOfPages}
            currentPage={this.state.currentPage}
            changePageFunc={this.changePage}
          />
        )}
      </NewListingsContainer>
    );
  }
}

const mapState = state => ({ dailyListings: state.stats.dailyListings });

const mapDispatch = dispatch => ({
  load: () => {
    dispatch(fetchDailyListings(1));
  },
});

export default withTheme(connect(
  mapState,
  mapDispatch,
)(NewListings));
