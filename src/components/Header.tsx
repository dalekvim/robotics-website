import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Link to="/" replace>
        <Navbar.Brand>Robotics Club</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about" replace>
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" replace>
            Contact Us
          </Nav.Link>
          <Nav.Link as={Link} to="/comment" replace>
            Comment
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/profile" replace>
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/register" replace>
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/login" replace>
            Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
