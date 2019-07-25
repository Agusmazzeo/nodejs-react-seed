import React, { Component } from "react";
import history from "../../utils/history";
import Layout from "./layout/layout";
import axios from "axios";

class Game extends Component {
  constructor(props) {
    super(props);
  }

  signOutRoom = roomId => {
    console.log(roomId);
    axios
      .post(`http://localhost:3000/api/rooms/sign_out/${roomId}`, null, {
        headers: { authorization: this.props.user._id },
      })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Layout />
        <button
          onClick={() => {
            console.log(this.props.user);
            this.signOutRoom(this.props.user.logged_room);
            history.push("/rooms");
          }}
        >
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default Game;
