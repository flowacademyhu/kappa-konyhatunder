import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pic from '../images/avocado.jpeg';
import { Link } from 'react-router-dom';
import { getRecipeList } from './apiCalls';
export default function SingleRecipe() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const getInitData = async () => {
      setProduct(await getRecipeList(id));
    };
    getInitData();
  }, [id]);

  return (
    <>
      {product ? (
        <div className="row" key={product.id}>
          <div className="col-3">
            {product.imgage === undefined ? (
              <img
                className="justify-content-center w-100"
                src={pic}
                alt={product.title}
              />
            ) : (
              <img
                className="justify-content-center w-100"
                src={`/api/image/${product.image.id}`}
                alt={product.title}
              />
            )}
          </div>
          <div className="col-9" key={product.id}>
            <h3>Recept neve : </h3>
            <p>{product.name}</p>
            <h3>Recept leírása : </h3>
            <p>{product.description}</p>
            <h3>Recept Nehézség : </h3>
            <p>
              {product.difficulty === 'HARD'
                ? 'Nehéz'
                : product.difficulty === 'MEDIUM'
                ? 'Közepes'
                : 'Könnyű'}
            </p>
            <h3>Recept elkész ideje : </h3>
            <p>{product.preparationTime}</p>

            <h3>Recept kategóriája : </h3>
            {product.categories.map((category) => (
              <div key={category.id}> {category.name}</div>
            ))}

            <h3>Recept alapanyagjai : </h3>

            {product.ingredients.map((ingredient) => (
              <>
                <div className="row" key={ingredient.ingredient.name}>
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
