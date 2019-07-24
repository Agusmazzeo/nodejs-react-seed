import React, { Component } from "react";

import history from "../../utils/history";
import Room from "./room/room";

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [
        {
          roomName: "Cuarto 1",
          users: ["Pedro", "Juan"],
        },
        {
          roomName: "Cuarto 2",
          users: ["Jorge", "Pipo"],
        },
      ],
    };
  }

  gotoBack() {
    history.push("/home");
  }

  render() {
    const roomsRender = this.state.rooms.map(room => {
      return (
        <li>
          <Room roomName={room.roomName} users={room.users} />
        </li>
      );
    });
    return (
      <React.Fragment>
        <h1>Rooms</h1>
        <ul>{roomsRender}</ul>
        <button type="button" onClick={() => this.gotoBack()}>
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default Rooms;
