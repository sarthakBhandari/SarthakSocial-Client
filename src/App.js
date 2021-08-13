import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messenger from "./pages/Messenger";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className=" min-h-screen font-josef">
        <Switch>
          <Route exact path="/profile/:username">
            <Profile />
          </Route>
          <Route exact path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/">
            {user ? <Home /> : <Register />}
          </Route>
          <Route exact path="/messenger">
            {!user ? <Register /> : <Messenger />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
