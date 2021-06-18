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
          sticky="top"
          expand="mr"
          style={{ margin: '50px' }}
        >
          <img
            src={logo}
            width="120"
            height="80"
            className="d-inline-block align-top"
            alt="logo"
          />
          <Navbar.Brand href="/mainPage">Konyhatündér</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-menu">
              <Button
                variant="success"
                className="navbar-button"
                href="add-recipe"
              >
                Recept hozzáadása
              </Button>
              <Button
                variant="success"
                className="navbar-button"
                href="search-by-criteria"
              >
                Keresés kritérium alapján
              </Button>
              <Button
                variant="success"
                className="navbar-button"
                href="search-by-ingredient"
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
          <Route path="/seach-by-criteria">
            <SearchByCriteria />
          </Route>
          <Route path="/search-by-ingredient">
            <SearchByIngredient />
          </Route>
          <Route path="/add-recipe">
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
