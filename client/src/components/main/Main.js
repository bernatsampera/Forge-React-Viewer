import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getTreeInfo,
  convertModel
} from "../../actions/forgeDerivativeActions";
import { selectBudgetItem } from "../../actions/budgetActions";
import ViewGrid from "./viewer/ViewGrid";
import ViewerItem from "./viewer/ViewerItem";
import Budget from "./budget/Budget";
import Tree from "./viewer/Tree";
import CircleSpinner from "../common/CircleSpinner";

import "./main.css";

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: "app",
      viewerLoaded: false
    };

    this.displayApp = this.displayApp.bind(this);
    this.displayViewer = this.displayViewer.bind(this);
    this.loadViewer = this.loadViewer.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
  }

  componentDidMount() {
    const { objectId, filename } = this.props.match.params;
    this.props.convertModel(objectId, filename);
    this.props.getTreeInfo(objectId, filename);
  }

  displayViewer() {
    this.setState({ show: "viewer" });
  }

  displayApp() {
    this.setState({ show: "app" });
  }

  loadViewer() {
    this.setState({
      viewerLoaded: true
    });
  }

  onSelectRow(elem) {
    this.props.selectBudgetItem(elem);
  }

  // Helper Functions
  appButtonStyle = () => ({
    background: this.state.show === "app" ? "#1267f2" : ""
  });

  viewerButtonStyle = () => ({
    background: this.state.show === "viewer" ? "#1267f2" : ""
  });
  // End Helper Functions

  render() {
    const { bucketKey } = this.props.match.params;
    const { show } = this.state;
    const { urn, objectInfo, loading } = this.props.forgeDerivative;
    let mainContent;
    let sidenavContent;
    let displayContent;

    if (objectInfo == null || urn == null || loading) {
      mainContent = <CircleSpinner />;
    } else {
      // Display Applicattion
      if (show === "app") {
        sidenavContent = (
          <ViewGrid onSelectRow={this.onSelectRow} objectInfo={objectInfo} />
        );
        displayContent = <Budget />;
      } else {
        // Display Viewer
        const object1 = {
          // Converts array of objects to objects with this array to allow recursive iteration in Tree.js
          objects: objectInfo
        };
        sidenavContent = <Tree objectInfo={object1} />;
      }

      mainContent = (
        <div className="main">
          <div className="sidenav">
            <div className="toggle-nav">
              <Link
                to={`/bucket/detail/${bucketKey}`}
                className="btn btn-sm btn-dark text-center d-block col-12 align-middle "
              >
                Back To Model
              </Link>
              <button
                className="btn btn-sm toggle-button col-6"
                style={this.appButtonStyle()}
                onClick={this.displayApp}
              >
                {" "}
                App{" "}
              </button>
              <button
                className="btn btn-sm toggle-button col-6"
                style={this.viewerButtonStyle()}
                onClick={this.displayViewer}
              >
                {" "}
                Viewer{" "}
              </button>
            </div>
            <div className="object-info">{sidenavContent}</div>
          </div>
          <div className="content">
            <ViewerItem
              displayViewer={show === "app" ? false : true}
              id="viewer"
              loadViewer={this.loadViewer}
              urn={urn}
            />
            {displayContent}
          </div>
        </div>
      );
    }

    return <div>{mainContent}</div>;
  }
}

Main.propTypes = {
  getTreeInfo: PropTypes.func.isRequired,
  convertModel: PropTypes.func.isRequired,
  selectBudgetItem: PropTypes.func.isRequired,
  forgeDerivative: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgeDerivative: state.forgeDerivative
});

export default connect(
  mapStateToProps,
  { getTreeInfo, convertModel, selectBudgetItem }
)(Main);
