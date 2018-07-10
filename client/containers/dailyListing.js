import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

import Loader from '../components/loader';
import { fetchDailyListings } from '../store';
import MiniListItem from '../components/dailyListing/miniListItem';

/**
 * STYLEs
 */
const DailyListingComponent = styled.div`
  background-color: ${props => lighten(0.35, props.theme.colors.primary)};
  min-width: 200px;
  min-height: 450px;
  margin: 1em;
  flex-grow: 1;
  display: inline-flex;
  flex-direction: column;
  padding: 10px;
`;
const TopBar = styled.div`
  display: inline-flex;
  flex-direction: row;
  padding: 0 0 10px 0;
`;
const Header = styled(Link)`
  display: inline-flex;
  flex-wrap: wrap;
  font-weight: 800;
  font-family: ${props => props.theme.fonts.header};
  font-size: 1.4em;
  color: ${props => darken(0.3, props.theme.colors.primary)};
  text-decoration: none;
  &:visited {
    color: ${props => darken(0.3, props.theme.colors.primary)};
  }
`;
const ItemsContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: column;
  flex-grow: 1;
`;
const Footer = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts.header};
  font-size: 0.7em;
  padding: 1px 0 0 0;
  color: ${props => darken(0.2, props.theme.colors.primary)};
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;
const MoreLink = styled(Link)`
  display: flex;
  align-self: center;
  justify-content: center;
  color: ${props => darken(0.15, props.theme.colors.primary)};
  font-weight: lighter;
  font-size: 1.5em;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
    color: ${props => darken(0.25, props.theme.colors.primary)};
  }
  @media (max-width: ${props => props.theme.mobile.width}) {
    margin: 20px 0 0 0;
  }
`;
const Options = styled.div`
  font-weight: normal;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 210px;
  @media (max-width: ${props => props.theme.mobile.width}) {
    justify-content: center;
  }
`;
const Current = styled.div`
  display: block;
  font-style: italic;
  color: ${props => darken(0.12, props.theme.colors.primary)};
  @media (max-width: ${props => props.theme.mobile.width}) {
    text-align: center;
  }
`;
const Try = styled.div`
  display: block;
  @media (max-width: ${props => props.theme.mobile.width}) {
    text-align: center;
  }
`;
const TryLink = styled.div`
  cursor: pointer;
  display: inline;
  color: ${props => darken(0.3, props.theme.colors.primary)};
  text-decoration: underline;
  &:hover {
    color: ${props => darken(0.1, props.theme.colors.primary)};
    text-decoration: none;
  }
`;

/**
 * COMPONENT
 */
class DailyListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'seed',
      order: 'top',
      max: 10,
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
  }

  componentDidMount() {
    if (!_.has(this.props.dailyListings, 'days1')) this.props.load();
  }

  oppositeOrder(order = this.state.order) {
    return order === 'top' ? 'bottom' : 'top';
  }

  toggleOrder() {
    this.setState({ order: this.oppositeOrder(this.state.order) });
  }
  oppositeFilter(filter = this.state.filter) {
    return filter === 'seed' ? 'leech' : 'seed';
  }

  toggleFilter() {
    this.setState({ filter: this.oppositeFilter(this.state.filter) });
  }

  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate(nextProps) {
    return _.has(nextProps.dailyListings, 'days1');
  }

  render() {
    if (
      !_.has(this.props.dailyListings, 'days1') ||
      this.props.dailyListings.days1.status !== 'loaded'
    ) {
      return (
        <DailyListingComponent>
          <Loader message="downloading data" />
        </DailyListingComponent>
      );
    }
    const orderArr = this.state.order === 'top' ? ['desc'] : ['asc'];
    const { listings } = this.props.dailyListings.days1;
    const orderedFiltered = _.orderBy(
      listings,
      (obj) => {
        const data = obj.Infos.reduce((acc, curr) => acc + curr[this.state.filter], 0);
        return data;
      },
      orderArr,
    );
    const finalSize = orderedFiltered.slice(0, this.state.max);
    const hiddenResults = orderedFiltered.length - this.state.max;
    return (
      <DailyListingComponent>
        <TopBar>
          <Header to="/new/listings">TODAYS NEWLY DISCOVERED TORRENTS</Header>
        </TopBar>
        {this.props.dailyListings.days1.status === 'loaded' &&
          !listings.length && (
            <div>
              <i>no new items</i>
            </div>
          )}
        {this.props.dailyListings.days1.status === 'loaded' &&
          listings.length && (
            <ItemsContainer>
              {finalSize.map((item, index) => (
                <MiniListItem key={item.id} active={this.state.filter} index={index} item={item} />
              ))}
            </ItemsContainer>
          )}
        {this.props.dailyListings.days1.status === 'loaded' &&
          listings.length && (
            <Footer>
              <MoreLink to="/new/listings">View {hiddenResults} more results</MoreLink>
              <Options>
                <Current>
                  sorted by {this.state.order} {this.state.filter}ers
                </Current>
                <Try>
                  switch to{' '}
                  <TryLink onClick={this.toggleFilter}>{this.oppositeFilter()}ers</TryLink> or{' '}
                  <TryLink onClick={this.toggleOrder}>{this.oppositeOrder()}</TryLink>
                </Try>
              </Options>
            </Footer>
          )}
      </DailyListingComponent>
    );
  }
}

const mapState = state => ({
  dailyListings: state.stats.dailyListings,
});

const mapDispatch = dispatch => ({
  load() {
    dispatch(fetchDailyListings(1));
  },
});

export default withTheme(connect(
  mapState,
  mapDispatch,
)(DailyListing));
