import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, Container } from "@material-ui/core";

import { createPost } from "../../store/actions";

import "./AddPostForm.css";

export class AddPostForm extends Component {
  state = {
    title: "",
    description: ""
  };

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleAddPost = e => {
    e.preventDefault();
    const { title, description } = this.state;
    if (title && description) {
      const data = {
        title,
        description
      };
      this.props.createPost(data);
      this.setState({
        title: "",
        description: ""
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px"
            }}
          >
            <button>Create Post</button>
            <span>{amount}</span>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    createPost: data => dispatch(createPost(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm);
