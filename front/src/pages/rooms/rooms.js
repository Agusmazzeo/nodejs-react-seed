import React, { Component } from "react";
import axios from "axios";
import history from "../../utils/history";
import Room from "./room/room";
// import socket from "../../web-socket/webSocketHandler";

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
    };
  }

  handleChange = event => {
    this.setState({
      newRoomName: event.target.value,
    });
  };

  createRoom = () => {
    const componentState = this.state;

    if (componentState.newRoomName) {
      const data = {
        body: { room_name: componentState.newRoomName },
        headers: { authorization: this.props.user._id },
      };
      axios
        .post(`http://localhost:3000/api/rooms/`, data.body, { headers: data.headers })
        .then(res => {
          let auxState = this.state;
          auxState.rooms.push(res.data);
          this.setState(auxState, this.signInRoom(res.data));
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  signInRoom = roomToSignIn => {
    this.props.signInUserToRoom(roomToSignIn);
    axios
      .post(`http://localhost:3000/api/rooms/sign_in/${roomToSignIn._id}`, null, {
        headers: { authorization: this.props.user._id },
      })
      .then(res => {
        this.setState({ rooms: res.data.rooms });
        history.push("/game");
      })
      .catch(e => {
        // console.log(e);
      });
  };

  gotoBack() {
    history.push("/home");
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3000/api/rooms/`)
      .then(res => {
        // console.log(res);
        this.setState({ rooms: res.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const roomsRender = this.state.rooms ? (
      this.state.rooms.map(room => {
        return (
          <button onClick={() => this.signInRoom(room)}>
            <Room roomName={room.name} users={room.users} />
          </button>
        );
      })
    ) : (
      <p>No rooms created</p>
    );
    return (
      <React.Fragment>
        <h1>Rooms</h1>
        <ul>{roomsRender}</ul>

        <input
          type="text"
          name="newRoomName"
          placeholder="Room name"
          value={this.state.newRoomName}
          onChange={this.handleChange}
          autoComplete="off"
          required
        />
        <button type="button" onClick={this.createRoom}>
          Create Room
        </button>

        <button type="button" onClick={() => this.gotoBack()}>
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default Rooms;
