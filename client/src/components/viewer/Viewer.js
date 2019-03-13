import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  convertModel,
  getTreeInfo
} from "../../actions/forgeDerivativeActions";
import Tree from "./Tree";
import Spinner from "../common/Spinner";
import ViewerItem from "./ViewerItem";
import isEmpty from "../../validation/is-empty";

class Viewer extends Component {
  componentDidMount() {
    const { objectId, filename } = this.props.match.params;
    this.props.convertModel(objectId, filename);
    this.props.getTreeInfo(objectId, filename);
  }

  render() {
    const { bucketKey } = this.props.match.params;
    const { urn, objectInfo, loading } = this.props.forgeDerivative;
    let viewerContent;
    let treeContent;

    if (urn === null || loading) {
      viewerContent = <Spinner />;
    } else {
      viewerContent = <ViewerItem urn={urn} />;
    }

    if (objectInfo === null || isEmpty(objectInfo) || loading) {
      treeContent = null; // Spinner not needed due to the already existing Viewer Spinner
    } else {
      const object1 = {
        // Converts array of objects to objects with this array to allow recursive iteration in Tree.js
        objects: objectInfo
      };
      treeContent = <Tree objectInfo={object1} />;
    }

    return (
      <div className="Viewer">
        <div className="text-left pl-5">
          <Link
            to={`/bucket/detail/${bucketKey}`}
            className="btn btn-sm btn-light mb-2 text-left"
          >
            Back To Model
          </Link>
          <h3> Viewer Component </h3>
          {treeContent}
        </div>
        <div>{viewerContent}</div>
      </div>
    );
  }
}

Viewer.propTypes = {
  convertModel: PropTypes.func.isRequired,
  getTreeInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  forgeDerivative: state.forgeDerivative
});

export default connect(
  mapStateToProps,
  { convertModel, getTreeInfo }
)(Viewer);
