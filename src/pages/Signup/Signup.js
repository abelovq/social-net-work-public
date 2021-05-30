import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import isEmail from 'validator/lib/isEmail';

import { TextField, Container } from '@material-ui/core';

import { registerUser } from '../../store/actions';

import { validateForm, promisiftAction } from '../../utils'

const Signup = () => {
  const [state, setState] = useState({ email: '', password: '', passwordConfirm: '' });
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();

  const registerUserAsync = promisiftAction(dispatch, registerUser);

  const handleInput = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value.trim(),
    });
    setErrors({
      ...errors,
      [target.name]: null,
    })
  };

  const validate = () => {
    const [isValid, newErrors] = validateForm(state, errors);
    console.log(`newErrors`, newErrors)
    setErrors(newErrors);
    return isValid
  }

  const handleRegister = async e => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await registerUserAsync(state);
        console.log(`res`, res)
      } catch (err) {
        setErrors({ ...errors, [Object.keys(err)[0]]: Object.values(err)[0] })
      }

    };
  };


  return (
    <Container maxWidth="sm">
      {/* {JSON.parse(localStorage.getItem('authToken')) && <Redirect to="/" />} */}
      <h1>welcome to social net work</h1>
      <form noValidate autoComplete="off" onSubmit={handleRegister}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={state.email}
          label="Email Address"
          type="email"
          name="email"
          fullWidth
          onChange={handleInput}
        />
        <TextField
          value={state.password}
          margin="dense"
          id="name"
          label="Password"
          type="password"
          name="password"
          fullWidth
          onChange={handleInput}
        />
        <TextField
          value={state.password_confirm}
          margin="dense"
          id="name"
          label="Confirm password"
          type="password"
          name="passwordConfirm"
          fullWidth
          onChange={handleInput}
        />
        {errors.email && (
          <p style={{ color: '#E87C03' }}>{errors.email}</p>
        )}
        {errors.password && (
          <p style={{ color: '#E87C03' }}>
            {errors.password}
          </p>
        )}
        {errors.passwordConfirm && (
          <p style={{ color: '#E87C03' }}>{errors.passwordConfirm}</p>
        )}
        <button style={{ marginTop: '20px' }} type="submit">
          Register
          </button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '20px' }}>Already have an account?</p>
          <Link to="/login">Sign In</Link>
        </div>
      </form>
    </Container>
  );
}

// const mapDispathToProps = dispatch => {
//   return {
//     registerUser: data => dispatch(registerUser(data)),
//   };
// };

export default Signup;
