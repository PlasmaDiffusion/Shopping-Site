import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Match,
  useParams,
  useHistory,
} from "react-router-dom";

import AuthNav from "./navbar.jsx";
import Profile from "./profile.jsx";
import PrivateRoute from "./private-route.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
        <Switch>
          <Route exact path="/">
            <AuthNav />
          </Route>
          <PrivateRoute exact path="/profile">
            <Profile />
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }
}

export default Home;
