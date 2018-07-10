import React from 'react';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

const CookieMessage = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  background-color: ${props => lighten(0.2, props.theme.colors.senary)};
  padding: 20px;
  margin: 0px;
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column;
  }
`;

const Message = styled.div`
  color: ${props => darken(0.2, props.theme.colors.senary)};
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${props => darken(0.4, props.theme.colors.senary)};
  justify-content: flex-start;
  align-items: flex-start;
`;

const Info = styled.div`
  font-size: 15px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledLink = styled(Link)`
  color: ${props => darken(0.4, props.theme.colors.senary)};
  display: inline-flex;
  &:visited {
    color: ${props => darken(0.4, props.theme.colors.senary)};
  }
  &:hover {
    color: ${props => darken(0.2, props.theme.colors.senary)};
  }
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 19px;
  background-color: ${props => lighten(0.4, props.theme.colors.senary)};
  border: solid 5px white;
  color: ${props => darken(0.4, props.theme.colors.senary)};
  font-weight: bold;
  padding: 12px;
  margin: 20px;
  @media (max-width: ${props => props.theme.mobile.width}) {
    margin: 20px 0 0 0;
  }
  flex-shrink: 0;
  &:hover {
    background-color: white;
    border: solid 5px ${props => darken(0.4, props.theme.colors.senary)};
    color: ${props => darken(0.4, props.theme.colors.senary)};
  }
`;

class CookiesUse extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    const shouldHide = cookies.get('USE_OF_COOKIES_ACCEPTED') || false;
    this.state = {
      shouldHide,
    };
  }
  hideAndAccept = () => {
    const { cookies } = this.props;
    cookies.set('USE_OF_COOKIES_ACCEPTED', true, { path: '/', expires: new Date(2038, 0, 1) });
    this.setState({ shouldHide: true });
  };
  render() {
    if (!this.state.shouldHide) {
      return (
        <CookieMessage>
          <Message>
            <Header>We use cookies to improve user experience. </Header>
            <Info>
              By using our website you acknowledge and consent to all cookies, policies, and terms
              in accordance with our{' '}
              <StyledLink to="/policy/terms-of-service">Terms of Service</StyledLink>,{' '}
              <StyledLink to="/policy/cookies">Cookie Policy</StyledLink>, and{' '}
              <StyledLink to="/policy/privacy">Privacy Policy</StyledLink>.{' '}
            </Info>
          </Message>
          <Button onClick={this.hideAndAccept}>Accept & Close</Button>
        </CookieMessage>
      );
    }
    return <div />;
  }
}

export default withCookies(withTheme(CookiesUse));
