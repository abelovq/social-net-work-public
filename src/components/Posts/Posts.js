import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loadPosts } from '../../store/actions';

import AddPostForm from '../AddPostForm';

import { sortItemsByDate } from '../../store/utils';

class Posts extends PureComponent {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    loadPosts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { loadPosts } = this.props;
    loadPosts();
  }

  componentDidUpdate(prevProps) {
    // TODO
    // if (posts.length !== prevProps.posts.length) {
    //   console.log('INNER UPDATE')
    //   loadPosts()
    // }
  }

  renderPosts = () => {
    const { posts } = this.props;
    if (posts.length) {
      const posts = sortItemsByDate(this.props.posts).map(post => (
        <div
          key={post.id}
          style={{ marginBottom: '10px', backgroundColor: '#eee' }}
        >
          <NavLink style={{ textDecoration: 'none' }} to={`/posts/${post.id}`}>
            <p>Post title: {post.title}</p>
            <span>Post description: {post.description}</span>
          </NavLink>
        </div>
      ));
      return posts;
    } else {
      return null;
    }
  };

  render() {
    const { loading, posts } = this.props;
    return (
      <>
        {loading ? (
          <div>Loading ... </div>
        ) : (
          <>
            <AddPostForm amount={posts.length && posts.length} />
            {this.renderPosts()}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => dispatch(loadPosts()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
