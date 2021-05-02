import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import DemoTable from "./DemoTable";
import '../DataTable/scss/index.scss';

const SandBox = () => {

  return (
    <Router>

      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">react-datatable</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/demo">Demo Table</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/demo" exact component={DemoTable} />
      </Switch>
    </Router>
  );
};

export default SandBox;