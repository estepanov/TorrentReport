import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';
import moment from 'moment';
import BuiltBy from './BuiltBy';

const StyledFooter = styled.div`
  background-color: ${props => props.theme.footer.backgroundColor};
  color: ${props => darken(0.3, props.theme.footer.backgroundColor)};
  min-height: ${props => props.theme.footer.minHeight};
  font-family: ${props => props.theme.fonts.header};
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  align-items: center;
  justify-content: space-between;
`;

const RowGrowBox = styled.div`
  min-height: 6em;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.footer.linkColor};
  padding: 5px;
  text-decoration: none;
  &:hover {
    color: ${props => darken(0.25, props.theme.footer.linkColor)};
    text-decoration: underline;
  }
  &:visited {
    color: ${props => props.theme.footer.linkColor};
  }
`;

const PolicyLink = styled(Link)`
  color: ${props => lighten(0.5, props.theme.colors.quinary)};
  padding: 5px;
  margin: 2px 5px 2px 5px;
  text-decoration: none;
  &:hover {
    color: ${props => lighten(0.25, props.theme.colors.quinary)};
    text-decoration: underline;
  }
  &:visited {
    color: ${props => lighten(0.5, props.theme.colors.quinary)};
  }
`;

const PolicyHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column;
  }
`;

const Build = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: lightgrey;
  padding: 20px;
  @media (max-width: ${props => props.theme.mobile.width}) {
    text-align: center;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const OnlineUserCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column;
  }
`;

const Footer = ({ userCount }) => (
  <StyledFooter>
    <FlexRow>
      <RowGrowBox>
        <BuiltBy />
      </RowGrowBox>
      <RowGrowBox>
        <FooterLink to="/faq">F.A.Q</FooterLink>
        <FooterLink to="/about">About</FooterLink>
      </RowGrowBox>
    </FlexRow>
    <Column>
      <OnlineUserCount>{`${userCount} users online`}</OnlineUserCount>
      <PolicyHolder>
        <PolicyLink to="/policy/privacy">Privacy Policy</PolicyLink>
        <PolicyLink to="/policy/cookies">Cookie Policy</PolicyLink>
        <PolicyLink to="/policy/terms-of-service">Terms of Service</PolicyLink>
      </PolicyHolder>
      <Build>
        Current Version Build Date<br />
        {moment(BUILD_DATE).format('MMMM Do YYYY, h:mm:ss a') /* eslint-disable-line */}
      </Build>
    </Column>
  </StyledFooter>
);

export default withTheme(Footer);
