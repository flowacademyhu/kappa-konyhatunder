import { CardDeck, Card } from 'react-bootstrap';
import '../styles/MainPage.css';
import { IoIosAddCircle } from 'react-icons/io';
import { IoIosFunnel } from 'react-icons/io';
import { IoIosEgg } from 'react-icons/io';

function MainPage() {
  return (
    <CardDeck>
      <a href="./AddRecepieForm">
        <Card className="MenuCard" style={{ width: '16rem' }}>
          <Card.Body>
            <Card.Text className="icon">
              <IoIosAddCircle />
            </Card.Text>
            <Card.Title>ÚJ RECEPT HOZZÁADÁSA</Card.Title>
          </Card.Body>
        </Card>
      </a>
      <a href="./SearchByCriteria">
        <Card className="MenuCard" style={{ width: '16rem' }}>
          <Card.Body>
            <Card.Text className="icon">
              <IoIosFunnel />
            </Card.Text>
            <Card.Title>KERESÉS KRITÉRIUM ALAPJÁN</Card.Title>
          </Card.Body>
        </Card>
      </a>
      <a href="./SearchByIngredient">
        <Card className="MenuCard" style={{ width: '16rem' }}>
          <Card.Body>
            <Card.Text className="icon">
              <IoIosEgg />{' '}
            </Card.Text>
            <Card.Title>KERESÉS HOZZÁVALÓ ALAPJÁN</Card.Title>
          </Card.Body>
        </Card>
      </a>
    </CardDeck>
  );
}

export default MainPage;
