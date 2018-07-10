import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

import SectionHeader from '../sectionHeader';

/**
 * STYLES
 */

const GroupContainer = styled.div`
  display: inline-flex;
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Item = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  margin: 0.5em 1em 0em 0em;
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  background-color: ${props => lighten(0.98, props.theme.colors.quinary)};
  padding: 1em;
  justify-content: space-between;
`;

const SiteLink = styled(Link)`
  flex-basis: auto;
  text-transform: uppercase;
  font-size: 0.7em;
  margin: 0 20px 0 0;
  text-decoration: none;
  color: #a7a7a7;
  &:visited: {
    color: #a7a7a7;
  }
  &:hover {
    color: #4b4b4b;
  }
`;
const GroupLink = styled(Link)`
  flex-basis: auto;
  text-decoration: none;
  color: ${props => darken(0.2, props.theme.colors.secondary)};
  &:visited {
    color: ${props => darken(0.2, props.theme.colors.secondary)};
  }
  &:hover {
    color: black;
  }
`;

/**
 * COMPONENT
 */

const Groups = (props) => {
  const { groups } = props;
  return (
    <div>
      <SectionHeader>Groups</SectionHeader>
      <GroupContainer>
        {groups &&
          groups.map(GroupItem => (
            <Item key={GroupItem.id}>
              <SiteLink to={`/site/${GroupItem.torrentSite.id}`}>
                {GroupItem.torrentSite.name}
              </SiteLink>
              <GroupLink to={`/group/${GroupItem.id}`}>{GroupItem.tag}</GroupLink>
            </Item>
          ))}
      </GroupContainer>
    </div>
  );
};

export default withTheme(Groups);
