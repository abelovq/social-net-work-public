import React from "react";
import "./App.css";

import { Route, Redirect } from "react-router-dom";

import { Container } from "@material-ui/core";

import Signup from "./pages/Signup/Signup";
import Main from "./pages/Main/Main";
import Login from "./pages/Login";
import Post from "./components/Post";
import Layout from "./components/Layout";
import Header from "./components/Header";

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

function App() {
  return (
    <Container maxWidth="sm">
      <Route exact path="/" component={Signup} />
      <Route path="/login" component={Login} />
      <Layout header={<Header />}>
        <PrivateRoute path="/main" component={Main} />
        <Route
          path="/posts/:id"
          render={({ match }) => <Post id={match.params.id} exact />}
        />
        <Redirect from="*" to="/" />
      </Layout>
    </Container>
  );
}

export default App;
