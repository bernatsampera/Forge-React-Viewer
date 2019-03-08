import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteModel } from "../../actions/forgeManagementActions";

export class ModelItem extends Component {
  handleClick(bucketKey, objectKey) {
    this.props.deleteModel(bucketKey, objectKey);
  }

  render() {
    const { objectKey, objectId, size, bucketKey } = this.props;
    return (
      <div className="container border rounded">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <span className="col-lg-6"> ObjectKey: {objectKey}</span>
              <span className="col-lg-6"> Size: {size} bytes</span>
            </div>
          </div>
          <Link
            className="col-md-2 btn btn-dark"
            to={`/viewer/${objectId}`} // ObjectId Format: urn:adsk.objects:os.object:duvgrzriu_tutorial_bucket/rst_basic_sample_project.rvt
            // So it will be splitted in two different params objectid and filename
          >
            View Model
          </Link>
          <button
            className="btn btn-danger col-md-2"
            onClick={this.handleClick.bind(this, bucketKey, objectKey)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

ModelItem.propTypes = {
  deleteModel: PropTypes.func.isRequired,
  objectKey: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  bucketKey: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteModel }
)(ModelItem);
