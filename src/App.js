import React, { useEffect } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';

import { getCurrentUser, loadPosts } from './store/actions';

import Signup from './pages/Signup/Signup';
import Main from './pages/Main/Main';
import Login from './pages/Login';
import Post from './components/Post';
import Layout from './components/Layout';
import Header from './components/Header';
import Profile from './pages/Profile';

import { useHistory } from "react-router-dom";

import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // console.log(`props`, rest)
        if (localStorage.getItem('authToken') && rest.isAuth === true) {
          console.log(1)
          return (<Component {...props} />)
        }
        console.log(2)
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )

      }
      }

    />
  );
};

const AuthComp = (Comp, ...props) => {
  let history = useHistory();
  console.log(props)
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.login.isAuth)
  console.log(`isAuth`, isAuth)
  const checkRedirect = () => {
    if (!isAuth) {
      history.push('/login')
    }
  }

  useEffect(() => {
    checkRedirect()
    return () => {

    }
  }, [isAuth])
  return <Comp {...props} />

}

const App = (props) => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.login.isAuth)

  useEffect(() => {
    dispatch(getCurrentUser());
    // if (JSON.parse(localStorage.getItem('authtoken')) && this.props.isAuth === true) {
    dispatch(loadPosts());
    // }
  })

  console.log('CDM', props)
  return (
    <Layout header={<Header />}>
      <Container maxWidth="md">
        <Switch>
          <Route path="/sign_up" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/" {...props}>
            {AuthComp(Main)}
          </Route>
          <Route exact path="/posts/:id" {...props}>
            {AuthComp(Post)}
          </Route>
          <Route exact path="/profile" {...props}>
            {AuthComp(Profile)}
          </Route>
          {/* <Route  component={Post} isAuth={this.props.isAuth} />
          <Route  component={Profile} isAuth={this.props.isAuth} /> */}
          <Redirect from="*" to="/login" />
        </Switch>
      </Container>
    </Layout>
  );

}

export default App;
