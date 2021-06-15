import logo from './images/konyhatunderlogo.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchByCriteria from './SearchByCriteria';
import SearchByIngredient from './SearchByIngredient';
import AddRecepie from './AddRecepie';
import BodyPart from './BodyPart';
import './NavBar.css';

function NavBar() {
  return (
    <div className="nav-bar">
      <Router>
        <nav
          id="bootstrap-overrides"
          class="navbar navbar-expand-rg navbar-light bg-light"
        >
          <img src={logo} class="navbar-logo" width="130" height="100" alt="" />

          <a class="navbar-brand" href="/">
            Konyhatündér
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
          </div>
        </nav>
        <Switch>
          <Route path="/seach_by_criteria">
            <SearchByCriteria />
          </Route>
          <Route path="/search_by_ingredient">
            <SearchByIngredient />
          </Route>
          <Route path="/add_recepie">
            <AddRecepie />
          </Route>
        </Switch>
      </Router>
      <BodyPart />
    </div>
  );
}

export default NavBar;
