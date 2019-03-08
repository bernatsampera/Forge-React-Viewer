import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Dashboard extends Component {
  render() {
    const { isAuthenticated } = this.props.forgeAuth;
    let dashboardContent;
    if (isAuthenticated) {
      dashboardContent = (
        <div className="container">
          <h1> Welcome to the dashboard</h1>
          <div className="row">
            <Link to="/buckets" className="btn btn-secondary col-12 m-3">
              Go to buckets
            </Link>
          </div>
          <div className="row">
            <Link to="/bucket/create" className="btn btn-secondary col-12 m-3">
              Create New bucket
            </Link>
          </div>
        </div>
      );
    } else {
      dashboardContent = (
        <div className="container">
          <p className="display-4"> You haven't signed up yet</p>
          <Link to="/login" className="btn btn-dark m-4">
            Login
          </Link>
        </div>
      );
    }

    return <div className="Dashboard">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  forgeAuth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgeAuth: state.forgeAuth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
