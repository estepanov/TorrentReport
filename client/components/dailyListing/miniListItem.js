import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';
import truncate from '../truncate';

/**
 * STYLES
 */

const Item = styled(Link)`
  display: inline-flex;
  border-bottom: 1px solid ${props => lighten(0.2, props.theme.colors.primary)};
  align-items: center;
  font-family: ${props => props.theme.fonts.header};
  font-size: 0.9em;
  margin: 0;
  flex-basis: auto;
  flex-grow: 1;
  word-break: break-all;
  word-wrap: break-word;
  text-decoration: none;
  color: ${props => darken(0.4, props.theme.colors.primary)};
  opacity: 0.6;
  &:hover {
    opacity: 1;
    color: ${props => darken(0.4, props.theme.colors.primary)};
  }
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: ${props => props.theme.mobile.width}) {
    padding: 10px 0px 10px 0px;
  }
`;

const FlexSwitch = styled.div`
  display: inline-flex;
  flex-grow: 1;
  flex-direction: row;
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column;
  }
`;

const Number = styled.div`
  opacity: 0.4;
  background-color: ${props => darken(0.3, props.theme.colors.primary)};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  flex-basis: 28px;
  margin-right: 10px;
  font-size: 14px;
  font-family: monospace;
  flex-shrink: 0;
  flex-grow: 0;
`;
const Name = styled.div`
  display: inline-flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
  word-break: break-word;
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  @media (max-width: ${props => props.theme.mobile.width}) {
    justify-content: flex-start;
  }
  align-items: center;
  flex-wrap: no-wrap;
  font-weight: bolder;
  flex-basis: auto;
`;
const SLData = styled.div`
  min-width: 4em;
  display: inline;
  color: ${props => (props.type === 'seed' ? '#008000' : '#ff0000')};
  opacity: ${props => (props.active ? 1 : 0.25)};
`;
const UploadDate = styled.div`
  width: 8.1em;
  color: black;
  opacity: 0.3;
  font-style: italic;
  font-weight: lighter;
`;

/**
 * COMPONENT
 */

const shorten = originalName =>
  (originalName.length > 44 ? `${originalName.slice(0, 44)}...` : originalName);

const MiniListItem = (props) => {
  const { name, id, Infos } = props.item;
  const { active } = props;
  const seed = Infos.reduce((acc, curr) => acc + curr.seed, 0);
  const leech = Infos.reduce((acc, curr) => acc + curr.leech, 0);
  const earliestUpload = Infos.reduce(
    (earliestDate, currInfo) =>
      (new Date(currInfo.uploadDate) < earliestDate ? new Date(currInfo.uploadDate) : earliestDate),
    new Date(),
  );

  let seedClass = 'seed';
  let leechClass = 'leech';
  if (active === 'seed') {
    seedClass += ' active';
  } else {
    leechClass += ' active';
  }

  return (
    <Item alt={name} to={`/listing/${id}`}>
      <Number>{props.index + 1}</Number>
      <FlexSwitch>
        <Name>{truncate(name, 60, true)}</Name>
        <Info>
          <SLData type="seed" active={active === 'seed'}>
            <FontAwesomeIcon icon={faCaretUp} /> {seed}
          </SLData>
          <SLData type="leech" active={active === 'leech'}>
            <FontAwesomeIcon icon={faCaretDown} /> {leech}
          </SLData>
          <UploadDate>{`${moment(earliestUpload).fromNow()} `}</UploadDate>
        </Info>
      </FlexSwitch>
    </Item>
  );
};

export default withTheme(MiniListItem);
