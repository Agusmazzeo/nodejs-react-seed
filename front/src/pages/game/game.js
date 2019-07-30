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
      startedGame: false,
    };
  }

  inicializarEstados = () => {
    let estadosCeldas = new Array(this.state.numColumnas * this.state.numFilas);
    for (let i = 0; i < estadosCeldas.length; ++i) {
      estadosCeldas[i] = 0;
    }
    this.setState({ estadosCeldas });
  };

  getArrayIndex = (fila, columna) => {
    return fila * this.state.numColumnas + columna;
  };

  handleGetValue = (fila, columna) => {
    let arrayIndex = this.getArrayIndex(fila, columna);
    let value = this.state.estadosCeldas[arrayIndex];
    return this.state.estadosPosibles[value];
  };

  handleClick = (fila, columna) => {
    let arrayIndex = this.getArrayIndex(fila, columna);
    let nuevoEstado = [...this.state.estadosCeldas];

    if (++nuevoEstado[arrayIndex] > 2) {
      nuevoEstado[arrayIndex] = 0;
    }
    this.setState({ estadosCeldas: nuevoEstado }, () => console.log(this.state.estadosCeldas));
  };

  signOutRoom = roomId => {
    // console.log(roomId);
    axios
      .post(`http://localhost:3000/api/rooms/sign_out/${roomId}`, null, {
        headers: { authorization: this.props.user._id },
      })
      .then(res => {
        // console.log(res);
        history.push("/rooms");
      })
      .catch(e => {
        console.log(e);
      });
  };

  componentDidMount() {
    this.inicializarEstados();

    socket.emit("Join room", this.props.user.logged_room, this.props.user.name);
    socket.on("Joined user", joinedUser => {
      console.log(`${joinedUser} has arrived to the game!`);
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
