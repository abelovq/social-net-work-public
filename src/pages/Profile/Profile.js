import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { loadPosts } from '../../store/actions';

import { getPostsByUser, sortItemsByDate } from '../../store/utils';

import './Profile.css';

class Profile extends React.Component {
  componentDidMount() {
    this.props.loadPosts();
  }

  getPostsByUser = () => {
    const { userData, posts } = this.props;
    const { id } = userData;
    if (posts) {
      const userPosts = getPostsByUser(id, posts);
      return sortItemsByDate(userPosts);
    }
  };

  render() {
    const { userData } = this.props;
    const { email, firs_name: first_name, last_name } = userData;
    return (
      <>
        Info: {email}
        {first_name}
        {last_name}
        <br />
        Posts:{' '}
        {this.getPostsByUser().length ? (
          this.getPostsByUser().map(post => (
            <div
              key={post.id}
              style={{ marginBottom: '10px', backgroundColor: '#eee' }}
            >
              <NavLink
                style={{ textDecoration: 'none' }}
                to={`/posts/${post.id}`}
              >
                <p>Post title: {post.title}</p>
                <span>Post description: {post.description}</span>
              </NavLink>
            </div>
          ))
        ) : (
          <p>Not posts yet</p>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.login.user,
    posts: state.posts.posts,
  };
};

const mapDidpsatchToProps = dispatch => {
  return {
    loadPosts: () => dispatch(loadPosts()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDidpsatchToProps)(Profile)
);
