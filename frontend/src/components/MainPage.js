import { CardDeck, Card } from 'react-bootstrap';
import '../styles/MainPage.css';
import { IoIosAddCircle } from 'react-icons/io';
import { IoIosFunnel } from 'react-icons/io';
import { IoIosEgg } from 'react-icons/io';
import AddRecepieForm from './AddRecepieForm';

function MainPage() {
  return (
    <CardDeck>
      <Card tag="a" onClick={AddRecepieForm} style={{ cursor: 'pointer' }}>
        <Card.Body>
          <Card.Text className="icon">
            <IoIosAddCircle />
          </Card.Text>
          <Card.Title>RECEPT HOZZÁADÁSA</Card.Title>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Text className="icon">
            <IoIosFunnel />
          </Card.Text>
          <Card.Title>KERESÉS KRITÉRIUM ALAPJÁN</Card.Title>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Text className="icon">
            <IoIosEgg />{' '}
          </Card.Text>
          <Card.Title>KERESÉS HOZZÁVALÓ ALAPJÁN</Card.Title>
        </Card.Body>
      </Card>
    </CardDeck>
  );
}

export default MainPage;
