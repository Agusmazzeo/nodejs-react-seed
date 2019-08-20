import React from "react";
import Logo from "./components/logo/logo";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    /*Consulta a back para verificar usuario*/
    await axios
      .post(`http://localhost:3000/api/lobby/`, this.props.user)
      .then(res => {
        if (!res.data.error) {
          const user = { ...this.props.user };
          user._id = res.data;
          this.props.updateUser(user);
          this.props.history.push("/home");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="Modal">
        <Logo />
        <form onSubmit={this.handleSubmit}>
          <input
            className="Input"
            type="text"
            name="name"
            placeholder="Username"
            value={this.props.user.name}
            onChange={this.props.handleChange}
            autoComplete="off"
            required
          />
          <input
            className="Input"
            type="text"
            name="email"
            placeholder="Email"
            value={this.props.user.email}
            onChange={this.props.handleChange}
            autoComplete="off"
            required
          />
          <input
            className="Input"
            type="number"
            name="age"
            placeholder="Age"
            value={this.props.user.age}
            onChange={this.props.handleChange}
            autoComplete="off"
            required
          />
          <button className="buttonSignIn" type="submit">
            Sign In
          </button>
        </form>

        <a href="#">Lost your password ?</a>
      </div>
    );
  }
}

export default Login;
