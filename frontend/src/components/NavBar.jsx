import '../styles/App.css';
import '../styles/NavBar.css';
import logo from '../images/konyhatunderlogo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SearchByCriteria from './SearchByCriteria';
import MainPage from './MainPage';
import SearchByIngredient from './SearchByIngredient';
import AddRecepie from '../pages/AddRecepie';
import BodyPart from '../BodyPart';

import { Navbar, Button, Nav } from 'react-bootstrap';

function NavBar() {
  return (
    <>
      <Router>
        <Navbar
          className="color-nav"
          variant="dark"
          expand="mr"
          style={{ margin: '0px 0px 50px 0px' }}
        >
          <img
            src={logo}
            width="120"
            height="80"
            className="d-inline-block align-top"
            alt="logo"
          />
          <Navbar.Brand className="mr-auto" href="/mainPage">
            Konyhatündér
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-menu">
              <Button
                variant="success"
                className="navbar-button"
                href="add_recepie"
              >
                Recept hozzáadása
              </Button>
              <Button
                variant="success"
                className="navbar-button"
                href="search_by_criteria"
              >
                Keresés kritérium alapján
              </Button>
              <Button
                variant="success"
                className="navbar-button"
                href="search_by_ingredient"
              >
                Keresés hozzávaló alapján
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/mainPage">
            <MainPage />
          </Route>
          <Route path="/search_by_criteria">
            <SearchByCriteria />
          </Route>
          <Route path="/search_by_ingredient">
            <SearchByIngredient />
          </Route>
          <Route path="/add_recepie">
            <AddRecepie />
          </Route>
          <Redirect from="/" to="/mainPage" />
        </Switch>
      </Router>
      <BodyPart />
    </>
  );
}

export default NavBar;
