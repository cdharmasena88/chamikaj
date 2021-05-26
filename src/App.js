import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import InsertDesc from "./components/InsertDesc";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" exact component={InsertDesc} />
      </Switch>
    </Router>
  );
}

export default App;
