import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Perdoor Bus Timings</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;