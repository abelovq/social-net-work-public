import React from 'react';
import { connect } from 'react-redux';

import { deleteComment, changeComment, getComments } from '../../store/actions';

class Comment extends React.Component {
  state = {
    text: '',
    comment: null,
  };

  handleChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  deleteComment = () => {
    const {
      comment: { id },
    } = this.props;
    console.log(id);
    this.props.deleteComment(id);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.comment !== prevState.comment) {
      const { message: text = '' } = nextProps.comment;
      return {
        comment: nextProps.comment,
        text,
      };
    }
    return null;
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.comment.message !== prevState.comment.message) {
  //     const { getComments, userPostId } = this.props
  //     console.log('UPDATE')

  //   }
  // }

  handleChangeCommentRequest = () => {
    const { id } = this.props.comment;
    const { text } = this.state;
    const { getComments, postId } = this.props;
    const data = {
      message: text,
      id,
    };
    if (text) {
      this.props.changeComment(data);
      getComments(postId);
    }
  };

  render() {
    const { comment, currentUserId } = this.props;
    const isOwnComment = comment.user_id === currentUserId;
    const { text } = this.state;
    return (
      <li style={{ marginBottom: '10px' }}>
        <div style={{ border: '1px solid #eee', padding: '10px' }}>
          <textarea
            style={{
              border: 'none',
              borderBottom: '1px solid #000',
              width: '100%',
              resize: 'none',
              fontSize: '14px',
              lineHeight: '10px',
            }}
            value={text}
            margin="dense"
            id="name"
            label="title"
            type="text"
            name="text"
            onChange={this.handleChange}
          />
          <div
            style={{
              marginTop: '20px',
            }}
          >
            {isOwnComment && (
              <>
                <button onClick={this.handleChangeCommentRequest}>
                  Change comment
                </button>
                <button onClick={this.deleteComment}>Delete comment</button>
              </>
            )}
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.login.user.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: id => dispatch(deleteComment(id)),
    changeComment: data => dispatch(changeComment(data)),
    getComments: postId => dispatch(getComments(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
