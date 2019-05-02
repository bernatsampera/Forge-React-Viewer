import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getActivities,
  runWorkItem,
  getModelInfo
} from "../../../actions/forgeDesignAutomationActions";
import { getModels } from "../../../actions/forgeManagementActions";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";

export class Design extends Component {
  componentDidMount() {
    const { bucketKey } = this.props;

    this.props.getActivities();
    this.props.getModels(bucketKey);
  }

  componentWillReceiveProps(nextProps) {
    const { bucketKey } = this.props;
    const { inRequest } = nextProps.forgeDesignAutomation;
    if (this.props.forgeDesignAutomation.inRequest != inRequest && !inRequest) {
      this.props.getModels(bucketKey);
    }
  }

  runWorkItem(activity) {
    const { bucketKey, filename } = this.props;

    this.props.runWorkItem(activity, bucketKey, filename);
  }

  getModelInfo(objectKey) {
    const { bucketKey } = this.props;

    this.props.getModelInfo(bucketKey, objectKey);
  }

  render() {
    const { activities, modelData } = this.props.forgeDesignAutomation;
    const { models, loading } = this.props.forgeManagement;
    const loading2 = this.props.forgeDesignAutomation.loading;

    let modelsContent;

    if (loading2 || loading || models === null) {
      modelsContent = <Spinner />;
    } else {
      modelsContent = (
        <div className="container txt-models">
          <h2>Models Converted</h2>
          <div className="row">
            <div className="col-8">
              {models
                .filter(model => model.objectKey.indexOf("rvt") == -1)
                .map(model => (
                  <div className="container" key={model.objectId}>
                    <span> {model.objectKey} </span>
                    <button
                      className="btn btn-primary"
                      onClick={this.getModelInfo.bind(this, model.objectKey)}
                    >
                      {" "}
                      info{" "}
                    </button>
                  </div>
                ))}
            </div>
            <div className="col-4">
              {Object.keys(modelData).map(key => (
                <div key={key}>{`${key}: ${modelData[key]}`}</div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1>Design</h1>

        <div className="container activities">
          <h2>Activities</h2>
          {activities.map((activity, id) => (
            <div key={id} className="row border m-4 p-2">
              <span className="text-left col-sm-8">
                {" "}
                {activity.slice(activity.indexOf(".") + 1)}
              </span>
              <button
                onClick={this.runWorkItem.bind(this, activity)}
                className="btn btn-sm btn-dark col-sm-4"
              >
                {" "}
                Run{" "}
              </button>
            </div>
          ))}
        </div>

        {modelsContent}
      </div>
    );
  }
}

Design.propTypes = {
  getActivities: PropTypes.func.isRequired,
  runWorkItem: PropTypes.func.isRequired,
  getModelInfo: PropTypes.func.isRequired,
  bucketKey: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  forgeManagement: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgeDesignAutomation: state.forgeDesignAutomation,
  forgeManagement: state.forgeManagement
});

export default connect(
  mapStateToProps,
  { getActivities, runWorkItem, getModelInfo, getModels }
)(Design);
