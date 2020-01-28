import React from 'react';
import { connect } from 'react-redux';

import './Header.css';

import { logOut } from '../../store/actions'

function Header(props) {
    return (
        <div className="header">
            {JSON.parse(localStorage.getItem('authToken')) &&  
            <button 
                className="logout-btn"
                onClick={props.logOut}
            >
                logOut
            </button>}
        </div>
    )
}

export default connect(null, dispatch => ({logOut: () => dispatch(logOut())}))(Header)


