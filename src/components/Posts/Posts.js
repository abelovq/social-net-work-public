import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { loadPosts } from '../../store/actions';

import AddPostForm from '../AddPostForm';

import { sortItemsByDate } from '../../store/utils';

class Posts extends PureComponent {
  componentDidMount() {
    console.log('MOUNT POSTS');
    const { loadPosts } = this.props;
    loadPosts();
    console.log('DID MOUTN', this.props.posts); // why posts are not loaded ?
  }

  componentDidUpdate(prevProps) {
    const { posts, loadPosts } = this.props;

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
    console.log('RENDERING !!!!!!!!!!!!', this.props.posts);
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
