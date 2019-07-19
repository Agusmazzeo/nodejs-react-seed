import React, { Component } from "react";
import Login from "./pages/login/login";
import Home from "./pages/home";
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";

import PageUsers from "./pages/users";
import PagePosts from "./pages/posts";

// Main app
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginaActual: "Login",
      paginaPrevia: "",
    };
  }

  goToPage(paginaActual) {
    this.setState({
      paginaPrevia: this.state.paginaActual,
      paginaActual: paginaActual,
    });
    history.push("/home");
  }

  render() {
    return (
      <React.Fragment goToPage>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
