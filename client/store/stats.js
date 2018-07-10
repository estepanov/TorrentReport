import axios from 'axios';
// import history from '../history';
import { spreadListings, spreadGroups } from './index';

/**
 * INITIAL STATE
 */
const defaultData = {
  state: 'init',
  siteStats: {},
  topNewSnapshots: {
    state: 'init',
    items: [],
  },
  topWeekSnapshots: {
    state: 'init',
    seed: [],
    leech: [],
  },
  dailyListings: {},
  userCount: 0,
};

/**
 * ACTION TYPES
 */
const LOADING_TOP_NEW_SNAPSHOTS = 'LOADING_TOP_NEW_SNAPSHOTS';
const RECEIVE_TOP_NEW_SNAPSHOTS = 'RECEIVE_TOP_NEW_SNAPSHOTS';
const LOADING_TOP_WEEK_NEW_SNAPSHOTS = 'LOADING_TOP_WEEK_NEW_SNAPSHOTS';
const RECEIVE_TOP_WEEK_NEW_SNAPSHOTS = 'RECEIVE_TOP_WEEK_NEW_SNAPSHOTS';
const SET_ONLINE_USERS = 'SET_ONLINE_USERS';
const REQUEST_STATS = 'REQUEST_STATS';
const RECEIVE_STATS = 'RECEIVE_STATS';
const RECEIVE_DAILY_LISTINGS = 'RECEIVE_DAILY_LISTINGS';
const SET_DAILY_LISTINGS = 'SET_DAILY_LISTINGS';

/**
 * ACTION CREATORS
 */
export const loadingTopNewSnapshots = () => ({ type: LOADING_TOP_NEW_SNAPSHOTS });
export const receiveTopNewSnapshots = snapshotsArr => ({
  type: RECEIVE_TOP_NEW_SNAPSHOTS,
  snapshotsArr,
});
export const loadingTopWeekNewSnapshots = () => ({ type: LOADING_TOP_WEEK_NEW_SNAPSHOTS });
export const receiveTopWeekNewSnapshots = seedLeechObj => ({
  type: RECEIVE_TOP_WEEK_NEW_SNAPSHOTS,
  seedLeechObj,
});
export const setOnlineUsers = userCount => ({ type: SET_ONLINE_USERS, userCount });
export const requestStats = () => ({ type: REQUEST_STATS });
export const receiveStats = siteStats => ({ type: RECEIVE_STATS, siteStats });
export const recieveDailyListings = (dailyListings, days) => ({
  type: RECEIVE_DAILY_LISTINGS,
  dailyListings,
  days,
});
export const setDailyListings = (dailyListings, days) => ({
  type: SET_DAILY_LISTINGS,
  dailyListings,
  days,
});

const spreadSnapshots = snapshotStats => (dispatch) => {
  const groups = [];
  const groupsSeen = new Set();
  snapshotStats.forEach((snap) => {
    snap.torrentInfo.Group.forEach((g) => {
      if (!groupsSeen.has(g.id)) {
        groups.push(g);
        groupsSeen.add(g.id);
      }
    });
  });
  dispatch(spreadGroups(groups));
};

/**
 * THUNK CREATORS
 */
export const fetchTopNewSnapshots = (days = 1) => (dispatch) => {
  dispatch(loadingTopNewSnapshots());
  return axios
    .get(`/api/torrents/snapshots/new/${days}`)
    .then((res) => {
      // const listingsArr =
      // console.log('res.data', res.data);
      dispatch(spreadSnapshots(res.data));
      dispatch(receiveTopNewSnapshots(res.data));
    })
    .catch(err => console.log(err));
};

export const fetchTopWeekNewSnapshots = () => (dispatch) => {
  dispatch(loadingTopWeekNewSnapshots());
  return axios
    .get('/api/torrents/snapshots/top/week/both/10')
    .then((res) => {
      dispatch(spreadSnapshots(res.data.seed));
      dispatch(spreadSnapshots(res.data.leech));
      dispatch(receiveTopWeekNewSnapshots(res.data));
    })
    .catch(err => console.log(err));
};

export const fetchStats = () => (dispatch) => {
  dispatch(requestStats());
  return axios
    .get('/api/torrents/stats/')
    .then(res => dispatch(receiveStats(res.data)))
    .catch(err => console.log(err));
};

// gets daily listinsg
export const fetchDailyListings = days => dispatch =>
  axios
    .get(`/api/torrents/listings/new/${days}`)
    .then((res) => {
      const { data } = res;
      dispatch(spreadListings(data));
      dispatch(recieveDailyListings(data, days));
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default (state = defaultData, action) => {
  switch (action.type) {
    case SET_ONLINE_USERS: {
      const { userCount } = action;
      return { ...state, userCount };
    }
    case LOADING_TOP_NEW_SNAPSHOTS:
      return { ...state, topNewSnapshots: { state: 'loading' } };
    case RECEIVE_TOP_NEW_SNAPSHOTS:
      return { ...state, topNewSnapshots: { state: 'ready', items: action.snapshotsArr } };
    case LOADING_TOP_WEEK_NEW_SNAPSHOTS:
      return { ...state, topWeekSnapshots: { state: 'loading' } };
    case RECEIVE_TOP_WEEK_NEW_SNAPSHOTS:
      return {
        ...state,
        topWeekSnapshots: {
          state: 'ready',
          seed: action.seedLeechObj.seed,
          leech: action.seedLeechObj.leech,
        },
      };
    case REQUEST_STATS:
      return { ...state, state: 'loading' };
    case RECEIVE_STATS:
      return { ...state, state: 'loaded', siteStats: action.siteStats };
    case RECEIVE_DAILY_LISTINGS: {
      const newDailyListings = { ...state.dailyListings };
      newDailyListings[`days${action.days}`] = {
        status: 'loaded',
        listings: action.dailyListings.map(listing => listing),
      };
      return { ...state, dailyListings: newDailyListings };
    }
    default:
      return state;
  }
};
