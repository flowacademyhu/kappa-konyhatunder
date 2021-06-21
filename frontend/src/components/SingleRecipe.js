import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import pic3 from '../images/image-6.jpg';

const recipeAPI = axios.create({
  baseURL: 'http://localhost:8081/api/',
});

export default function SingleRecipe() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    async function getRecipe() {
      try {
        const response = await recipeAPI.get(
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
            <img
              className="justify-content-center w-100"
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

            <h3>Recept alapanyagjai : </h3>

            {product.amountOfIngredientForARecipeList.map((e) => (
              <>
                <div className="row">
                  <div className="col">{e.ingredient.name}</div>
                  <div className="col">{e.amount}</div>
                  <div className="col">{e.unit}</div>
                </div>
              </>
            ))}
          </div>
          <a class="btn btn-primary" href="/recipes">
            Vissza
          </a>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  );
}
