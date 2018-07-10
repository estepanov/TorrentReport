import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { darken } from 'polished';

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  padding: 0em 0em 1em 0em;
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column;
  }
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const UserContainer = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  @media (max-width: ${props => props.theme.mobile.width}) {
    margin-top: 10px;
    margin-left: 0px;
    align-items: flex-start;
  }
`;

const Descriptor = styled.div`
  font-size: 0.6em;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  color: #a7a7a7;
`;

const Value = styled.div`
  font-size: 1.4em;
  font-family: ${props => props.theme.fonts.header};
`;

const ValueLink = styled(Link)`
  padding: 0px 0px 3px 0px;
  text-decoration: none;
  color: ${props => darken(0.2, props.theme.colors.secondary)};
  text-decoration: underline;
  &:hover {
    color: black;
    text-decoration: none;
  }
  &:visited {
    color: ${props => darken(0.2, props.theme.colors.secondary)};
  }
`;

const InfoHeader = (props) => {
  const { listing, uploadUser } = props;
  return (
    <Header>
      <NameContainer>
        <Descriptor>Torrent Listing</Descriptor>
        <Value>
          {listing && <ValueLink to={`/listing/${listing.id}`}>{listing.name}</ValueLink>}
        </Value>
      </NameContainer>
      <UserContainer>
        <Descriptor>Uploading User</Descriptor>
        <Value>{uploadUser}</Value>
      </UserContainer>
    </Header>
  );
};

export default withTheme(InfoHeader);
