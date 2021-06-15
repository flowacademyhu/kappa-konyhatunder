import logo from '../images/konyhatunderlogo.png';
import '../styles/App.css';
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
import Carusel from './Carusel';
import {
  Navbar,
  Button,
  Carousel,
  CarouselItem,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from 'react-bootstrap';

function NavBar() {
  return (
    <>
      <Router>
        <Navbar
          className="color-nav"
          variant="dark"
          sticky="top"
          expand="lg"
          style={{ margin: '50px' }}
        >
          <Navbar.Brand href="/mainPage">Főoldal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="add_recepie">Recept hozzáadása</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link href="/seach_by_criteria">
                Keresés kritérium alapján
              </Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link href="search_by_ingredient">
                Keresés hozzávaló alapján
              </Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>

          {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">  
                <a class="nav-link" href="add_recepie">
                  Recept hozzáadása <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="seach_by_criteria">
                  Keresés kritérium alapján{' '}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="search_by_ingredient">
                  Keresés hozzávalók alapján{' '}
                </a>
              </li>
            </ul>
          </div> */}
        </Navbar>
        <Switch>
          <Route path="/mainPage">
            <MainPage />
          </Route>
          <Route path="/seach_by_criteria">
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
