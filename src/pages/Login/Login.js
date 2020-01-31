import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import ProTypes from 'prop-types';

import { TextField, Container } from '@material-ui/core';

import { loginUser } from '../../store/actions';

class Login extends Component {
  static propTypes = {
    loginUser: ProTypes.func.isRequired,
    failedLogin: ProTypes.bool,
  };

  state = {
    email: '',
    password: '',
  };

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      const data = {
        email,
        password,
      };
      this.props.loginUser(data);
    }
    return;
  };

  render() {
    const { failedLogin } = this.props;
    return (
      <Container maxWidth="sm">
        {JSON.parse(localStorage.getItem('authToken')) && <Redirect to="/" />}
        <h1>Login</h1>
        <form noValidate autoComplete="off" onSubmit={this.handleLogin}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={this.state.email}
            label="Email Address"
            type="email"
            name="email"
            fullWidth
            onChange={this.handleInput}
          />
          <TextField
            value={this.state.password}
            margin="dense"
            id="name"
            label="Password"
            type="password"
            name="password"
            fullWidth
            onChange={this.handleInput}
          />
          {failedLogin && (
            <p style={{ color: '#E87C03' }}>Uncorrect login or password</p>
          )}
          <div>
            <input style={{ marginTop: '20px' }} type="submit" value="Login" />
            <p>Don't have an account?</p>
            <Link to="/sign_up">Sign Up</Link>
          </div>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    failedLogin: state.login.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: data => dispatch(loginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
