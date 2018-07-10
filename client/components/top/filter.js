import React from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faFilter, faTimes } from '@fortawesome/fontawesome-free-solid';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

import {
  enableAllSitesTopFilter,
  enableAllGroupsTopFilter,
  toggleGroupTopFilter,
  toggleSiteTopFilter,
  sortByTopFilter,
  sortOrderTopFilter,
  toggleFilterVisibiility,
  toggleDirtyState,
} from '../../store/topFilter';

/**
 * STYLES
 */

const FilterContainer = styled.div`
  font-family: ${props => props.theme.fonts.header};
  margin: 0 0 15px 0;
`;

const StaticBar = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 0.9em;
  background-color: ${props => lighten(0.89, props.theme.colors.quinary)};
  color: ${props => lighten(0.4, props.theme.colors.quinary)};
`;

const ToggleFilterButton = styled.div`
  cursor: pointer;
  padding: 10px;
  color: ${props => darken(0.3, props.theme.colors.secondary)};
  background-color: ${props => lighten(0.2, props.theme.colors.secondary)};
  &:hover {
    background-color: ${props => lighten(0.3, props.theme.colors.secondary)};
  }
  &:active {
    background-color: ${props => lighten(0.4, props.theme.colors.quinary)};
    color: white;
  }
  & svg {
    margin: 0 10px 0 0;
  }
`;

const ClearFilterButton = styled.div`
  cursor: pointer;
  padding: 10px;
  color: ${props => darken(0.3, props.theme.colors.primary)};
  background-color: ${props => lighten(0.2, props.theme.colors.primary)};
  &:hover {
    background-color: ${props => lighten(0.3, props.theme.colors.primary)};
  }
  &:active {
    background-color: ${props => lighten(0.4, props.theme.colors.quinary)};
    color: white;
  }
  & svg {
    margin: 0 10px 0 0;
  }
`;

const StaticBarInfo = styled.div`
  padding: 10px;
  margin: 0 10px 0 0;
`;

const FilterBox = styled.div`
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-start;
  border-right: solid 1px ${props => lighten(0.89, props.theme.colors.quinary)};
  border-left: solid 1px ${props => lighten(0.89, props.theme.colors.quinary)};
  border-bottom: solid 1px ${props => lighten(0.89, props.theme.colors.quinary)};
  padding: 0 0 5px 0;
`;

const FilterGroup = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 0.8em;
  margin: 10px 5px 0 5px;
  padding: 0 10px 0 10px;
  flex-grow: 1;
`;

const GroupName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px 0 0px;
  font-size: 16px;
  color: ${props => lighten(0.42, props.theme.colors.quinary)};
`;

const GroupItem = styled.div`
  letter-spacing: 1px;
  display: block;
  padding: 3px;
  margin: 3px 3px 3px 5px;
`;

const FilterItemToggle = styled.div`
  color: ${props => darken(0.22, props.theme.colors[props.showing ? 'primary' : 'quaternary'])};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FilterIcon = styled.div`
  padding: 0px 5px 0px 0px;
`;

const FilterOption = styled.div`
  padding: 0;
  margin: 0;
`;

const ResetLink = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

/**
 * COMPONENT
 */

