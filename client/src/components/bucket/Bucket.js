import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getModels, uploadModel } from "../../actions/forgeManagementActions";
import ModelItem from "./ModelItem";
import Spinner from "../common/Spinner";

class Bucket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadFile: ""
    };

    this.handleFile = this.handleFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    const { bucketKey } = this.props.match.params;

    this.props.getModels(bucketKey);
  }

  handleFile(e) {
    this.setState({ uploadFile: e.target.files[0] });
  }

  handleUpload() {
    const { bucketKey } = this.props.match.params;

    this.props.uploadModel(this.state.uploadFile, bucketKey);
  }

  render() {
    const { bucketKey } = this.props.match.params;
    const { models, loading } = this.props.forgeManagement;
    let bucketContent;

    if (models === null || loading) {
      bucketContent = <Spinner />;
    } else {
      if (models.length > 0) {
        bucketContent = models.map(model => (
          <ModelItem
            key={model.objectId}
            bucketKey={bucketKey}
            objectKey={model.objectKey}
            objectId={model.objectId}
            size={model.size}
          />
        ));
      } else {
        bucketContent = <p>There are no models available</p>;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <Link to="/buckets" className="btn btn-light mb-3 text-left">
            Back To The List Of Buckets
          </Link>
        </div>

        <h3 className="text-left p-5">
          {" "}
          List of models saved in bucket: {bucketKey}
        </h3>
        {bucketContent}
        <div className="form-group m-5">
          <label htmlFor="uploadModel"> Upload a Model</label>
          <input
            type="file"
            id="uploadModel"
            onChange={this.handleFile}
            placeholder="Upload file..."
          />
          <button className="btn btn-dark" onClick={this.handleUpload}>
            {" "}
            Upload{" "}
          </button>
        </div>
      </div>
    );
  }
}

Bucket.propTypes = {
  getModels: PropTypes.func.isRequired,
  uploadModel: PropTypes.func.isRequired,
  forgeManagement: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgeManagement: state.forgeManagement
});

export default connect(
  mapStateToProps,
  { getModels, uploadModel }
)(Bucket);
