import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props.forgeAuth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav item">
          <Link className="nav-link" to="/buckets">
            Buckets
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark bg-dark mb-4"
        style={navbarStyle}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const navbarStyle = {
  height: "50px"
};

Navbar.propTypes = {
  forgeAuth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgeAuth: state.forgeAuth
});

export default connect(
  mapStateToProps,
  {}
)(Navbar);
