import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

import Loader from '../loader';
import { fetchTopWeekNewSnapshots } from '../../store';

/**
 * STYLES
 */
const TopWeekStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 1em;
  flex-grow: 1;
  background-color: ${props => lighten(0.45, props.theme.colors.tertiary)};
  min-width: 200px;
  min-height: 200px;
`;
const Header = styled.div`
  margin: 10px 0px 0px 15px;
  padding: 0px;
  font-family: ${props => props.theme.fonts.header};
  font-weight: 800;
  font-size: 1.4em;
  word-wrap: break-word;
  color: ${props => darken(0.2, props.theme.colors.tertiary)};
  text-transform: uppercase;
`;
const ColumnHolder = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
const Column = styled.div`
  display: flex;
  flex-basis: 300px;
  flex-grow: 1;
  flex-direction: column;
  background-color: ${props => lighten(0.41, props.theme.colors.tertiary)};
  margin: 5px;
  padding: 10px;
`;
const ColHeader = styled.div`
  font-family: ${props => props.theme.fonts.header};
  font-size: 1.2em;
  word-wrap: break-word;
  color: ${props => lighten(0.15, props.theme.colors.tertiary)};
  text-transform: uppercase;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
`;
const Item = styled(Link)`
  border-bottom: solid 1px ${props => lighten(0.35, props.theme.colors.tertiary)};
  display: flex;
  flex-direction: row;
  min-height: 20px;
  font-family: ${props => props.theme.fonts.header};
  align-items: center;
  margin: 5px 5px 0px 5px;
  padding: 5px 0px 5px 0px;
  text-decoration: none;
  opacity: 0.6;
  color: ${props => darken(0.34, props.theme.colors.tertiary)};
  &:hover {
    opacity: 1;
    color: ${props => darken(0.6, props.theme.colors.tertiary)};
  }
  &:visited {
    color: ${props => darken(0.34, props.theme.colors.tertiary)};
  }
  &:last-child {
    border-bottom: none;
  }
`;
const Number = styled.div`
  opacity: 0.4;
  background-color: ${props => darken(0.3, props.theme.colors.tertiary)};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  flex-basis: 25px;
  font-size: 15px;
  border-radius: 50%;
  margin-right: 10px;
  font-family: monospace;
  flex-shrink: 0;
  flex-grow: 0;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column;
  }
`;

const InfoTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 1;
  flex-grow: 1;
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const DataItem = styled.div`
  width: 60px;
  padding: 5px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
  font-size: 12px;
`;

/**
 * COMPONENT
 */

class topSnapshotWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
    };
  }

  componentDidMount() {
    if (
      this.props.topWeekSnapshots.state !== 'ready' &&
      this.props.topWeekSnapshots.state !== 'loading'
    ) {
      this.props.load();
    }
  }

  render() {
    if (this.props.topWeekSnapshots.state !== 'ready') {
      return (
        <TopWeekStats>
          <Loader />
        </TopWeekStats>
      );
    }
    return (
      <TopWeekStats>
        <Header>this week</Header>
        <ColumnHolder>
          <Column>
            <ColHeader>Most Seeded</ColHeader>
            <List>
              {this.props.topWeekSnapshots.seed.map((item, index) => (
                <Item
                  key={item.id}
                  to={`/listing/${item.torrentInfo.torrentListing.id}`}
                  className="col-container-list-item"
                >
                  <Number>{index + 1}</Number>
                  <InfoContainer>
                    <InfoTitle>{`${item.torrentInfo.torrentListing.name}`}</InfoTitle>
                    <DataRow>
                      <DataItem>
                        <FontAwesomeIcon icon={faCaretUp} />
                        {`${item.seed}`}
                      </DataItem>
                      <DataItem>
                        <FontAwesomeIcon icon={faCaretDown} />
                        {`${item.leech}`}
                      </DataItem>
                    </DataRow>
                  </InfoContainer>
                </Item>
              ))}
            </List>
          </Column>
          <Column>
            <ColHeader>Most Leeched</ColHeader>
            <List>
              {this.props.topWeekSnapshots.leech.map((item, index) => (
                <Item
                  key={item.id}
                  to={`/listing/${item.torrentInfo.torrentListing.id}`}
                  className="col-container-list-item"
                >
                  <Number>{index + 1}</Number>
                  <InfoContainer>
                    <InfoTitle>{`${item.torrentInfo.torrentListing.name}`}</InfoTitle>
                    <DataRow>
                      <DataItem>
                        <FontAwesomeIcon icon={faCaretUp} />
                        {`${item.seed}`}
                      </DataItem>
                      <DataItem>
                        <FontAwesomeIcon icon={faCaretDown} />
                        {`${item.leech}`}
                      </DataItem>
                    </DataRow>
                  </InfoContainer>
                </Item>
              ))}
            </List>
          </Column>
        </ColumnHolder>
      </TopWeekStats>
    );
  }
}

const mapState = state => ({
  topWeekSnapshots: state.stats.topWeekSnapshots,
});

const mapDispatch = dispatch => ({
  load() {
    return dispatch(fetchTopWeekNewSnapshots());
  },
});

export default withTheme(connect(
  mapState,
  mapDispatch,
)(topSnapshotWeek));
