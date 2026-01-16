import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import AddModel from "./AddModel";
import NotFound from "./NotFound";
import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">ModelHub</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile">Add Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={AddModel} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Header;
