import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import Login from "./login";
import Home from "./home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
