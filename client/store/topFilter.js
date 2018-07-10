/**
 * INITIAL STATE
 */
const initialState = {
  showingSites: {},
  showingGroups: {},
  sortOrder: 'top',
  sortBy: 'seed',
  searchString: '',
  visibility: false,
  dirty: false,
  itemsPerPage: 20, // currently fixed number
  currentPage: 0,
};

/**
 * ACTION TYPES
 */
const ADD_SITES_TO_TOP_FILTER = 'ADD_SITES_TO_TOP_FILTER';
const ADD_GROUPS_TO_TOP_FILTER = 'ADD_GROUPS_TO_TOP_FILTER';
const TOGGLE_SITE_TOP_FILTER = 'TOGGLE_SITE_TOP_FILTER';
const TOGGLE_GROUP_TOP_FILTER = 'TOGGLE_GROUP_TOP_FILTER';
const ENABLE_ALL_SITES_TOP_FILTER = 'ENABLE_ALL_SITES_TOP_FILTER';
const ENABLE_ALL_GROUPS_TOP_FILTER = 'ENABLE_ALL_GROUPS_TOP_FILTER';
const SORT_ORDER_TOP_FILTER = 'SORT_ORDER_TOP_FILTER';
const SORT_BY_TOP_FILTER = 'SORT_BY_TOP_FILTER';
const TOGGLE_FILTER_VISIBILITY = 'TOGGLE_FILTER_VISIBILITY';
const SET_FILTER_VISIBILITY = 'SET_FILTER_VISIBILITY';
const TOGGLE_DIRTY_STATE = 'TOGGLE_DIRTY_STATE';
const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

/**
 * ACTION CREATORS
 */
export const changeCurrentPage = page => ({
  type: CHANGE_CURRENT_PAGE,
  page,
});
export const toggleFilterVisibiility = () => ({ type: TOGGLE_FILTER_VISIBILITY });
export const setFilterVisibiility = visibility => ({ type: SET_FILTER_VISIBILITY, visibility });
export const toggleDirtyState = dirtyState => ({ type: TOGGLE_DIRTY_STATE, dirtyState });
export const addSitesToTopFilter = sitesArr => ({ type: ADD_SITES_TO_TOP_FILTER, sitesArr });
export const addGroupsToTopFilter = groupsArr => ({ type: ADD_GROUPS_TO_TOP_FILTER, groupsArr });
export const toggleSiteTopFilter = siteId => ({
  type: TOGGLE_SITE_TOP_FILTER,
  siteId,
});
export const toggleGroupTopFilter = groupName => ({
  type: TOGGLE_GROUP_TOP_FILTER,
  groupName,
});
export const enableAllSitesTopFilter = () => ({
  type: ENABLE_ALL_SITES_TOP_FILTER,
});
export const enableAllGroupsTopFilter = () => ({
  type: ENABLE_ALL_GROUPS_TOP_FILTER,
});
export const sortOrderTopFilter = sortOrder => ({
  type: SORT_ORDER_TOP_FILTER,
  sortOrder,
});
export const sortByTopFilter = sortBy => ({
  type: SORT_BY_TOP_FILTER,
  sortBy,
});

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SITES_TO_TOP_FILTER: {
      const newShowingSites = { ...state.showingSites };
      action.sitesArr.forEach((site) => {
        newShowingSites[site.id] = true;
      });
      return {
        ...state,
        showingSites: newShowingSites,
      };
    }
    case TOGGLE_SITE_TOP_FILTER: {
      const newShowingSites = { ...state.showingSites };
      const currValue = newShowingSites[action.siteId];
      newShowingSites[action.siteId] = !currValue;
      return {
        ...state,
        showingSites: newShowingSites,
      };
    }
    case ADD_GROUPS_TO_TOP_FILTER: {
      const newShowingGroups = { ...state.showingGroups };
      action.groupsArr.forEach((group) => {
        newShowingGroups[group.name] = true;
      });
      return {
        ...state,
        showingGroups: newShowingGroups,
      };
    }
    case TOGGLE_GROUP_TOP_FILTER: {
      const newShowingGroups = { ...state.showingGroups };
      const currValue = newShowingGroups[action.groupName];
      newShowingGroups[action.groupName] = !currValue;
      return {
        ...state,
        showingGroups: newShowingGroups,
      };
    }
    case ENABLE_ALL_SITES_TOP_FILTER: {
      const newShowingSites = { ...state.showingSites };
      const siteIdsArr = Object.keys(newShowingSites);
      siteIdsArr.forEach((siteId) => {
        newShowingSites[siteId] = true;
      });
      return {
        ...state,
        showingSites: newShowingSites,
      };
    }
    case ENABLE_ALL_GROUPS_TOP_FILTER: {
      const newShowingGroups = { ...state.showingGroups };
      const groupNamesArr = Object.keys(newShowingGroups);
      groupNamesArr.forEach((groupName) => {
        newShowingGroups[groupName] = true;
      });
      return {
        ...state,
        showingGroups: newShowingGroups,
      };
    }
    case SORT_ORDER_TOP_FILTER: {
      return {
        ...state,
        sortOrder: action.sortOrder,
      };
    }
    case SORT_BY_TOP_FILTER: {
      return {
        ...state,
        sortBy: action.sortBy,
      };
    }
    case TOGGLE_FILTER_VISIBILITY: {
      return {
        ...state,
        visibility: !state.visibility,
      };
    }
    case SET_FILTER_VISIBILITY: {
      return {
        ...state,
        visibility: action.visibility,
      };
    }
    case CHANGE_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.page,
      };
    }
    case TOGGLE_DIRTY_STATE: {
      return {
        ...state,
        dirty: action.dirtyState,
      };
    }
    default:
      return state;
  }
};
