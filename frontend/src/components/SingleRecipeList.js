import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import pic3 from '../images/image-6.jpg';

const StyledImage = styled.img`
  width: 50%;
  height: auto;
  max-width: 550px;
`;

export default function SingleRecipeList() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    async function getRecipe() {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/recipes/${id}`
      );
      setProduct(response.data);
    } catch (err) {
      console.error('Error during api call:', err);
    }
  }
  getRecipe();

  }); 


  return (
    <>
      {product ? (
        <div className="row">
          <div className="col-3">
            <StyledImage
              className="justify-content-center"
              src={pic3}
              alt={product.title}
            />
          </div>
          <div className="col-9">
            <h3>Recept neve : </h3>
            <p>{product.name}</p>
            <h3>Recept leírása : </h3>
            <p>{product.description}</p>
            <h3>Recept Nehézség : </h3>
            <p>{product.level}</p>
            <h3>Recept elkész ideje : </h3>
            <p>{product.preparationTime}</p>

            <h3>Recept kategóriája : </h3>
            {product.categoryList.map((e) => (
              <div> {e.name}</div>
            ))}
            <div className="container">
              <div className="row">
                {product.amountOfIngredientForARecipeList.map((e) => (
                  <div className="col"> {e.name} </div>
                ))}
              </div>
            </div>
            {/*   <p>{product.amountOfIngredientForARecipeList.amount}</p>
            <p>{product.amountOfIngredientForARecipeList.id}</p>
            <p>{product.amountOfIngredientForARecipeList.ingredient}</p>
        */}
        <a class="btn btn-primary" href="/recipes">Vissza</a>

          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  );
}
