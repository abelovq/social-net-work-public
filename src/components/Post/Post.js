import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { getPost } from "../../store/actions";

import { parseData } from "../../store/utils";

export class Post extends Component {
  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    if (!localStorage.getItem("authToken")) {
      this.props.history.push("/");
    } else {
      const { id } = this.props;
      this.props.getPost(id);
    }
  }

  render() {
    const { user_id } = this.props.currentPost;
    let commentCreatedAt;
    if (Object.values(this.props.currentPost).length !== 0) {
      commentCreatedAt = parseData(this.props.currentPost, user_id);
    }
    return (
      <Card>
        <CardContent>{commentCreatedAt}</CardContent>
        <button>Show comments</button>
        <button>Add comment</button>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPost: state.posts.currentPost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: id => dispatch(getPost(id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
