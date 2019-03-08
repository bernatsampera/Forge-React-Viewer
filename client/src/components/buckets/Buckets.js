import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBuckets } from "../../actions/forgeManagementActions";
import BucketItem from "./BucketItem";
import Spinner from "../common/Spinner";

export class Buckets extends Component {
  componentDidMount() {
    if (localStorage.access_token) {
      this.props.getBuckets();
    }
  }

  render() {
    const { buckets, loading } = this.props.forgeManagement;
    let bucketsContent;

    if (buckets === null || loading) {
      bucketsContent = <Spinner />;
    } else {
      // Check if logged forge user has buckets
      if (Object.keys(buckets).length > 0) {
        bucketsContent = (
          <div>
            {buckets.map((bucket, index) => (
              <BucketItem key={index} bucket={bucket} />
            ))}
          </div>
        );
      } else {
        bucketsContent = <h2> There are no buckets created yet </h2>;
      }
    }

    return (
      <div className="buckets">
        <h1> buckets </h1>
        {bucketsContent}
      </div>
    );
  }
}

Buckets.propTypes = {
  getBuckets: PropTypes.func.isRequired,
  forgeManagement: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgeManagement: state.forgeManagement
});

export default connect(
  mapStateToProps,
  { getBuckets }
)(Buckets);
