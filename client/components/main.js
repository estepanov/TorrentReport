import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = props => {
  const { children, handleClick, isLoggedIn } = props

  return (
    <div>
      <div className="header">
        <div className="logo">
          <Link to="/">Torrent Report</Link>
        </div>
        <div className="nav">
          <Link to="/home">HOME</Link>
          <Link to="/test">TEST</Link>
        </div>
      </div>
      <div className="content">{children}</div>
      <div className="footer">
        <div className="builtBox">
          <div className="builtby">BUILT BY</div>
          <div className="byme">
            <a href="http://estepanov.io">estepanov.io</a>
          </div>
        </div>
        {isLoggedIn ? (
          <div>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">LOGIN</Link>
            <Link to="/signup">SIGN UP</Link>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
