import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getActivities,
  getWorkItems
} from "../../../actions/forgeDesignAutomationActions";
import PropTypes from "prop-types";

export class Design extends Component {
  getActivities() {
    this.props.getActivities();
  }

  getWorkItems() {
    this.props.getWorkItems();
  }

  render() {
    return (
      <div>
        <h1>Design</h1>
        <button onClick={this.getActivities.bind(this)}>
          {" "}
          Get Activities{" "}
        </button>
        <button onClick={this.getWorkItems.bind(this)}> Get Work Items </button>
      </div>
    );
  }
}

Design.propTypes = {
  getActivities: PropTypes.func.isRequired,
  getWorkItems: PropTypes.func.isRequired
};

export default connect(
  null,
  { getActivities, getWorkItems }
)(Design);
