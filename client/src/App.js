import React from "react";

import Main from "./components/main";
import Display from "./components/display";
import { Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/display" component={Display} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
}

export default App;
