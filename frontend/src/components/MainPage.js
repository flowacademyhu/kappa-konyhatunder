import { CardDeck, Card, Container, Row, Col, NavLink } from 'react-bootstrap';
import '../styles/MainPage.css';
import { IoIosAddCircle } from 'react-icons/io';
import { IoIosFunnel } from 'react-icons/io';
import { IoIosEgg } from 'react-icons/io';

function MainPage() {
  return (
    <Container>
      <Row>
        <CardDeck>
          <Col>
            <NavLink href="./AddRecepieForm">
              <Card>
                <Card.Body>
                  <Card.Text className="icon">
                    <IoIosAddCircle />
                  </Card.Text>
                  <Card.Title>ÚJ RECEPT HOZZÁADÁSA</Card.Title>
                </Card.Body>
              </Card>
            </NavLink>
          </Col>

          <Col>
            <NavLink href="./SeachByCriteria">
              <Card>
                <Card.Body href="./AddRecepieForm">
                  <Card.Text className="icon">
                    <IoIosFunnel />
                  </Card.Text>
                  <Card.Title>KERESÉS KRITÉRIUM ALAPJÁN</Card.Title>
                </Card.Body>
              </Card>
            </NavLink>
          </Col>

          <Col>
            <NavLink href="./SearchByIngredient">
              <Card>
                <Card.Body>
                  <Card.Text className="icon">
                    <IoIosEgg />{' '}
                  </Card.Text>
                  <Card.Title>KERESÉS HOZZÁVALÓ ALAPJÁN</Card.Title>
                </Card.Body>
              </Card>
            </NavLink>
          </Col>
        </CardDeck>
      </Row>
    </Container>
  );
}

export default MainPage;
