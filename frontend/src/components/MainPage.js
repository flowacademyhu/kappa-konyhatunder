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
    </>
  );
}

export default MainPage;
