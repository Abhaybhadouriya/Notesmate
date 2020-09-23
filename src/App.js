import React from "react";
import loginpagemain from "./Comps/loginpagemain";
import Home from "./Comps/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={loginpagemain} />
        <Route  component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
