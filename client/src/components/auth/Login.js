import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getForgeAccess } from "../../actions/forgeAuthActions";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client_id: "",
      client_secret: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { client_id, client_secret } = this.state;

    this.props.getForgeAccess(client_id, client_secret, this.props.history);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className=" my-5">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Sign In using your Forge Application Credentials
                </h5>
                <form className="form-signin" onSubmit={this.onSubmit}>
                  <div className="form-label-group text-left">
                    <label htmlFor="client_id">Client ID</label>
                    <input
                      type="text"
                      id="client_id"
                      className="form-control"
                      placeholder="Client ID"
                      required
                      autoFocus
                      name="client_id"
                      value={this.state.client_id}
                      onChange={this.handleChange}
                    />
                  </div>
                  <br />
                  <div className="form-label-group text-left">
                    <label htmlFor="client_secret">Client Secret</label>
                    <input
                      type="password"
                      id="client_secret"
                      className="form-control"
                      placeholder="Client Secret"
                      required
                      name="client_secret"
                      value={this.state.client_secret}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  getForgeAccess: PropTypes.func.isRequired
};

export default connect(
  null,
  { getForgeAccess }
)(Login);
