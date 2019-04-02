import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { removeAccess, setForgeAccess } from "./actions/forgeAuthActions";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Alerts from "./components/layout/Alerts";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Buckets from "./components/buckets/Buckets";
import Models from "./components/models/Models";
import CreateBucket from "./components/buckets/CreateBucket";
import Spinner from "./components/common/Spinner";
import Login from "./components/auth/Login";
import Main from "./components/main2/Main"; // main/main2 to change between versions

import "./App.css";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

// Check for Forge Token
if (localStorage.access_token) {
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.access_token);
  // Set user in isAuthenticated
  store.dispatch(setForgeAccess(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(removeAccess());
    // Redirect to the login page
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Router>
              <Fragment>
                <Navbar />
                <Alerts />
                <div className="App">
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/buckets" component={Buckets} />
                  <Route exact path="/bucket/create" component={CreateBucket} />
                  <Route
                    exact
                    path="/bucket/detail/:bucketKey"
                    component={Models}
                  />
                  <Route
                    exact
                    path="/bucket/detail/:bucketKey/:objectId/:filename"
                    component={Main}
                  />
                </div>
              </Fragment>
            </Router>
          </AlertProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
