import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import './Header.css';

import { logOut } from '../../store/actions';

function Header(props) {
  return (
    <div className="header">
      <nav className="header-right">
        <ul
          style={{
            listStyleType: 'none',
            display: 'flex',
            width: '300px',
            justifyContent: 'space-evenly',
          }}
        >
          <li>
            {JSON.parse(localStorage.getItem('authToken')) && (
              <NavLink exact to="/" activeClassName="active-link">
                Home
              </NavLink>
            )}
          </li>
          <li>
            {JSON.parse(localStorage.getItem('authToken')) && (
              <NavLink to="/profile" activeClassName="active-link">
                My Profile
              </NavLink>
            )}
          </li>
          <li>
            {JSON.parse(localStorage.getItem('authToken')) && (
              <Link to="/login" onClick={props.logOut}>
                Log out
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(
  connect(null, dispatch => ({
    logOut: () => dispatch(logOut()),
  }))(Header)
);
