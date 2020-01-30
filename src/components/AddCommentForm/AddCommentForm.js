import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addComment } from "../../store/actions";

import { TextField } from "@material-ui/core";

export class AddPostForm extends Component {
  static propTypes = {};

  state = {
    text: ""
  };

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleAddComment = e => {
    e.preventDefault();
    const data = {
      message: this.state.text,
      commentable_id: this.props.id,
      commentable_type: "Post"
    };
    if (this.state.text) {
      this.props.addComment(data);
      this.setState({
        text: ""
      });
    }
  };

  render() {
    const { amount } = this.props;
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
          <button>Add comment</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.posts.currentPost.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: data => dispatch(addComment(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm);
