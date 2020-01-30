import React from "react";
import { connect } from "react-redux";

import { deleteComment } from "../../store/actions";

import { parseData } from "../../store/utils";

class Comment extends React.Component {
  state = {
    text: ""
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  deleteComment = () => {
    const {
      comment: { id }
    } = this.props;
    console.log(id);
    this.props.deleteComment(id);
  };

  render() {
    const { comment, currentUserId } = this.props;
    const text = parseData("Comment", comment, comment.user_id);
    const isOwnComment = comment.user_id === currentUserId;

    return (
      <li style={{ marginBottom: "10px" }}>
        <div style={{ border: "1px solid #eee", padding: "10px" }}>
          <textarea
            style={{
              border: "none",
              borderBottom: "1px solid #000",
              width: "100%",
              resize: "none",
              fontSize: "14px",
              lineHeight: "10px"
            }}
            value={comment.message}
            margin="dense"
            id="name"
            label="title"
            type="text"
            name="text"
            onChange={this.handleChange}
          />
          <div
            style={{
              marginTop: "20px"
            }}
          >
            {isOwnComment && (
              <>
                <button onClick={this.handleChangePost}>Change comment</button>
                <button onClick={this.deleteComment}>Delete comment</button>
              </>
            )}
          </div>
          <p>{text}</p>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.login.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: id => dispatch(deleteComment(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
