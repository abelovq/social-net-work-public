import React from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';

import { getCurrentUser } from './store/actions';

import Signup from './pages/Signup/Signup';
import Main from './pages/Main/Main';
import Login from './pages/Login';
import Post from './components/Post';
import Layout from './components/Layout';
import Header from './components/Header';
import Profile from './pages/Profile';

import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('authToken') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  static propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Layout header={<Header />}>
          <Switch>
            <Route path="/sign_up" component={Signup} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute path="/posts/:id" component={Post} />
            <PrivateRoute path="/profile" component={Profile} />
            <Redirect from="*" to="/login" />
          </Switch>
        </Layout>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
