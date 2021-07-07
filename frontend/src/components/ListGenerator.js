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
  @media screen and (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

const RecipeCard = styled.div`
  background-color: #c7c7c75b;
  position: relative;
  display: grid;
  grid-template-columns: 300px 600px;
  border-radius: 5px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.356);
  margin-top: 20px;
  margin-bottom: 80px;
  @media screen and (max-width: 576px) {
    grid-template-columns: 150px 200px;
    width: 300px;
    margin-bottom: 80px;
    padding-bottom: 20px;
    flex-direction: column;
    display: flex;
  }
`;

const GreenButton = styled.button`
  position: absolute;
  bottom: -20px;
  right: -20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  background-color: #38a30e;
  color: #fff;
  padding: 22px 45px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.294);
  font-family: 'Charmonman', cursive !important;
  font-weight: 500;
  @media screen and (max-width: 576px) {
    position: sticky;
    border: none;
    outline: none;
    align-items: center;
    background-color: #38a30e;
    color: #fff;
    padding: 11px 22.5px;
    font-size: 1.1rem;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.294);
    font-family: 'Charmonman', cursive !important;
    font-weight: 500;
    align-items: center;
    margin-top: 30px;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  @media screen and (max-width: 576px) {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

const Text = styled.div`
  padding: 40px 40px 0;
`;

const RecipeName = styled.h1`
  color: #28700b;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 576px) {
    font-size: xx-large;
    text-align: center;
    margin-top: 5px;
    margin-bottom: 8px;
    font-weight: 200px;
    color: #28700b;
  }
`;

const Description = styled.p`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoText = styled.div`
  flex-direction: column;
  display: flex;
  margin: 20px 10px 10px;
  color: #28700b;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
`;

const Infos = styled.div`
  display: flex;
`;

const ListGenerator = ({ recips, ingredients }) => {
  return (
    <>
      {recips
        ? recips.map((recipe) => (
            <RecipeCard key={recipe.id}>
              <Image
                src={`/api/image/${recipe.image.id}`}
                alt="Kép a receptről"
              />
              <Text>
                <RecipeName>{recipe.name}</RecipeName>
                <Description>{recipe.description}</Description>
                <Infos>
                  <InfoText>
                    <div className="cardIcon">
                      <IoIosAlarm />
                    </div>
                    {recipe.preparationTime} perc
                  </InfoText>
                  <InfoText>
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
                  </InfoText>
                  {recipe.recommendations !== undefined &&
                  recipe.recommendations !== 0 ? (
                    <InfoText>
                      <div className="cardIcon">
                        <IoHeartSharp />
                      </div>
                      {recipe.recommendations} ajánlás
                    </InfoText>
                  ) : (
                    <InfoText>
                      {' '}
                      <div className="cardIcon">
                        <IoHeartSharp />{' '}
                      </div>
                      0 ajánlás{' '}
                    </InfoText>
                  )}
                </Infos>

                <GreenButton>
                  <StyledLink
                    to={{
                      pathname: `/recipes/${recipe.id}`,
                      state: { ingredient: ingredients },
                    }}
                    key={recipe.id}
                  >
                    Elkészítem !
                  </StyledLink>
                </GreenButton>
              </Text>
            </RecipeCard>
          ))
        : 'Loading...'}
    </>
  );
};

export default ListGenerator;
