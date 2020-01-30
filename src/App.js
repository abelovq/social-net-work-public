import React from "react";

import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Container } from "@material-ui/core";

import { getCurrentUser } from "./store/actions";

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
  componentDidMount() {
    console.log("QQQQ");
    if (
      this.props.history.location.pathname !== "/sign_up" &&
      this.props.history.location.pathname !== "/login"
    ) {
      console.log("CDM");
      this.props.getCurrentUser();
    }
  }

  // componentDidUpdate() {
  //   if (
  //     this.props.history.location.pathname !== "/sign_up" &&
  //     this.props.history.location.pathname !== "/login"
  //   ) {
  //     this.props.getCurrentUser();
  //   }
  // }

  render() {
    console.log(this.props.history.location);
    console.log(1);
    return (
      <Container maxWidth="sm">
        <Route path="/sign_up" component={Signup} />
        <Route path="/login" component={Login} />
        <Layout header={<Header />}>
          <PrivateRoute exact path="/" component={Main} />
          <PrivateRoute path="/posts/:id" component={Post} />
          <PrivateRoute path="/profile" component={Profile} />
        </Layout>
        <Redirect from="*" to="/login" />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.login.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
