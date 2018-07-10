import React from 'react';
import moment from 'moment';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

/**
 * STYLES
 */

const ListComponent = styled.div`
  background-color: ${props => lighten(0.98, props.theme.colors.quinary)};
  padding: 0.5em;
  display: inline-flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 250px;
`;
const Item = styled.div`
  font-family: ${props => props.theme.fonts.header};
  display: inline-flex;
  flex-wrap: nowrap;
  padding: 0.2em 0em 0em 0.2em;
  &:first-child {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8em;
  }
`;
const Date = styled.div`
  flex-basis: 6em;
  min-width: 6em;
  flex-grow: 4;
`;
const Time = styled.div`
  min-width: 8em;
  flex-basis: 8em;
  flex-grow: 2;
`;
const SeedLeach = styled.div`
  min-width: 4em;
  flex-basis: 4em;
  flex-grow: 2;
  color: ${props =>
    darken(0.01, props.type === 'seed' ? props.theme.colors.seed : props.theme.colors.leech)};
`;

/**
 * COMPONENT
 */

const SnapshotList = (props) => {
  const justDateFormat = 'MM/DD/YYYY';
  const justTimeFormat = 'h:mm:ss a';

  let sortedSnapshots;
  if (props.sortedSnapshots.length > 16) {
    sortedSnapshots = props.sortedSnapshots.slice(-16);
  } else {
    // eslint-disable-next-line
    sortedSnapshots = props.sortedSnapshots;
  }

  return (
    <ListComponent>
      <Item>
        <Date>Date</Date>
        <Time>Time</Time>
        <SeedLeach type="seed">seed</SeedLeach>
        <SeedLeach type="leech">leech</SeedLeach>
      </Item>
      {sortedSnapshots.map(snapshot => (
        <Item key={snapshot.id}>
          <Date>{moment(snapshot.date).format(justDateFormat)}</Date>
          <Time>{moment(snapshot.date).format(justTimeFormat)}</Time>
          <SeedLeach type="seed">{snapshot.seed}</SeedLeach>
          <SeedLeach type="leech">{snapshot.leech}</SeedLeach>
        </Item>
      ))}
    </ListComponent>
  );
};

export default withTheme(SnapshotList);
