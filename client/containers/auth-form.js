import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faHandPeace, faIdBadge } from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

import { auth, clearError, clearSuccess } from '../store';
import AcceptTerms from '../components/acceptTerms';
import Notification from '../components/notification';

/**
 * STYLED
 */

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 1em;
  align-items: center;
`;

const FillContainer = styled.div`
  width: 100%;
`;

const Header = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  color: ${props => darken(0.2, props.theme.colors[props.colorSelected || 'quinary'])};
  opacity: 0.7;
  font-family: ${props => props.theme.fonts.header};
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 3.5em;
`;

const StyledInput = styled.input`
  font-family: ${props => props.theme.fonts.header};
  margin: 15px 10px 15px 10px;
  font-size: 16px;
  padding: 0.7em;
  width: 100%;
  background-color: ${props => lighten(0.9, props.theme.colors.quinary)};
  color: ${props => lighten(0.4, props.theme.colors.quinary)};
  border: solid 1px ${props => lighten(0.75, props.theme.colors.quinary)};
  text-shadow: 0 -1px 0 ${props => props.theme.colors.quaternary};
  &:focus {
    color: black;
    border: solid 3px ${props => props.theme.colors[props.colorSelected || 'primary']};
    outline-width: 0;
    outline: none;
    background-color: ${props => lighten(0.96, props.theme.colors.quinary)};
  }
`;

const SubmitButton = styled.button`
  margin: 15px 10px 15px 10px;
  font-size: 0.9em;
  letter-spacing: 2px;
  padding: 0.9em;
  width: 100%;
  font-family: ${props => props.theme.fonts.header};
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  color: ${props => darken(0.55, props.theme.colors[props.colorSelected || 'primary'])};
  background-color: ${props => lighten(0.2, props.theme.colors[props.colorSelected || 'primary'])};
  border: solid 1px ${props => darken(0.15, props.theme.colors[props.colorSelected || 'primary'])};
  outline-width: 0;
  &:focus, &:hover {
    border: solid 1px ${props => darken(0.2, props.theme.colors[props.colorSelected || 'primary'])};
    background-color: ${props => lighten(0.07, props.theme.colors[props.colorSelected || 'primary'])};
    cursor: pointer;
    outline-width: 0;
    outline: none;
  }
  &:active {
    outline-width: 0;
    text-shadow: 0 -1px 0 white;

    color: ${props => darken(0.4, props.theme.colors[props.colorSelected || 'primary'])};
    background-color: ${props =>
    darken(0.01, props.theme.colors[props.colorSelected || 'primary'])};
    border: solid 1px ${props => darken(0.1, props.theme.colors[props.colorSelected || 'primary'])};
  }
`;

const StyledLink = styled.a`
  color: ${props => darken(0.3, props.theme.colors[props.colorSelected || 'primary'])};
  font-size: 18px;
  &:visited {
    color: ${props => darken(0.3, props.theme.colors[props.colorSelected || 'primary'])};
  }
  &:hover {
    text-decoration: none;
    color: ${props => darken(0.5, props.theme.colors[props.colorSelected || 'primary'])};
  }
`;

/**
 * COMPONENT
 */

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      terms: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (this.nameInput) this.nameInput.focus();
  }

  componentWillUnmount() {
    this.props.removeError();
    this.props.removeSuccess();
  }

  handleInputChange(event) {
    const newObj = {};
    newObj[event.target.name] = event.target.value;
    this.setState(newObj);
  }

  render() {
    const {
      name, displayName, header, handleSubmit, error, icon, success, removeES,
    } = this.props;
    let hideForms = true;
    if (!success) hideForms = false;
    return (
      <Center>
        <StyledAuthForm
          onSubmit={(event) => {
            event.preventDefault();
            removeES();
            return handleSubmit(event, this.state.terms);
          }}
          name={name}
        >
          {error &&
            error.response && (
              <FillContainer>
                <Notification title="We have a problem..." type="error">
                  {' '}
                  {error.response.data}{' '}
                </Notification>
              </FillContainer>
            )}
          {success &&
            success.response && (
              <FillContainer>
                <Notification title="Great Success!" type="success">
                  {' '}
                  {success.response.data}{' '}
                </Notification>
              </FillContainer>
            )}
          <Header colorSelected={this.props.colorSelected}>
            <HeaderIcon>
              <FontAwesomeIcon icon={icon} />
            </HeaderIcon>
            {header}
          </Header>

          {!hideForms && (
            <StyledInput
              innerRef={(input) => {
                this.nameInput = input;
              }}
              placeholder="email"
              id="email"
              onChange={this.handleInputChange}
              value={this.state.email}
              name="email"
              type="text"
              colorSelected={this.props.colorSelected}
            />
          )}
          {!hideForms && (
            <StyledInput
              placeholder="password"
              id="password"
              onChange={this.handleInputChange}
              value={this.state.password}
              name="password"
              type="password"
              colorSelected={this.props.colorSelected}
            />
          )}

          {!hideForms &&
            name === 'signup' && (
              <AcceptTerms
                value={this.state.terms}
                toggle={() => this.setState({ terms: !this.state.terms })}
              />
            )}

          {!hideForms && (
            <SubmitButton colorSelected={this.props.colorSelected} type="submit">
              {displayName.toUpperCase()}
            </SubmitButton>
          )}

          {!hideForms && (
            <p>
              <StyledLink colorSelected={this.props.colorSelected} href="/auth/google">
                {displayName} with Google
              </StyledLink>
            </p>
          )}
        </StyledAuthForm>
      </Center>
    );
  }
}

const mapLogin = state => ({
  name: 'login',
  header: 'welcome back',
  icon: faIdBadge,
  displayName: 'Login',
  error: state.user.error,
  success: state.user.success,
  colorSelected: 'secondary',
});

const mapSignup = state => ({
  name: 'signup',
  header: 'sign up',
  icon: faHandPeace,
  displayName: 'Register',
  error: state.user.error,
  success: state.user.success,
  colorSelected: 'primary',
});

const mapDispatch = dispatch => ({
  handleSubmit(evt, terms) {
    evt.preventDefault();
    window.scroll(0, 0); // eslint-disable-line
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName, terms));
  },
  removeError() {
    dispatch(clearError());
  },
  removeSuccess() {
    dispatch(clearSuccess());
  },
  removeES() {
    dispatch(clearError());
    dispatch(clearSuccess());
  },
});

export const Login = withTheme(connect(
  mapLogin,
  mapDispatch,
)(AuthForm));

export const Signup = withTheme(connect(
  mapSignup,
  mapDispatch,
)(AuthForm));
