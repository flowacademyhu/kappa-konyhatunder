import { Col, Row, Container } from 'react-bootstrap';
import pic7 from '../images/avocado.jpeg';

function SearchResult() {
  return (
    <div>
      <Row>
        <Col></Col>
        <Col md="auto">
          <div className="card">
            <img className="card-img-top" src={pic7} alt="pic1" />
            <div className="card-body">
              <h5 className="card-title">Italian Carbonara</h5>
              <p className="card-text">
                “Just a handful of ingredients makes a fantastic carbonara and,
                done properly, it’s a thing of beauty. ”
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default SearchResult;
