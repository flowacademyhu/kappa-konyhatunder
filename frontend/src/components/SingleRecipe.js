import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SingleRecipe() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    async function getRecipe() {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (err) {
        console.error('Error during api call:', err);
      }
    }
    getRecipe();
  }, [id]);

  return (
    <>
      {product ? (
        <div className="row" key={product.id}>
          <div className="col-3">
            <img
              className="justify-content-center w-100"
              src={`http://localhost:8081/api/image/${product.image.id}`}
              alt={product.title}
            />
          </div>
          <div className="col-9" key={product.id}>
            <h3>Recept neve : {console.log(product)} </h3>
            <p>{product.name}</p>
            <h3>Recept leírása : </h3>
            <p>{product.description}</p>
            <h3>Recept Nehézség : </h3>
            <p>{product.level}</p>
            <h3>Recept elkész ideje : </h3>
            <p>{product.preparationTime}</p>

            <h3>Recept kategóriája : </h3>
            {product.categories.map((category) => (
              <div key={category.id}> {category.name}</div>
            ))}

            <h3>Recept alapanyagjai : </h3>

            {product.ingredients.map((ingredient) => (
              <>
                <div className="row" key={ingredient.id}>
                  <div className="col">{ingredient.ingredient.name}</div>
                  <div className="col">{ingredient.amount}</div>
                  <div className="col">{ingredient.unit}</div>
                </div>
              </>
            ))}
            <Link className="btn btn-primary" to="/recipes">
              Vissza
            </Link>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  );
}
