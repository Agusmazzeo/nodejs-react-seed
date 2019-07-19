import React from "react";
import Logo from "./components/logo/logo";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      username: "",
      password: "",
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.goToPage.bind('Home');
  }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
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
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChangeUsername}
            autoComplete="off"
            required
          />
          <input
            className="Input"
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
            required
          />
          <button className="form button" type="submit">
            Sign In
          </button>
        </form>

        <a href="#">Lost your password ?</a>
      </div>
    );
  }
}

export default Login;
