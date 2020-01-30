import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { TextField } from "@material-ui/core";

import Comment from "../Comment";

import { getPost, changePost, showComments } from "../../store/actions";

import { parseData } from "../../store/utils";

export class Post extends Component {
  state = {
    currentPost: null,
    title: "",
    description: ""
  };

  async componentDidMount() {
    const id = this.props.history.location.pathname.match(/[0-9]*$/);
    if (!localStorage.getItem("authToken")) {
      this.props.history.push("/");
    } else {
      try {
        await this.props.getPost(id[0]);
      } catch (err) {
        console.log(err);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentPost !== prevState.currentPost) {
      const { title = "", description = "" } = nextProps.currentPost;
      return {
        currentPost: nextProps.currentPost,
        title,
        description
      };
    }
    return null;
  }

  handleInput = ({ target }) => {
    const { user_id: userPostId } = this.props.currentPost;
    const { id: userId } = this.props.user;
    const isOwnPost = userPostId === userId;
    if (isOwnPost) {
      this.setState({
        [target.name]: target.value
      });
    }
    return;
  };

  handleChangePost = () => {
    const id = this.props.history.location.pathname.match(/[0-9]*$/);
    const { title, description } = this.state;
    if (title && description) {
      const data = {
        title,
        description
      };
      this.props.changePost(id, data);
    }
  };

  handleShowComments = () => {
    const { id: postId } = this.props.currentPost;
    const { showComments } = this.props;
    showComments(postId);
  };

  render() {
    const { user_id: userPostId, comments = [] } = this.props.currentPost;
    const { id: userId } = this.props.user;
    const isOwnPost = userPostId === userId;
    const { title = "", description = "" } = this.state;

    let postCreatedAt;
    if (Object.values(this.props.currentPost).length !== 0) {
      postCreatedAt = parseData("Post", this.props.currentPost, userPostId);
    }
    return (
      <>
        <Card>
          <CardContent>
            {postCreatedAt}
            <TextField
              value={title}
              margin="dense"
              id="name"
              label="title"
              type="text"
              name="title"
              fullWidth
              onChange={this.handleInput}
            />
            <TextField
              value={description}
              margin="dense"
              id="name"
              label="description"
              type="text"
              name="description"
              fullWidth
              onChange={this.handleInput}
            />
            <div style={{ marginTop: "20px" }}>
              {isOwnPost && (
                <button onClick={this.handleChangePost}>Change post</button>
              )}
              <button onClick={this.handleShowComments}>Show comments</button>
              <button>Add comment</button>
            </div>
          </CardContent>
        </Card>
        {comments.length ? (
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPost: state.posts.currentPost,
    user: state.login.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: id => dispatch(getPost(id)),
    changePost: (id, data) => dispatch(changePost(id, data)),
    showComments: id => dispatch(showComments(id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
