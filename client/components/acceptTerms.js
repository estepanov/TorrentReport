import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { darken } from 'polished';

/**
 * STYLES
 */

const Container = styled.div`
  margin: 15px 0 15px 0;
  font-family: ${props => props.theme.fonts.header};
`;

const Checkbox = styled.input`
  margin: 0 10px 0 0;
  background-color: white;
  color: ${props => props.theme.colors.primary};
  padding: 5px;
  border: solid 2px ${props => darken(0.2, props.theme.colors.primary)};
`;

const TermsLink = styled(Link)`
  color: ${props => darken(0.3, props.theme.colors.primary)};
  &:visited {
    color: ${props => darken(0.3, props.theme.colors.primary)};
  }
  &:hover {
    text-decoration: none;
    color: ${props => darken(0.5, props.theme.colors.primary)};
  }
`;

/**
 * COMPONENT
 */

const AcceptTerms = props => (
  <Container>
    <Checkbox
      type="checkbox"
      name="ACCEPT-SETTING"
      id="ACCEPT-SETTING"
      onChange={props.toggle}
      value={props.value}
    />
    <label htmlFor="ACCEPT-SETTING">
      You have read and accepted our{' '}
      <TermsLink to="/policy/terms-of-service">Terms of Service</TermsLink>,{' '}
      <TermsLink to="/policy/privacy">Privacy Policy</TermsLink>, and{' '}
      <TermsLink to="/policy/cookies">Cookie Policy</TermsLink>.
    </label>
  </Container>
);

export default withTheme(AcceptTerms);
