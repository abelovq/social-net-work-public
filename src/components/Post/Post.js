import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { TextField } from "@material-ui/core";

import Comment from "../Comment";
import AddCommentForm from "../AddCommentForm";

import { getPost, changePost, getComments } from "../../store/actions";

import { parseData } from "../../store/utils";

export class Post extends Component {
  static propTypes = {
    currentPost: PropTypes.object,
    user: PropTypes.object
  };

  state = {
    currentPost: null,
    title: "",
    description: "",
    isShow: false
  };

  async componentDidMount() {
    const id = this.props.history.location.pathname.match(/[0-9]*$/);
    const { getComments } = this.props;

    if (!localStorage.getItem("authToken")) {
      this.props.history.push("/");
    } else {
      try {
        await this.props.getPost(id[0]);
        await getComments(id[0]);
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
    this.setState({
      isShow: !this.state.isShow
    });
  };

  render() {
    const { user_id: userPostId, comments = [] } = this.props.currentPost;
    const { isShow } = this.state;
    const { postLoading, commentsAmount } = this.props;
    const { id: userId } = this.props.user;
    const isOwnPost = userPostId === userId;
    const { title = "", description = "" } = this.state;

    let postCreatedAt;
    if (Object.values(this.props.currentPost).length !== 0) {
      postCreatedAt = parseData("Post", this.props.currentPost, userPostId);
    }
    return (
      <>
        {postLoading ? (
          <div>Loading .... </div>
        ) : (
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
                multiline
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
                multiline
              />
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "200px"
                }}
              >
                {isOwnPost && (
                  <button onClick={this.handleChangePost}>Change post</button>
                )}
                <button onClick={this.handleShowComments}>
                  {!isShow ? "Show comments" : "Hide comments"}
                </button>
              </div>
            </CardContent>
          </Card>
        )}
        {isShow && <AddCommentForm />}
        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
          {comments.length && isShow
            ? comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))
            : isShow && <p>{commentsAmount === 0 && "No comments yet"}</p>}
        </ul>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPost: state.posts.currentPost,
    user: state.login.user,
    postLoading: state.posts.loading,
    commentsAmount: state.posts.currentPost.comments.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: id => dispatch(getPost(id)),
    changePost: (id, data) => dispatch(changePost(id, data)),
    getComments: id => dispatch(getComments(id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
