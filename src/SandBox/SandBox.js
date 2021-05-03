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
import ContextDemo from "./ContextDemo";
import "../DataTable/scss/index.scss";
import "./styles.scss";

const SandBox = () => {

  return (
    <Router>

      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">react-datatable</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/demo">Demo Table</Nav.Link>
            <Nav.Link as={Link} to="/context-demo">Context Demo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/demo" exact component={DemoTable} />
        <Route path="/context-demo" exact component={ContextDemo} />
      </Switch>
    </Router>
  );
};

export default SandBox;