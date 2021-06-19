import { Row, Col, NavLink } from 'react-bootstrap';
import '../styles/MainPage.css';
import { IoIosAddCircle } from 'react-icons/io';
import { IoIosFunnel } from 'react-icons/io';
import { IoIosEgg } from 'react-icons/io';

function MainPage() {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <NavLink href="add-recipe">
              <button
                type="button"
                className="btn btn-success btn-circle btn-xl
                justify-content-center"
              >
                <div className="menu-icon">
                  <IoIosAddCircle />
                </div>
              </button>
              <div className="menu-describe">RECEPT HOZZÁADÁSA</div>
            </NavLink>
          </Col>
          <Col md="auto">
            <NavLink href="search-by-criteria">
              <button type="button" className="btn btn-success btn-circle btn-xl">
                <div className="menu-icon">
                  <IoIosFunnel />
                </div>
              </button>
            </NavLink>
            <div className="menu-describe">KERESÉS KRITÉRIUM ALAPJÁN</div>
          </Col>
          <Col md="auto">
            <NavLink href="search-by-ingredient">
              <button type="button" className="btn btn-success btn-circle btn-xl">
                <div className="menu-icon">
                  <IoIosEgg />
                </div>
              </button>
            </NavLink>
            <div className="menu-describe">KERESÉS HOZZÁVALÓ ALAPJÁN</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MainPage;
