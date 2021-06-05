import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RunApp from "./components/RunApp";
import Home from "./components/Home";
import RunInstaCaptions from "./components/RunInstaCaptions";
import RunEmailSubjectLines from "./components/RunEmailSubjectLines";
import RunFollowUpEmail from "./components/RunFollowUpEmail";
import BulletToPara from "./components/BulletToPara";
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
        <Route
          path="/emailSubjectLines"
          exact
          component={RunEmailSubjectLines}
        />
        <Route path="/followupEmail" exact component={RunFollowUpEmail}></Route>
        <Route
          path="/bulletPointToParagraph"
          exact
          component={BulletToPara}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
