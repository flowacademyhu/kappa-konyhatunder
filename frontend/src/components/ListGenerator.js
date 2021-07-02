import defaultImage from '../images/defaultimage.png';
import '../styles/SearchResult.css';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp } from 'react-icons/io5';

const ListGenerator = ({ recips }) => {
  return (
    <div>
      {recips
        ? recips.map((r) => (
            <div className="cont" key={r.id}>
              <img
                src={
                  r.image.fileName === 'defaultImage'
                    ? defaultImage
                    : `/api/image/${r.image.id}`
                }
                alt="Kép a receptről"
              />
              <div className="cont__text">
                <h1>{r.name}</h1>

                <p>{r.description}</p>
                <div className="cont__text__timing">
                  <div className="cont__text__timing_time">
                    <div>
                      <div className="cardIcon">
                        <IoIosAlarm />
                      </div>
                      <div className="time">{r.preparationTime} perc</div>
                    </div>
                  </div>
                  <div className="cont__text__timing_time">
                    <div>
                      <div className="cardIcon">
                        <IoBarbellSharp />
                      </div>
                      <p>{r.difficulty}</p>
                    </div>
                  </div>
                </div>
                <button className="btn">
                  <i className="fa fa-arrow-right">Elkészítem !</i>
                </button>
              </div>
            </div>
          ))
        : 'Loading...'}
    </div>
  );
};

export default ListGenerator;
