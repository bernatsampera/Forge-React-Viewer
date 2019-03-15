import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTreeInfo } from "../../actions/forgeDerivativeActions";
import ViewGrid from "./ViewGrid";

export class Main extends Component {
  componentDidMount() {
    const { objectId, filename } = this.props.match.params;
    this.props.getTreeInfo(objectId, filename);
  }

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

Main.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { getTreeInfo }
)(Main);
