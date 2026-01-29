import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./auth";
import { onAuthStateChanged } from "firebase/auth";

function Header() {
  const history = useHistory();
  const [user, setUser] = useState(null);

  /* ----------------------------------------
     Listen to Firebase auth state
  ---------------------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  /* ----------------------------------------
     Logout
  ---------------------------------------- */
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Model Profiles
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {/* Optional: hide Add Model when logged out */}
            {user && (
              <Nav.Link as={Link} to="/add-model">
                Add Model
              </Nav.Link>
            )}
          </Nav>

          {/* -------- Login / Logout button -------- */}
          {user ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              variant="outline-light"
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
