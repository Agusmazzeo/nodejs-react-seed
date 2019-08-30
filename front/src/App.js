import React from "react";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Rooms from "./pages/rooms/rooms";
import Users from "./pages/users/users";
import Game from "./pages/game/game";
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";

// Main app
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        age: "",
        logged_room: "",
        _id: "",
      },
    };
  }

  handleLoginInputChange = event => {
    let user = { ...this.state.user };
    let name = event.target.name;
    let value = event.target.value;
    user[name] = value;

    this.setState({
      user,
    });
  };

  updateUserWhenLoggedIn = user => {
    this.setState({ user });
    localStorage.setItem("myUser", JSON.stringify(this.state.user));
  };

  signInUserToRoom = room => {
    let user = this.state.user;
    user.logged_room = room._id;
    this.setState(user);
  };

  componentDidMount() {
    try {
      const myUser = JSON.parse(localStorage.getItem("myUser"));

      if (myUser) {
        this.setState({ user: myUser });
      }
    } catch (e) {
      console.log("Error de Localstorage:" + e);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <Login 
                  {...routeProps}
                  handleChange={this.handleLoginInputChange}
                  updateUser={this.updateUserWhenLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route exact path="/home" render={routeProps => <Home {...routeProps} user={this.state.user} />} />
            <Route
              exact
              path="/rooms"
              render={routeProps => (
                <Rooms {...routeProps} user={this.state.user} signInUserToRoom={this.signInUserToRoom} />
              )}
            />
            <Route exact path="/game" render={routeProps => <Game {...routeProps} user={this.state.user} />} />
            <Route exact path="/users" component={Users} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
