import React, { Component } from "react";
import { connect } from "react-redux";
import {
  convertModel,
  getTreeInfo
} from "../../actions/forgeDerivativeActions";
import PropTypes from "prop-types";
import Budget from "./budget/Budget";
import Design from "./design/Design";
import Viewer from "./viewer/Viewer";
import { ViewerItem } from "./viewer/ViewerItem";

// This component changes the display between the viewer/design/budget pages
export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "design"
    };

    this.handleComponent = this.handleComponent.bind(this);
  }

  componentDidMount() {
    const { objectId, filename } = this.props.match.params;
    this.props.convertModel(objectId, filename);
    this.props.getTreeInfo(objectId, filename);
  }
  handleComponent(e) {
    this.setState({ display: e.target.name });
  }

  render() {
    const { bucketKey, filename, objectId } = this.props.match.params;
    const { display } = this.state;
    let mainContent;

    switch (display) {
      case "budget":
        mainContent = <Budget />;
        break;
      case "viewer":
        mainContent = (
          <Viewer
            bucketKey={bucketKey}
            filename={filename}
            objectId={objectId}
          />
        );
        break;
      case "design":
        mainContent = <Design bucketKey={bucketKey} filename={filename} />;
        break;
      default:
        break;
    }

    return (
      <div>
        <div className="buttons-container text-left">
          <button
            name="budget"
            className={`btn btn-dark ${display == "budget" ? "active" : ""}`}
            onClick={this.handleComponent}
          >
            {" "}
            Budget{" "}
          </button>
          <button
            name="viewer"
            className={`btn btn-dark ${display == "viewer" ? "active" : ""}`}
            onClick={this.handleComponent}
          >
            {" "}
            Viewer{" "}
          </button>
          <button
            name="design"
            className={`btn btn-dark ${display == "design" ? "active" : ""}`}
            onClick={this.handleComponent}
          >
            {" "}
            Design{" "}
          </button>
        </div>
        {mainContent}
      </div>
    );
  }
}
//TODO: Fix the direct visualization of the M2 since if it is entered directly it generates an error when doing a foreach of something empty
Main.propTypes = {
  convertModel: PropTypes.func.isRequired,
  getTreeInfo: PropTypes.func.isRequired
};

export default connect(
  null,
  { getTreeInfo, convertModel }
)(Main);
