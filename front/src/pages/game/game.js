import React, { Component } from "react";
import history from "../../utils/history";
import Grilla from "./grilla/grilla";
import classes from "./layout.module.css";
import axios from "axios";
import socket from "../../web-socket/webSocketHandler";
import "../../scss/style.scss";

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
      estadoJuego: 0, //1-playing, 2-win, 3-lost
    };
  }

  inicializarEstados = () => {
    let estadosCeldas = new Array(this.state.numColumnas * this.state.numFilas);
    let estadoJuego = 0;
    let estadosPosibles = [];
    let myTurn = "";
    axios
      .get(`/api/rooms/${this.props.user.logged_room}`)
      .then(res => {
        const room = res.data[0];
        const numFilas = room.game_dimensions.sideY;
        const numColumnas = room.game_dimensions.sideX;

        if (room.owner_id == this.props.user._id) {
          estadosPosibles = [0, 1];
          myTurn = true;
          estadoJuego = 0;

          for (let i = 0; i < estadosCeldas.length; ++i) {
            estadosCeldas[i] = 0;
          }
        } else {
          estadosPosibles = [0, 2];
          myTurn = false;
          estadosCeldas = room.game_state;
          estadoJuego = 1;
        }

        this.setState({ estadosCeldas, numFilas, numColumnas, estadoJuego, myTurn, estadosPosibles });
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
    if (this.state.myTurn == true && this.state.estadoJuego == 1) {
      let arrayIndex = this.getArrayIndex(fila, columna);
      let nuevoEstado = [...this.state.estadosCeldas];

      if (nuevoEstado[arrayIndex] == this.state.estadosPosibles[0]) {
        nuevoEstado[arrayIndex] = this.state.estadosPosibles[1];
      }

      this.setState({ estadosCeldas: nuevoEstado, myTurn: false }, () =>
        socket.emit(
          "Turn played",
          this.props.user._id,
          this.props.user.logged_room,
          this.state.estadosCeldas,
          arrayIndex,
        ),
      );
    }
  };

  signOutRoom = roomId => {
    // console.log(roomId);
    axios
      .post(`/api/rooms/sign_out/${roomId}`, null, {
        headers: { authorization: this.props.user._id },
      })
      .then(res => {
        socket.emit("User disconnected", roomId);
        history.push("/rooms");
      })
      .catch(e => {
        console.log(e);
      });
  };

  componentDidMount() {
    this.inicializarEstados();

    socket.on("Joined user", joinedUser => {
      this.setState({ estadoJuego: 1 });
      console.log(`${joinedUser} has arrived to the game!`);
      console.log("============================");
    });
    socket.on("Turn played", (estadosCeldas, turnoUsuario) => {
      let myTurn = this.props.user._id == turnoUsuario;
      this.setState({ estadosCeldas, myTurn });
    });

    socket.on("Player win", userId => {
      if (userId == this.props.user._id) {
        this.setState({ estadoJuego: 2 });
        console.log("GANASTE");
      } else {
        this.setState({ estadoJuego: 3 });
        console.log("PERDISTE");
      }
    });

    socket.on("User disconnected", () => {
      this.inicializarEstados();
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
          {this.state.estadoJuego == 2 ? <h1>GANASTE</h1> : this.state.estadoJuego == 3 ? <h1>PERDISTE</h1> : null}
          {startedGame ? (
            <button
              className="buttonSignIn"
              onClick={() => {
                this.setState({ startedGame: false });
              }}
            >
              Stop Game
            </button>
          ) : (
            <button className="buttonSignIn" onClick={() => this.setState({ startedGame: true })}>
              Start Game
            </button>
          )}

          <button
            className="buttonSignIn"
            onClick={() => {
              this.signOutRoom(this.props.user.logged_room);
            }}
          >
            Back
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;
