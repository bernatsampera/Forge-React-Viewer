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
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import isEmpty from "../../validation/is-empty";
import CircleSpinner from "../common/CircleSpinner";

// This component changes the display between the viewer/design/budget pages
export class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { objectId, filename } = this.props.match.params;
    this.props.convertModel(objectId, filename);
    this.props.getTreeInfo(objectId, filename);
  }

  componentWillUnmount() {
    localStorage.removeItem("documentId");
  }

  render() {
    const { bucketKey, filename } = this.props.match.params;
    const { objectInfo, urn, loading } = this.props.forgeDerivative;
    let mainContent;

    if (isEmpty(objectInfo) || loading) {
      mainContent = <CircleSpinner />;
    } else {
      mainContent = (
        <Tabs>
          <TabList>
            <Tab>Budget</Tab>
            <Tab>Viewer</Tab>
            <Tab>Design</Tab>
          </TabList>

          <TabPanel>
            <Budget />
          </TabPanel>
          <TabPanel>
            <Viewer objectInfo={objectInfo} urn={urn} />
          </TabPanel>
          <TabPanel>
            <Design bucketKey={bucketKey} filename={filename} />
          </TabPanel>
        </Tabs>
      );
    }

    return <div>{mainContent}</div>;
  }
}
//TODO: Fix the direct visualization of the M2 since if it is entered directly it generates an error when doing a foreach of something empty
Main.propTypes = {
  convertModel: PropTypes.func.isRequired,
  getTreeInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  forgeDerivative: state.forgeDerivative
});

export default connect(
  mapStateToProps,
  { getTreeInfo, convertModel }
)(Main);
