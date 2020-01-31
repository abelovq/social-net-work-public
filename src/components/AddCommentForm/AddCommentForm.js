import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addComment } from '../../store/actions';

import { TextField } from '@material-ui/core';

export class AddPostForm extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    id: PropTypes.number,
    amount: PropTypes.number,
  };

  state = {
    text: '',
    error: false,
  };

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleAddComment = e => {
    e.preventDefault();
    const data = {
      message: this.state.text,
      commentable_id: this.props.id,
      commentable_type: 'Post',
    };
    if (this.state.text) {
      this.props.addComment(data);
      this.setState({
        text: '',
        error: false,
      });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { amount } = this.props;
    const { error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleAddComment}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            value={this.state.text}
            label="Input message"
            type="text"
            name="text"
            fullWidth
            onChange={this.handleInput}
            multiline
          />
          <p>
            {amount
              ? amount > 1
                ? `${amount} comments`
                : `${amount} comment`
              : 'No comments'}
          </p>
          {error && <p style={{ color: '#E87C03' }}>Input text</p>}
          <button style={{ marginTop: '10px' }}>Add comment</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.posts.currentPost.id,
    amount: state.posts.currentPost.comments.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: data => dispatch(addComment(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm);
