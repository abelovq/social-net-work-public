import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

import { createPost } from '../../store/actions';

import './AddPostForm.css';

export class AddPostForm extends Component {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    description: '',
    error: false,
  };

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleAddPost = e => {
    e.preventDefault();
    const { title, description } = this.state;
    if (title && description) {
      const data = {
        title,
        description,
      };
      this.props.createPost(data);
      this.setState({
        title: '',
        description: '',
        error: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    const { amount } = this.props;
    return (
      <div>
        <form className="add-post-form" onSubmit={this.handleAddPost}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            value={this.state.title}
            label="Input title"
            type="text"
            name="title"
            fullWidth
            onChange={this.handleInput}
          />
          <TextField
            margin="dense"
            id="title"
            value={this.state.description}
            label="Input description"
            type="text"
            name="description"
            fullWidth
            onChange={this.handleInput}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <div>
              {this.state.error && (
                <p style={{ color: '#E87C03' }}>
                  Please input title and description
                </p>
              )}
              <button style={{ marginRight: '30px' }}>Create Post</button>
              <span>{amount}</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: data => dispatch(createPost(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddPostForm);
