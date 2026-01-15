import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import NotFound from "./NotFound";
import { Navbar, Nav, Container } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              ModelHub
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Add Profile
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Users} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Header;
