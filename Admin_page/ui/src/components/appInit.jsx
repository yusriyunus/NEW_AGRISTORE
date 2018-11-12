import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import "./css/app.css";
import Header from "./header";
import Home from "./home";
import Users from "./users";
import Transactions from "./transactions";
import CCT from "./cct";
import Fruits from "./fruits";
import Vegetables from "./vegetables";
import Spices from "./spices";

class AppInit extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/cct" component={CCT} />
          <Route path="/fruits" component={Fruits} />
          <Route path="/vegetables" component={Vegetables} />
          <Route path="/spices" component={Spices} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = globalState => {
  const auth = globalState.auth;
  return { auth };
};

export default withRouter(connect(mapStateToProps)(AppInit));
