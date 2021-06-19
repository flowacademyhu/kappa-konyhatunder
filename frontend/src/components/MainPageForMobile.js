import { Button, Container, Row, Col } from 'react-bootstrap';
import { IoIosAddCircle } from 'react-icons/io';
import { IoIosFunnel } from 'react-icons/io';
import { IoIosEgg } from 'react-icons/io';
import '../styles/MainPage.css';

function MainPageForMobile() {
  return (
    <Container className="mobile-menu">
      <Row className="justify-content-md-center">
        <Col>
          <Button
            variant="secondary"
            className="button ButtonGroup"
            size="lg"
            block
            href="add-recipe"
          >
            <div className="icon-mobile" href="main-page">
              <IoIosAddCircle />{' '}
            </div>
            RECEPT HOZZÁADÁSA
          </Button>
          <Button
            variant="secondary"
            className="button ButtonGroup"
            block
            size="lg"
            href="search-by-criteria"
          >
            {' '}
            <div className="icon-mobile">
              <IoIosFunnel />{' '}
            </div>
            KERESÉS KRITÉRIUM ALAPJÁN
          </Button>
          <Button
            variant="secondary"
            className="button ButtonGroup"
            block
            size="lg"
            href="search-by-ingredient"
          >
            <div className="icon-mobile">
              <IoIosEgg />
            </div>
            KERESÉS HOZZÁVALÓ ALAPJÁN
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MainPageForMobile;
