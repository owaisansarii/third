import React from "react";
import Headings from "./mcq/headings";
import MCQ from "./mcq/mcq";
import Navbar from "./mcq/navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Headings} />
          <Route exact path="/mcq/:fileName" component={MCQ} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
