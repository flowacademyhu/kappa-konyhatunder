import { Col, Row, Container } from 'react-bootstrap';
import pic7 from '../images/avocado.jpeg';
import '../styles/SearchResult.css';
import { IoIosAlarm, IoIosPricetags } from 'react-icons/io';
import { IoBarbellSharp } from 'react-icons/io5';

function SearchResult() {
  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          <div class="cont">
            <img src={pic7} alt="Pancake" />
            <div class="cont__text">
              <h1>Caramel Cake Pancakes</h1>
              <div class="cont__text__star">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
              </div>
              <p>
                If you're fan of caramel cake, then you'll love our Caramel Cake
                Pancakes. We Complete these over-the-top pancakes with Caramel
                Syrup.
              </p>
              <div class="cont__text__timing">
                <div class="cont__text__timing_time">
                  <div>
                    <div className="cardIcon">
                      <IoIosAlarm />
                    </div>
                    <div className="time">30 perc</div>
                  </div>
                </div>
                <div class="cont__text__timing_time">
                  <div>
                    <div className="cardIcon">
                      <IoBarbellSharp />
                    </div>
                    <p>Nehéz</p>
                  </div>
                </div>
              </div>
              <button class="btn">
                <i class="fa fa-arrow-right">Elkészítem !</i>
              </button>
            </div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default SearchResult;
