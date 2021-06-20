import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import pic3 from '../images/image-6.jpg';

const StyledImage = styled.img`
  width: 85%;
  height: auto;
  max-width: 550px;
`;

export default function SingleRecipeList() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/recipes/${id}`
      );
      setProduct(response.data);
    } catch (err) {
      console.error("Error during api call:", err);
    }
  }, [id]);

  return (
    <>
        {product ? (
        <div className="row">
          <div className="col-3">
          <StyledImage src={pic3} alt={product.title} />
          </div>
          <div className="col-9">
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.level}</p>
            <p>{product.preparationTime}</p>
            {product.categoryList.map(e => <div> {e.name}</div>)}
            <div className="container">
            <div className="row">
      {product.amountOfIngredientForARecipeList.map(e => <div className="col"> {e.name} </div>)} 
      </div>
      </div>
         { /*   <p>{product.amountOfIngredientForARecipeList.amount}</p>
            <p>{product.amountOfIngredientForARecipeList.id}</p>
            <p>{product.amountOfIngredientForARecipeList.ingredient}</p>
        */}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
      
    </>
  );

      }