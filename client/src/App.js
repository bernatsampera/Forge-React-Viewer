import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  getForgeAccess,
  removeAccess,
  setForgeAccess
} from "./actions/forgeAuthActions";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";

import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Buckets from "./components/buckets/Buckets";
import Bucket from "./components/bucket/Bucket";
import Viewer from "./components/viewer/Viewer";
import CreateBucket from "./components/buckets/CreateBucket";
import Spinner from "./components/common/Spinner";

import "./App.css";

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
    // TODO: Clear current profile
    store.dispatch(getForgeAccess());
  }
} else {
  store.dispatch(getForgeAccess());
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/buckets" component={Buckets} />
              <Route exact path="/bucket/create" component={CreateBucket} />
              <Route path="/bucket/detail/:bucketKey" component={Bucket} />
              <Route path="/viewer/:objectId/:filename" component={Viewer} />
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