class Filter extends React.Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
  }
  /* eslint-enable */

  render() {
    return (
      <FilterContainer>
        <StaticBar>
          <ToggleFilterButton onClick={this.props.toggleFilter}>
            <FontAwesomeIcon icon={faFilter} />{' '}
            {!this.props.topFilter.visibility ? 'Show Filter' : 'Hide Filter'}
          </ToggleFilterButton>
          {this.props.topFilter.dirty && (
            <ClearFilterButton
              onClick={() => {
                this.props.resetEverything();
                this.props.onChangePage();
              }}
            >
              <FontAwesomeIcon icon={faTimes} /> Clear Filter
            </ClearFilterButton>
          )}
          <StaticBarInfo>
            {`${this.props.count} Results `}
            {this.props.numberOfPages > 0 ?
              ` - Page ${this.props.currentPage} of ${this.props.numberOfPages}` : <span> - try <ResetLink onClick={() => {
                this.props.resetEverything();
                this.props.onChangePage();
              }}>clearing the filter</ResetLink></span>}

          </StaticBarInfo>
        </StaticBar>
        {this.props.topFilter.visibility && (
          <FilterBox>
            <FilterGroup>
              <GroupName>Groups</GroupName>
              {this.props.groups.map(group => (
                <GroupItem key={`${group}thsgi`}>
                  <FilterItemToggle
                    onClick={() => {
                      this.props.toggleGroup(group);
                      this.props.onChangePage();
                    }}
                    showing={this.props.topFilter.showingGroups[group]}
                  >
                    <FilterIcon>
                      <FontAwesomeIcon
                        icon={this.props.topFilter.showingGroups[group] ? faCheckCircle : faCircle}
                      />
                    </FilterIcon>
                    <FilterOption>{group}</FilterOption>
                  </FilterItemToggle>
                </GroupItem>
              ))}
            </FilterGroup>
            <FilterGroup>
              <GroupName>Sites</GroupName>
              {this.props.sites.map(site => (
                <GroupItem key={`${site.id}thsi`}>
                  <FilterItemToggle
                    onClick={() => {
                      this.props.toggleSite(site.id);
                      this.props.onChangePage();
                    }}
                    showing={this.props.topFilter.showingSites[site.id]}
                  >
                    <FilterIcon>
                      <FontAwesomeIcon
                        icon={this.props.topFilter.showingSites[site.id] ? faCheckCircle : faCircle}
                      />
                    </FilterIcon>
                    <FilterOption>{site.name}</FilterOption>
                  </FilterItemToggle>
                </GroupItem>
              ))}
            </FilterGroup>
            <FilterGroup>
              <GroupName>Order</GroupName>
              <GroupItem>
                <FilterItemToggle
                  onClick={() => {
                    this.props.toggleSortBy('seed');
                    this.props.onChangePage();
                  }}
                  showing={this.props.topFilter.sortBy === 'seed'}
                >
                  <FilterIcon>
                    <FontAwesomeIcon
                      icon={this.props.topFilter.sortBy === 'seed' ? faCheckCircle : faCircle}
                    />
                  </FilterIcon>
                  <FilterOption>Seed</FilterOption>
                </FilterItemToggle>
              </GroupItem>
              <GroupItem>
                <FilterItemToggle
                  onClick={() => {
                    this.props.toggleSortBy('leech');
                    this.props.onChangePage();
                  }}
                  showing={this.props.topFilter.sortBy === 'leech'}
                >
                  <FilterIcon>
                    <FontAwesomeIcon
                      icon={this.props.topFilter.sortBy === 'leech' ? faCheckCircle : faCircle}
                    />
                  </FilterIcon>
                  <FilterOption>Leech</FilterOption>
                </FilterItemToggle>
              </GroupItem>
            </FilterGroup>
            <FilterGroup>
              <GroupName>Ordered by</GroupName>
              <GroupItem>
                <FilterItemToggle
                  onClick={() => {
                    this.props.toggleSortOrder('top');
                    this.props.onChangePage();
                  }}
                  showing={this.props.topFilter.sortOrder === 'top'}
                >
                  <FilterIcon>
                    <FontAwesomeIcon
                      icon={this.props.topFilter.sortOrder === 'top' ? faCheckCircle : faCircle}
                    />
                  </FilterIcon>
                  <FilterOption>Highest</FilterOption>
                </FilterItemToggle>
              </GroupItem>
              <GroupItem>
                <FilterItemToggle
                  onClick={() => {
                    this.props.toggleSortOrder('bottom');
                    this.props.onChangePage();
                  }}
                  showing={this.props.topFilter.sortOrder === 'bottom'}
                >
                  <FilterIcon>
                    <FontAwesomeIcon
                      icon={this.props.topFilter.sortOrder === 'bottom' ? faCheckCircle : faCircle}
                    />
                  </FilterIcon>
                  <FilterOption>Lowest</FilterOption>
                </FilterItemToggle>
              </GroupItem>
            </FilterGroup>
          </FilterBox>
        )}
      </FilterContainer>
    );
  }
}

const mapState = state => ({
  topFilter: state.topFilter,
  sites: Object.keys(state.topFilter.showingSites).map(siteId => state.sites.items[siteId]),
  groups: Object.keys(state.topFilter.showingGroups),
});

const mapDispatch = dispatch => ({
  toggleSite(siteId) {
    dispatch(toggleDirtyState(true));
    return dispatch(toggleSiteTopFilter(siteId));
  },
  toggleGroup(groupName) {
    dispatch(toggleDirtyState(true));
    return dispatch(toggleGroupTopFilter(groupName));
  },
  toggleSortOrder(sortOrder) {
    dispatch(toggleDirtyState(true));
    return dispatch(sortOrderTopFilter(sortOrder));
  },
  toggleSortBy(sortBy) {
    dispatch(toggleDirtyState(true));
    return dispatch(sortByTopFilter(sortBy));
  },
  resetEverything() {
    dispatch(toggleDirtyState(false));
    dispatch(sortByTopFilter('seed'));
    dispatch(sortOrderTopFilter('top'));
    dispatch(enableAllSitesTopFilter());
    return dispatch(enableAllGroupsTopFilter());
  },
  toggleFilter() {
    return dispatch(toggleFilterVisibiility());
  },
});

export default withTheme(connect(
  mapState,
  mapDispatch,
)(Filter));
