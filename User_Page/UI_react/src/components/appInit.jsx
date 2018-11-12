import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import "./css/app.css";
import Home from "./home";
import Header from "./header";
import Checkout from "./checkout";
import Payment from "./payment";
import Profile from "./profile";

class AppInit extends Component {
  state = {
    margin: { marginLeft: "-400vw", marginTop: "-100vh" }
  };

  pageOnSliding = (marginLeft, marginTop) => {
    const margin = {
      marginLeft: `${marginLeft}vw`,
      marginTop: `${marginTop}vh`
    };
    this.setState({ margin });
  };
  render() {
    return (
      <div>
        <Header pageOnSliding={this.pageOnSliding} />
        <Route
          exact
          path="/"
          render={routeProps => (
            <Home
              margin={this.state.margin}
              pageOnSliding={this.pageOnSliding}
              {...routeProps}
            />
          )}
        />
        <Route path="/profile" component={Profile} />
        <Route
          path="/checkout"
          render={() => <Checkout user={this.props.auth} />}
        />
        <Route path="/payment" component={Payment} />
      </div>
    );
  }
}

const mapStateToProps = globalState => {
  const auth = globalState.auth;
  return { auth };
};

export default withRouter(connect(mapStateToProps)(AppInit));
