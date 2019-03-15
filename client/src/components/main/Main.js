import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTreeInfo } from "../../actions/forgeDerivativeActions";
import ViewGrid from "./ViewGrid";

export class Main extends Component {
  componentDidMount() {
    const { objectId, filename } = this.props.match.params;
    this.props.getTreeInfo(objectId, filename);
  }

  render() {
    const { bucketKey } = this.props.match.params;

    return (
      <div className="container">
        <Link
          to={`/bucket/detail/${bucketKey}`}
          className="btn btn-sm btn-light mb-2 text-left"
        >
          Back To Model
        </Link>
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
