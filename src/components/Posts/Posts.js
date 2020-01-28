import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter, Route } from "react-router-dom";

import { loadPosts, getPost } from "../../store/actions";

import AddPostForm from "../AddPostForm";

import { sortItemsByCreated_at } from "../../store/utils";

class Posts extends Component {
  componentDidMount() {
    const { loadPosts } = this.props;
    loadPosts();
  }

  componentDidUpdate(prevProps) {
    const { posts, loadPosts } = this.props;
    if (posts.length !== prevProps.posts.length) {
      loadPosts();
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <>
        <AddPostForm amount={posts.length && posts.length} />
        {posts.length &&
          sortItemsByCreated_at(this.props.posts).map(post => (
            <div
              key={post.id}
              style={{ marginBottom: "10px", backgroundColor: "#eee" }}
            >
              <NavLink
                style={{ textDecoration: "none" }}
                to={`/posts/${post.id}`}
              >
                <p>Post title: {post.title}</p>
                <span>Post description: {post.description}</span>
              </NavLink>
            </div>
          ))}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => dispatch(loadPosts())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
