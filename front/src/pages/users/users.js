import React, { Component } from "react";

import history from "../../utils/history";

class Users extends Component {
  gotoBack() {
    history.push("/home");
  }

  // async getUsersLogged() {
  //   await axios
  //     .get(`http://localhost:3000/api/users`, this.props.user)
  //     .then(res => {
  //       if (!res.data.error) {
  //         this.props.history.push("/");
  //       }
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  render() {
    return (
      <React.Fragment>
        <h1>Users</h1>
        <button type="button" onClick={() => this.gotoBack()}>
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default Users;
