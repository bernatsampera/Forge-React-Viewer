import React from "react";
import spinner from "./speed.gif";

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
          height: "calc(100vh - 50px)",
          width: "100vw"
        }}
        alt="Loading..."
      />
    </div>
  );
};
