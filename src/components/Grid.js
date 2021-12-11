import React from "react";

const style = {
    default: {
        display: "flex",
        flexDirection: "column"
    }
}

const Grid = (props) => {
  const { children, otherStyle } = props;
  return <div style={{ ...style.default, ...otherStyle }}>{children}</div>;
};

export default Grid;
