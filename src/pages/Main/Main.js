import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Posts from "../../components/Posts";

class Main extends Component {
  async componenDidMount() {}

  render() {
    return (
      <>
        <Posts />
      </>
    );
  }
}

export default Main;
