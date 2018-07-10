import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageHeader from '../pageHeader';
/**
 * COMPONENT
 */
export const AccountHome = (props) => {
  const { email } = props;

  return (
    <div>
      <PageHeader>Your Account</PageHeader>
      <h3>Welcome, {email}</h3>
      <br />
      <Link to="/account/delete">Delete Your Account Here</Link>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email,
});

export default connect(mapState)(AccountHome);
