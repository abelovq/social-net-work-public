import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import "./Header.css";

import { logOut } from "../../store/actions";

function Header(props) {
  return (
    <div className="header">
      <button className="profile-button">
        <Link to="/profile" style={{textDecoration: 'none'}}>
          Profile
        </Link>
      </button>
      
      {JSON.parse(localStorage.getItem("authToken")) && (
        <button className="logout-btn" onClick={props.logOut}>
          logOut
        </button>
      )}
    </div>
  );
}

export default connect(null, dispatch => ({
  logOut: () => dispatch(logOut())
}))(Header);
