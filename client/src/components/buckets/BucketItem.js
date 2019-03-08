import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

export class BucketItem extends Component {
  render() {
    const { bucket } = this.props;

    return (
      <div className="container" style={bucketStyle}>
        <div className="row">
          <div className="col-lg-10">
            <h6>{bucket.bucketKey}</h6>
            <div className="row">
              <div className="col-sm-6">
                <h6>
                  Created:{" "}
                  {moment(bucket.createdDate).format("YYYY/MM/DD hh:mm:ss")}
                </h6>
              </div>
              <div className="col-sm-6">
                <h6>Policy: {bucket.policyKey}</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <Link
              className="btn btn-primary"
              to={`/bucket/detail/${bucket.bucketKey}`}
            >
              View Bucket
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const bucketStyle = {
  border: "1px solid black",
  padding: "20px 5px",
  margin: "15px auto"
};

BucketItem.propTypes = {
  bucket: PropTypes.object.isRequired
};

export default BucketItem;
