import React, { Component } from "react";
import history from "../../utils/history";
import Grilla from "./grilla/grilla";
import classes from "./layout/layout.module.css";
import axios from "axios";
import socket from "../../web-socket/webSocketHandler";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numGrillas: 1,
      numFilas: 8,
      numColumnas: 8,
      estadosPosibles: [0, 1, 2],
      estadosCeldas: [],
      myTurn: false,
    };
  }

  inicializarEstados = () => {
    let estadosCeldas = new Array(this.state.numColumnas * this.state.numFilas);

    axios
      .get(`http://localhost:3000/api/rooms/${this.props.user.logged_room}`)
      .then(res => {
        const room = res.data[0];
        const numFilas = room.game_dimensions.sideY;
        const numColumnas = room.game_dimensions.sideX;

        if (room.users[room.turn] == this.props.user._id) {
          this.setState({ estadosPosibles: [0, 1], myTurn: true });
        } else {
          this.setState({ estadosPosibles: [0, 2], myTurn: false });
        }

        for (let i = 0; i < estadosCeldas.length; ++i) {
          estadosCeldas[i] = 0;
        }

        this.setState({ estadosCeldas, numFilas, numColumnas });
      })
      .catch(e => {
        console.log(e);
      });
  };

  getArrayIndex = (fila, columna) => {
    return fila * this.state.numColumnas + columna;
  };

  handleGetValue = (fila, columna) => {
    let arrayIndex = this.getArrayIndex(fila, columna);
    let value = this.state.estadosCeldas[arrayIndex];
    return value;
  };

  handleClick = (fila, columna) => {
    if (this.state.myTurn == true) {
      let arrayIndex = this.getArrayIndex(fila, columna);
      let nuevoEstado = [...this.state.estadosCeldas];

      if (nuevoEstado[arrayIndex] == this.state.estadosPosibles[0]) {
        nuevoEstado[arrayIndex] = this.state.estadosPosibles[1];
      }

      this.setState({ estadosCeldas: nuevoEstado, myTurn: false }, () =>
        socket.emit("Turn played", this.props.user._id, this.props.user.logged_room, this.state.estadosCeldas,arrayIndex),
      );
    }
  };

  signOutRoom = roomId => {
    // console.log(roomId);
    axios
      .post(`http://localhost:3000/api/rooms/sign_out/${roomId}`, null, {
        headers: { authorization: this.props.user._id },
      })
      .then(res => {
        console.log(res);
        socket.emit("User disconnected", roomId);
        history.push("/rooms");
      })
      .catch(e => {
        console.log(e);
      });
  };

  userDisconnectHandler() {
    let estadosCeldas = new Array(this.state.numColumnas * this.state.numFilas);

    axios
      .get(`http://localhost:3000/api/rooms/${this.props.user.logged_room}`)
      .then(res => {
        const room = res.data[0];
        if (room.users[room.turn] == this.props.user._id) {
          this.setState({ myTurn: true });
        } else {
          this.setState({ myTurn: false });
        }

        estadosCeldas = room.game_state;

        this.setState({ estadosCeldas });
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.inicializarEstados();

    socket.emit("Join room", this.props.user.logged_room, this.props.user.name);
    socket.on("Joined user", joinedUser => {
      console.log(`${joinedUser} has arrived to the game!`);
    });
    socket.on("Turn played", (estadosCeldas, turnoUsuario) => {
      console.log(turnoUsuario);
      let myTurn = this.props.user._id == turnoUsuario;
      this.setState({ estadosCeldas, myTurn });
    });

    socket.on("User disconnected", () => {
      this.userDisconnectHandler();
    });
  }

  render() {
    let { startedGame } = this.state;
    let grillas = [...Array(this.state.numGrillas)];

    return (
      <React.Fragment>
        <div className={classes.layout}>
          {grillas.map((value, index) => {
            return (
              <Grilla
                key={index}
                numFilas={this.state.numFilas}
                numColumnas={this.state.numColumnas}
                handleClick={this.handleClick}
                handleGetValue={this.handleGetValue}
                getArrayIndex={this.getArrayIndex}
              />
            );
          })}
        </div>
        {startedGame ? (
          <button
            onClick={() => {
              this.setState({ startedGame: false });
            }}
          >
            Stop Game
          </button>
        ) : (
          <button onClick={() => this.setState({ startedGame: true })}>Start Game</button>
        )}

        <button
          onClick={() => {
            this.signOutRoom(this.props.user.logged_room);
          }}
        >
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default Game;
