import React, { Component } from "react";

class Users extends Component {
  state = { userList: [] };

  componentWillMount() {}

  render() {
    console.log("user");
    return (
      <div style={{ margin: "30vw" }}>
        <h1>anjay</h1>
      </div>
    );
  }
}

export default Users;
