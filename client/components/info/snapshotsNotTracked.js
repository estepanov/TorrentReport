import React from 'react';
import styled from 'styled-components';

const NotTrackedMessage = styled.div`
  width: 100%;
  font-style: italic;
  display: flex;
  height: 100%;
  ${props =>
    props.center &&
    `justify-content: center;
  align-items: center;`};
`;

const SnapshotsNotTracked = props => (
  <NotTrackedMessage {...props}>This torrents downloads not tracked.</NotTrackedMessage>
);

export default SnapshotsNotTracked;
