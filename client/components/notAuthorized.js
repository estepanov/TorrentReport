import React from 'react';
import styled, { withTheme } from 'styled-components';
// import { lighten, darken } from 'polished';

import PageHeader from './pageHeader';

const Message = styled.div`
  font-size: 16px;
`;

// eslint-disable-next-line
const NotAuthorized = props => (
  <div>
    <PageHeader>You Are Not NotAuthorized</PageHeader>
    <Message>
      Sorry buddy, looks like your account permissions are not what they need to be to access this
      page.
    </Message>
  </div>
);

export default withTheme(NotAuthorized);
