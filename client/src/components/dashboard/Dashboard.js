import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1> Welcome to the dashboard</h1>
        <div className="row">
          <Link to="/buckets" className="btn btn-secondary col-12 m-3">
            Go to buckets
          </Link>
        </div>
        <div className="row">
          <Link to="/bucket/create" className="btn btn-secondary col-12 m-3">
            Create a new bucket
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
