import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Settings from "./Components/Settings";
import Question from "./Components/Question";
import FinalScreen from "./Components/FinalScreen";

function App() {
  console.log(`App()`);
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/">
          <Settings />
        </Route>
        <Route exact path="/questions">
          <Question />
        </Route>
        <Route exact path="/final" render={() => <FinalScreen />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
