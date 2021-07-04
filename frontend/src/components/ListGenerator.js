import defaultImage from '../images/defaultimage.png';
import '../styles/SearchResult.css';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp, IoHeartSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 0px;
  margin-bottom: 0px;
  font-size: 1.5rem;
`;
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
                      <p>
                        {r.difficulty === 'HARD'
                          ? 'Nehéz'
                          : r.difficulty === 'MEDIUM'
                          ? 'Közepes'
                          : 'Könnyű'}
                      </p>
                    </div>
                  </div>
                </div>
                {r.recommendations !== undefined && r.recommendations !== 0 ? (
                  <p className="cardIcon">
                    <IoHeartSharp /> A receptet {r.recommendations} ember
                    ajánlja!{' '}
                  </p>
                ) : (
                  ''
                )}
                <button className="btn">
                  <StyledLink to={`/recipes/${r.id}`} key={r.id}>
                    Elkészítem !
                  </StyledLink>
                </button>
              </div>
            </div>
          ))
        : 'Loading...'}
    </div>
  );
};

export default ListGenerator;
