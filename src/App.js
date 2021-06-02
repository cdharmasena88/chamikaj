import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RunApp from "./components/RunApp";
import Home from "./components/Home";
import RunInstaCaptions from "./components/RunInstaCaptions";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" exact component={RunApp} />
        <Route path="/instagramCaptions" exact component={RunInstaCaptions} />
        <Route path="/productDescriptions" exact component={RunApp} />
      </Switch>
    </Router>
  );
}

export default App;
