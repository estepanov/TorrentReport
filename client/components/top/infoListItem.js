import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

/**
 * STYLES
 */

const ItemLink = styled(Link)`
  font-family: ${props => props.theme.fonts.header};
  display: block;
  text-decoration: none;
  margin: 5px 0 0 0;
  padding: 10px;
  background-color: ${props => lighten(0.98, props.theme.colors.quinary)};
  color: black;
  &:visited {
    color: black;
  }
  &:hover {
    background-color: ${props => lighten(0.95, props.theme.colors.quinary)};
  }
`;

const Name = styled.div`
  color: ${props => lighten(0.3, props.theme.colors.quinary)};
  font-size: 17px;
  margin: 0;
  padding: 0;
`;

const DetailContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.8em;
`;

const Count = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin: 0 10px 0 0;
`;

const CountValue = styled.div`
  opacity: 0.65;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  min-width: 60px;
  color: ${props => props.theme.colors[props.colsel || 'quinary']};
`;

const Detail = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DetailName = styled.div`
  color: ${props => lighten(0.45, props.theme.colors.quinary)};
  padding: 5px 10px 5px 0px;
`;

const DetailValue = styled.div`
  color: ${props => lighten(0.62, props.theme.colors.quinary)};
  padding: 5px 10px 5px 0px;
`;

/**
 * COMPONENT
 */

const InfoListItem = ({
  listingName, listingId, seed, leech, uploader, groupsArr, uploadDate,
}) => {
  // const uploadedDateFormat = 'MM/DD/YYYY';
  const groups = [];
  const seenGroups = new Set();
  const sites = [];
  const seenSites = new Set();
  groupsArr.forEach((group) => {
    if (!seenGroups.has(group.name)) {
      groups.push(group);
      seenGroups.add(group.name);
    }
    if (!seenSites.has(group.torrentSite.name)) {
      sites.push(group.torrentSite);
      seenSites.add(group.torrentSite.name);
    }
  });

  return (
    <ItemLink to={`/listing/${listingId}`}>
      <Name>{listingName}</Name>
      <DetailContainer>
        <Count>
          <CountValue colsel="seed">
            <FontAwesomeIcon icon={faCaretUp} /> {`${seed}`}
          </CountValue>
          <CountValue colsel="leech">
            <FontAwesomeIcon icon={faCaretDown} /> {`${leech}`}
          </CountValue>
        </Count>
        <Detail>
          <DetailName>Uploaded</DetailName>
          <DetailValue>{moment(uploadDate).fromNow()}</DetailValue>
        </Detail>
        <Detail>
          <DetailName>User</DetailName>
          <DetailValue>{uploader}</DetailValue>
        </Detail>
        <Detail>
          <DetailName>Groups</DetailName>
          {groups.map(group => <DetailValue key={group.id}>{`${group.name}`}</DetailValue>)}
        </Detail>
        <Detail>
          <DetailName>Sites</DetailName>
          {sites.map(site => <DetailValue key={site.id}>{`${site.name}`}</DetailValue>)}
        </Detail>
      </DetailContainer>
    </ItemLink>
  );
};

export default withTheme(InfoListItem);
