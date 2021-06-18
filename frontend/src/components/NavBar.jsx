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
import MainPageForMobie from './MainPageForMobile';
import SearchByIngredient from './SearchByIngredient';
import AddRecipe from '../pages/AddRecipe';
import BodyPart from '../BodyPart';
import { useMediaQuery } from 'react-responsive';

import { Navbar, Button, Nav, NavLink } from 'react-bootstrap';

function NavBar() {
  const isMobile = useMediaQuery({ query: `(max-width: 576px)` });

  return (
    <>
      <Router>
        <Navbar
          className="color-nav"
          variant="dark"
          expand="mr"
          style={{ margin: '0px 0px 15px 0px' }}
        >
          <NavLink href="MainPage">
            <img
              src={logo}
              width="120"
              height="80"
              className="d-inline-block align-top"
              alt="logo"
            />
          </NavLink>
          <Navbar.Brand className="mr-auto" href="/mainPage">
            Konyhatündér
          </Navbar.Brand>
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
            {isMobile ? <MainPageForMobie /> : <MainPage />}
          </Route>
          <Route path="/search-by-criteria">
            <SearchByCriteria />
          </Route>
          <Route path="/search-by-ingredient">
            <SearchByIngredient />
          </Route>
          <Route path="/add-recipe">
            <AddRecipe />
          </Route>
          <Redirect from="/" to="/mainPage" />
        </Switch>
      </Router>
      <BodyPart />
    </>
  );
}

export default NavBar;
