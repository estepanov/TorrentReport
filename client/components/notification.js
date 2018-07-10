import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { darken } from 'polished';

const StyledNotification = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.notifications[props.type || 'info'].backgroundColor};
  font-family: ${props => props.theme.fonts.header};
  padding: 1em;
`;

const Title = styled.div`
  font-size: 1.4em;
  text-transform: capitalize;
  color: ${props => props.theme.notifications[props.type || 'info'].textColor};
  margin-bottom: 0.5em;
`;
const NotificationBody = styled.div`
  line-height: 1.4em;
  font-size: 1em;
`;
const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px;
  margin: 0px;
`;
const ActionLink = styled(Link)`
  color: ${props => darken(0.2, props.theme.notifications[props.type || 'info'].color)};
`;
/**
 * COMPONENT
 */
const Notification = (props) => {
  const { title, links, type } = props;
  return (
    <StyledNotification type={type}>
      <Title type={type}>{title}</Title>
      <NotificationBody type={type}>{props.children}</NotificationBody>
      {links &&
        links.length > 0 && (
          <Action>
            {links.map(link => (
              <ActionLink to={link.to} key={link.text} type={type}>
                {link.text}
              </ActionLink>
            ))}
          </Action>
        )}
    </StyledNotification>
  );
};

export default withTheme(Notification);
