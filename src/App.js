import React from "react";

import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { Container } from "@material-ui/core";

import { getCurrentUser } from './store/actions';

import { getCreds } from './store/sagas/services';

import Signup from "./pages/Signup/Signup";
import Main from "./pages/Main/Main";
import Login from "./pages/Login";
import Post from "./components/Post";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Profile from "./pages/Profile";

import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

class App extends React.Component {

  state = {
    loaded: false
  }

  componentDidMount() {

    
  
      this.props.getCurrentUser();
      
    
  }

  // componentDidUpdate(nextState) {
  //   if (this.state.loaded !== nextState.loaded) {
  //     const { getCurrentUser } = this.props;
  //     getCurrentUser();
  //   }
  //   return;
  // }

  render() {
    console.log('RENDER')
    // console.log('GREDS', getCreds())
    return (
      <Container maxWidth="sm">
        <Route exact path="/" component={Signup} />
        <Route path="/login" component={Login} />
        <Layout header={<Header />}>
          <PrivateRoute path="/main" component={Main} />
          <PrivateRoute
            path="/posts/:id"
            component={Post}
            // render={({ match }) => <Post id={match.params.id} exact />}
          />
          <PrivateRoute path="/profile" component={Profile} />
          <Redirect from="*" to="/" />
        </Layout>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}

export default connect(null, mapDispatchToProps)(App);
