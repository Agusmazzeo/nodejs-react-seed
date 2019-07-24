import React, { Component } from "react";

import history from "../../utils/history";

class Users extends Component {
  gotoBack() {
    history.push("/home");
  }

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
