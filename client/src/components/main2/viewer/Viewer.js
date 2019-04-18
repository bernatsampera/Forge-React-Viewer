import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  convertModel,
  getTreeInfo
} from "../../../actions/forgeDerivativeActions";
import Tree from "./Tree";
import Spinner from "../../common/Spinner";
import ViewerItem from "./ViewerItem";
import isEmpty from "../../../validation/is-empty";

class Viewer extends Component {
  render() {
    const { objectInfo, urn } = this.props;
    let viewerContent;
    let treeContent;

    // // Sets the viewer
    // if (urn === null || loading) {
    //   viewerContent = <Spinner />;
    // } else {
    //   viewerContent = ;
    // }

    // // Sets the tree of objects
    // if (objectInfo === null || isEmpty(objectInfo) || loading) {
    //   treeContent = null; // Spinner not needed due to the already existing Viewer Spinner
    // } else {
    //   const object1 = {
    //     // Converts array of objects to objects with this array to allow recursive iteration in Tree.js
    //     objects: objectInfo
    //   };
    //   treeContent = ;
    // }
    const object1 = {
      // Converts array of objects to objects with this array to allow recursive iteration in Tree.js
      objects: objectInfo
    };
    return (
      <div className="Viewer">
        <div className="text-left pl-5">
          <h3> Viewer Component </h3>
          <Tree objectInfo={object1} />
        </div>
        <div>
          <ViewerItem displayViewer={true} id="viewer" urn={urn} />
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  convertModel: PropTypes.func.isRequired,
  getTreeInfo: PropTypes.func.isRequired,
  objectInfo: PropTypes.array.isRequired,
  urn: PropTypes.string.isRequired
};

export default connect(
  null,
  { convertModel, getTreeInfo }
)(Viewer);
