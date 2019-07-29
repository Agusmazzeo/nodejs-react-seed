import React, { Component } from "react";
import axios from "axios";
import history from "../../utils/history";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  gotoUsers() {
    history.push("/users");
  }

  gotoPosts() {
    history.push("/rooms");
  }

  async logOut() {
    await axios
      .delete(`http://localhost:3000/api/lobby/log_out`, this.props.user)
      .then(res => {
        if (!res.data.error) {
          this.props.history.push("/");
        }
      })
      .catch(e => {
        console.log(e);
      });

    localStorage.clear();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Home</h1>
        <h2>Welcome {this.props.user.name}</h2>

        <button type="button" onClick={() => this.gotoUsers()}>
          Users
        </button>

        <button type="button" onClick={() => this.gotoPosts()}>
          Game Rooms
        </button>

        <button type="button" onClick={() => this.logOut()}>
          Log Out
        </button>
      </React.Fragment>
    );
  }
}

export default Home;
