import { CardDeck, Card } from 'react-bootstrap';
import '../styles/MainPage.css';
import { IoIosAddCircleOutline } from 'react-icons/io';

function MainPage() {
  return (
    <CardDeck>
      <Card>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
          <Card.Title>Card title</Card.Title>
        </Card.Body>
      </Card>
    </CardDeck>
  );
}

export default MainPage;
