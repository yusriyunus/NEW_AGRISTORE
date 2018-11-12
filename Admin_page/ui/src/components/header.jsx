import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { onLogOut, categoryOnClick } from "../actioncreators";
import {
  Button,
  Collapse,
  FormGroup,
  Label,
  CustomInput,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Loginpage from "./loginpage";
import Registerpage from "./registerpage";

class Header extends Component {
  state = {
    isOpen: false,
    displayLogin: "none",
    displayRegister: "none",
    categoryOnClick: ""
  };

  componentWillReceiveProps(newProps) {
    if (newProps.auth.error === "" && newProps.auth.username !== "") {
      this.setState({
        displayLogin: "none",
        displayRegister: "none"
      });
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onLogOutClick = () => {
    this.setState({
      displayLogin: "none",
      displayRegister: "none"
    });
    this.props.onLogOut();
  };
  loginClick = x => {
    this.setState({ displayLogin: x });
  };
  registerClick = x => {
    this.setState({ displayRegister: x });
  };
  fnCloseLogin = x => {
    this.setState({ displayLogin: x });
  };
  fnCloseRegister = x => {
    this.setState({ displayRegister: x });
  };

  renderCartList = () => {
    console.log(this.state.cart, "cart");
    return this.state.cart.map((product, index) => {
      return (
        <div key={index} className="d-flex justify-content-center">
          <h3>{product.nama}</h3>
        </div>
      );
    });
  };

  render() {
    // alert("hai");
    if (this.props.auth.username === "") {
      // console.log(this.state.isOpen);
      return (
        <div className="fixed-top" style={{ background: "rgba(6, 71, 6, 1)" }}>
          <div
            id="login"
            style={{
              display: this.state.displayLogin,
              zIndex: "1"
            }}
          >
            <Loginpage display={x => this.fnCloseLogin(x)} />
          </div>
          <div id="register" style={{ display: this.state.displayRegister }}>
            <Registerpage display={x => this.fnCloseRegister(x)} />
          </div>
          <Navbar
            className="d-flex justify-content-center"
            light
            expand="md"
            style={{ margin: 0, height: "60px" }}
          >
            <Nav className="row" href="/" style={{ paddingLeft: "25px" }}>
              <Link to="/">
                <i
                  className="glyphicon glyphicon-grain"
                  style={{ fontSize: "2.5rem", color: "white" }}
                />
                <h1
                  style={{
                    color: "white",
                    margin: 0,
                    display: "inline"
                  }}
                >
                  Agri Store
                </h1>
              </Link>
            </Nav>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem
                  id="loginButton"
                  onClick={() => this.loginClick("flex")}
                >
                  <NavLink>
                    <h3
                      style={{
                        color: "white",
                        cursor: "pointer"
                      }}
                    >
                      Sign In
                    </h3>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <h3
                      style={{
                        border: "1px solid white",
                        height: "25px",
                        width: "1px"
                      }}
                    />
                  </NavLink>
                </NavItem>
                <NavItem
                  id="registerButton"
                  onClick={() => this.registerClick("flex")}
                >
                  <NavLink>
                    <h3 style={{ color: "white", cursor: "pointer" }}>
                      Sign Up
                    </h3>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
    return (
      <div className="fixed-top" style={{ background: "rgba(6, 71, 6, 1)" }}>
        <div
          id="login"
          style={{
            display: this.state.displayLogin,
            zIndex: "1"
          }}
        >
          <Loginpage display={x => this.fnCloseLogin(x)} />
        </div>
        <div id="register" style={{ display: this.state.displayRegister }}>
          <Registerpage display={x => this.fnCloseRegister(x)} />
        </div>
        <Navbar
          className="d-flex justify-content-center"
          light
          expand="md"
          style={{ margin: 0, height: "60px" }}
        >
          <Nav className="row" href="/" style={{ paddingLeft: "25px" }}>
            <Link to="/">
              <i
                className="glyphicon glyphicon-grain"
                style={{ fontSize: "2.5rem", color: "white" }}
              />
              <h1
                style={{
                  color: "white",
                  margin: 0,
                  display: "inline"
                }}
              >
                Agri Store
              </h1>
            </Link>
          </Nav>
          <div
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: 0
            }}
          >
            <Nav className="ml-auto" navbar style={{ margin: 0 }}>
              <NavItem>
                <NavLink>
                  <h3
                    style={{
                      border: "1px solid white",
                      height: "25px",
                      width: "1px"
                    }}
                  />
                </NavLink>
              </NavItem>
              <NavItem id="registerButton">
                <NavLink>
                  <Link to="/transactions">
                    <h3 style={{ color: "white", cursor: "pointer" }}>
                      Transactions
                    </h3>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <h3
                    style={{
                      border: "1px solid white",
                      height: "25px",
                      width: "1px"
                    }}
                  />
                </NavLink>
              </NavItem>
              <NavItem>
                <Collapse
                  isOpen={this.state.isOpen}
                  navbar
                  style={{ padding: 0 }}
                >
                  <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle
                        nav
                        caret
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <h3 style={{ color: "white" }}>Products</h3>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <Link to="/cct">
                          <DropdownItem>
                            <h4>CCT</h4>
                          </DropdownItem>
                        </Link>
                        <DropdownItem divider />
                        <Link to="/fruits">
                          <DropdownItem>
                            <h4>Fruits</h4>
                          </DropdownItem>
                        </Link>
                        <DropdownItem divider />
                        <Link to="/vegetables">
                          <DropdownItem>
                            <h4>Vegetables</h4>
                          </DropdownItem>
                        </Link>
                        <DropdownItem divider />
                        <Link to="/spices">
                          <DropdownItem>
                            <h4>Spices</h4>
                          </DropdownItem>
                        </Link>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </NavItem>
            </Nav>
          </div>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  nav
                  caret
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <h3 style={{ color: "white" }}>
                    Welcome, {this.props.auth.username}
                  </h3>
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/profile">
                    <DropdownItem>
                      <h4>Profile</h4>
                    </DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onLogOutClick}>
                    <h4>Logout</h4>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          <NavbarToggler onClick={this.toggle} />
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = globalState => {
  const { auth, products } = globalState;

  return { auth, products };
};

export default connect(
  mapStateToProps,
  { onLogOut, categoryOnClick }
)(Header);
