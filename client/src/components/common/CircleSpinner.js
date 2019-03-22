import React from "react";
import spinner from "./circle.gif";

export default () => {
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        height: "calc(100vh - 50px)",
        width: "100vw"
      }}
    >
      <img
        src={spinner}
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          width: "200px",
          height: "auto",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "auto"
        }}
        alt="Loading..."
      />
    </div>
  );
};
