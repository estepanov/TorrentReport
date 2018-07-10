import React from 'react';
import styled, { withTheme } from 'styled-components';
// import { lighten, darken } from 'polished';

import PageHeader from './pageHeader';

const Message = styled.div`
  font-size: 16px;
`;

// eslint-disable-next-line
const NoMatch = props => (
  <div>
    <PageHeader>Page Not Found</PageHeader>
    <Message>We could not find your requested page.</Message>
  </div>
);

export default withTheme(NoMatch);
