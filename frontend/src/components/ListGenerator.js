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
const ListGenerator = ({ recips, ingredients }) => {
  return (
    <div>
      {recips
        ? recips.map((recipe) => (
            <div className="cont" key={recipe.id}>
              <img
                src={`/api/image/${recipe.image.id}`}
                alt="Kép a receptről"
              />
              <div className="cont__text">
                <h1>{recipe.name}</h1>

                <p>{recipe.description}</p>
                <div className="cont__text__timing">
                  <div className="cont__text__timing_time">
                    <div>
                      <div className="cardIcon">
                        <IoIosAlarm />
                      </div>
                      <div className="time">{recipe.preparationTime} perc</div>
                    </div>
                  </div>
                  <div className="cont__text__timing_time">
                    <div>
                      <div className="cardIcon">
                        <IoBarbellSharp />
                      </div>
                      <p>
                        {recipe.difficulty === 'HARD'
                          ? 'Nehéz'
                          : recipe.difficulty === 'MEDIUM'
                          ? 'Közepes'
                          : 'Könnyű'}
                      </p>
                    </div>
                  </div>
                </div>
                {recipe.recommendations !== undefined &&
                recipe.recommendations !== 0 ? (
                  <p className="cardIcon">
                    <IoHeartSharp /> A receptet {recipe.recommendations} ember
                    ajánlja!{' '}
                  </p>
                ) : (
                  ''
                )}
                <button className="btn">
                  <StyledLink
                    to={{
                      pathname: `/recipes/${recipe.id}`,
                      state: { ingredient: ingredients },
                    }}
                    key={recipe.id}
                  >
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
