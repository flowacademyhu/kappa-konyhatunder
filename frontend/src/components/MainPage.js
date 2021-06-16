import { Button, Container, Col, Row, Image } from 'react-bootstrap';
import pic1 from '../images/criteria.png';
import pic2 from '../images/ingredient.jpeg';
import pic3 from '../images/recepies.jpeg';

function MainPage() {
  return (
    <>
      <div>Főoldal</div>
      <Container>
        <Row>
          <Col>
            <Image src={pic3} width="193" height="130" />
            <Button variant="success" href="add_recepie">
              Recept hozzáadása
            </Button>
          </Col>
          <Col>
            <Image src={pic1} width="193" height="130" />
            <Button variant="success" href="seach_by_criteria">
              Keresés kritérium alapján
            </Button>
          </Col>
          <Col>
            <Image src={pic2} width="193" height="130" />
            <Button variant="success" href="search_by_ingredient">
              Keresés hozzávaló alapján
            </Button>
          </Col>
        </Row>
      </Container>

      {`   <Container>
        <Row>
          <Card style={{ margin: '20px' }}>
            <Card.Img
              variant="top"
              src={pic3}
              style={{ width: '20%', margin: '20px' }}
            />
            <Card.Body>
              <Card.Text>
                Egyszerű , de nagyszerű receptek feltöltése!
              </Card.Text>
              <Button variant="primary" size="lg">
                Recept Feltöltés
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ margin: '20px' }}>
            <Card.Img
              variant="top"
              src={pic2}
              style={{ width: '20%', margin: '20px' }}
            />
            <Card.Body>
              <Card.Text>Hozzávaló alapján keresés</Card.Text>
              <Button variant="primary" size="lg">
                Keresés
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ margin: '20px' }}>
            <Card.Img
              variant="top"
              src={pic1}
              style={{ width: '20%', margin: '20px' }}
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Kritérium alapján keresés</Card.Text>
              <Button size="lg" variant="primary">
                Keresés
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>`}
    </>
  );
}

export default MainPage;
