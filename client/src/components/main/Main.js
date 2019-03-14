import React, { Component } from "react";
import ViewGrid from "./ViewGrid";

export class Main extends Component {
  render() {
    return (
      <div className="container">
        <h1> Main </h1>

        <div className="col-md-10">
          <ViewGrid />
        </div>
      </div>
    );
  }
}

export default Main;
