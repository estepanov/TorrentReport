import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

import { fetchStats } from '../store';
import StatSquare from '../components/siteStats/statSquare';

const StatsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
  height: 100%;
  margin: 1em;
  background-color: ${props => lighten(0.96, props.theme.colors.quinary)};
`;

const ColumnGrow = styled.div`
  flex-grow: 1;
`;

const StatTitleBlock = styled.div`
  flex-grow: 1;
  margin: 5px;
  padding-left: 8px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.div`
  font-family: ${props => props.theme.fonts.logo};
  font-weight: 700;
  font-size: 1.3em;
  color: ${props => lighten(0.3, props.theme.colors.quinary)};
`;

const StatsTitle = styled.div`
  letter-spacing: 3px;
  margin: 0px;
  padding: 0px;
  font-family: ${props => props.theme.fonts.header};
  font-size: 2em;
  word-wrap: break-word;
  font-weight: 800;
  color: ${props => lighten(0.3, props.theme.colors.quinary)};
`;

const StatsDate = styled.div`
  padding: 5px;
  color: ${props => lighten(0.57, props.theme.colors.quinary)};
  font-style: italic;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.7em;
`;

const RowOf2StatsSquares = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
`;

/**
 * COMPONENT
 */
const SiteStats = (props) => {
  let stats;

  if (props.stats.siteStats.scrapeCount) {
    stats = props.stats.siteStats;
  } else if (props.stats.state !== 'loading' && props.stats.siteStats.active !== true) {
    props.fetchAllStats();
  }

  let nowDateObj;
  let duration;
  let lastScrapeTime;
  if (stats && stats.endedAt && stats.createdAt) {
    nowDateObj = new Date(stats.fetched);
    const endedDateObj = moment(stats.endedAt);
    const createdDateObj = moment(stats.createdAt);
    duration = endedDateObj.diff(createdDateObj, 'minutes', true); // 1;
    duration = duration.toFixed(2);
    lastScrapeTime = moment(stats.endedAt).fromNow();
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <StatsContainer>
      <ColumnGrow>
        <StatTitleBlock>
          <LogoText>TORRENT REPORT</LogoText>
          <StatsTitle>STATISTICS</StatsTitle>
          <StatsDate>
            {stats && stats.createdAt
              ? `as of ${nowDateObj.toLocaleTimeString('en-us', options)}`
              : 'waiting for server response...'}
          </StatsDate>
        </StatTitleBlock>
        <RowOf2StatsSquares>
          <StatSquare name="Scrape Runs" value={(stats && stats.scrapeCount) || 0} shorten={true} />
          <StatSquare name="Sites" value={(stats && stats.siteCount) || 0} shorten={true} />
        </RowOf2StatsSquares>
        <RowOf2StatsSquares>
          <StatSquare
            name="Sites Load Count"
            value={(stats && stats.siteLoadCount) || 0}
            shorten={true}
          />
          <StatSquare
            name="Torrent Load Count"
            value={(stats && stats.torrentLoadCount) || 0}
            shorten={true}
          />
        </RowOf2StatsSquares>
      </ColumnGrow>
      <ColumnGrow>
        <RowOf2StatsSquares>
          <StatSquare name="Group Count" value={(stats && stats.groupCount) || 0} shorten={true} />
          <StatSquare name="Info Count" value={(stats && stats.infoCount) || 0} shorten={true} />
        </RowOf2StatsSquares>
        <RowOf2StatsSquares>
          <StatSquare
            name="Snapshot Count"
            value={(stats && stats.snapshotCount) || 0}
            shorten={true}
          />
          <StatSquare
            name="Torrent Count"
            value={(stats && stats.torrentCount) || 0}
            shorten={true}
          />
        </RowOf2StatsSquares>
        <RowOf2StatsSquares>
          <StatSquare name="Minute Scrape Time" value={duration || 0} />
          <StatSquare name="Last Scrape Run" value={lastScrapeTime || 0} />
        </RowOf2StatsSquares>
      </ColumnGrow>
    </StatsContainer>
  );
};

const mapState = state => ({
  stats: state.stats,
});

const mapDispatch = dispatch => ({
  fetchAllStats: () => {
    dispatch(fetchStats());
    return false;
  },
});

export default withTheme(connect(
  mapState,
  mapDispatch,
)(SiteStats));
