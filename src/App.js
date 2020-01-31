import React from 'react'

import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { Container } from '@material-ui/core'

import { getCurrentUser } from './store/actions'

import Signup from './pages/Signup/Signup'
import Main from './pages/Main/Main'
import Login from './pages/Login'
import Post from './components/Post'
import Layout from './components/Layout'
import Header from './components/Header'
import Profile from './pages/Profile'

import './App.css'

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
  )
}

class App extends React.Component {
  componentDidMount() {
    console.log('APP COMPONEN DID MOUNT')

    console.log('CDM')
    this.props.getCurrentUser()
  }

  // async componentDidUpdate(prevProps) {
  //   if (this.props.isAuth !== prevProps.isAuth) {
  //     await this.props.getCurrentUser()
  //   }
  // }

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
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.login.isAuth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
