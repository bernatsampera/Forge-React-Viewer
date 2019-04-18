import React, { Component } from "react";
import ViewGrid from "./ViewGrid";
import PropTypes from "prop-types";

export class M2 extends Component {
  render() {
    return (
      <div className="m2-grid" style={{ overflow: "overlay" }}>
        <ViewGrid />
      </div>
    );
  }
}

export default M2;
