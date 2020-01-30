import React from "react";

import { parseData } from "../../store/utils";

export default function Comment(props) {
  const { comment } = props;
  const text = parseData("Comment", comment, comment.user_id);
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <p>{text}</p>
      <span>{comment.message}</span>
    </div>
  );
}
