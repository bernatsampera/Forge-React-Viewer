import React from "react";
import spinner from "./monkey.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          bottom: "0",
          width: "100vw"
        }}
        alt="Loading..."
      />
    </div>
  );
};
