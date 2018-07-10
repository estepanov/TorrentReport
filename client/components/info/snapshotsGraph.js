import React from 'react';
import styled from 'styled-components';
import SnapshotLine from '../charts/snapshotLine';

const Chart = styled.div`
  display: flex;
  flex-grow: 4;
  flex-basis: 300px;
  min-width: 300px;
  padding: 0.5em;
  font-family: ${props => props.theme.fonts.header};
`;

const SnapshotsGraph = (props) => {
  if (props.sortedSnapshots.length > 1) {
    return (
      <Chart>
        <SnapshotLine data={props.sortedSnapshots} />
      </Chart>
    );
  }
  return <div />;
};

export default SnapshotsGraph;
