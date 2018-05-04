import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import './style.scss';

import Loader from '../loader';
import {fetchDailyListings} from '../../store';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faSignInAlt} from '@fortawesome/fontawesome-free-solid';

import ListItem from './listItem';
import ListHeaderItem from './listHeaderItem';
import {getListingsByID} from '../store_helper';
import listHeaderItem from './listHeaderItem';

// import searchWithinArray from '../search/searchArray';
import worker from './filterWorker';

class NewListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'seed',
      order: 'top',
      search: '',
      searchResults: [],
      searching: false
    };

    this.workerHolder = undefined
    this.initWorker()
  }
  componentDidMount() {
    if (!_.has(this.props.dailyListings, 'days1')) 
      this.props.load();
    }
  
  shouldComponentUpdate(nextProps) {
    return _.has(nextProps.dailyListings, 'days1');
  }

  toggleOrder = (order) => {
    this.setState({order});
  }

  toggleFilter = (filter) => {
    this.setState({filter});
  }

  searchChange = (event) => {
    this.killWorker();
    const searchInput = event.target.value
    this.setState({search: searchInput});
    if (!searchInput.trim().length) 
      this.setState({searching: false, searchResults: []})
    const arrToUse = this.state.searchResults.length
      ? this.state.searchResults
      : this.props.dailyListings.days1;
    this.sendSearchToWorker(arrToUse, searchInput)
  }

  sendSearchToWorker = (array, target) => {
    this.initWorker();
    this.setState({searching: true})
    this
      .workerHolder
      .postMessage({array, target})
  }

  killWorker = () => {
    this
      .workerHolder
      .terminate();
    this.workerHolder = undefined;
  }
  initWorker = () => {
    this.workerHolder = new Worker(worker)
    this.workerHolder.onmessage = (m) => {
      const {result} = m.data;
      this.setState({searchResults: result, searching: false})
      console.log("msg from worker: ", m.data);
    };
  }

  render() {
    if (!_.has(this.props.dailyListings, 'days1')) {
      return (
        <div id="NL" className="new-listings">
          <Loader message="random"/>
        </div>
      );
    }
    const orderArr = this.state.order === 'top'
      ? ['desc']
      : ['asc'];

    const arrToStartWith = this.state.search && !this.state.searching
      ? this.state.searchResults
      : this.props.dailyListings.days1;
    const finalSize = _.orderBy(arrToStartWith, (obj) => {
      const data = obj
        .Infos
        .reduce((acc, curr) => acc + curr[this.state.filter], 0);
      return data;
    }, orderArr,);

    return (
      <div id="NL" className="new-listings">
        <div className="dl-top">
          <div className="dl-header">TOP NEWLY LISTED TORRENTS</div>
          <div className="dl-detail">{this.state.searching && 'searching'}
            <input
              placeholder="search these listings..."
              id="nl-search"
              name="nl-search"
              onChange={this.searchChange}/>
          </div>
        </div>
        <div className="dl-item-group">
          <ListHeaderItem order={this.state.order} active={this.state.filter}/> {finalSize.map((item, index) => (<ListItem key={item.id} active={this.state.filter} index={index} item={item}/>))}
          {!finalSize.length && 'no results to show'}
        </div>
        <div className="dl-footer">
          <div className="dl-more">thats all folks</div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({dailyListings: state.stats.dailyListings});

const mapDispatch = dispatch => ({
  load() {
    dispatch(fetchDailyListings(1));
  }
});

export default connect(mapState, mapDispatch)(NewListings);
