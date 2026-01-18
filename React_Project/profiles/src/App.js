import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Home";
import AddModel from "./AddModel";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Header /> {/* ← Always visible */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add-model" component={AddModel} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
