import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import picture from '../images/avocado.jpeg';
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
        <div className="row justify-content-center " key={product.id}>
          <div className="justify-content-center col-8 col-sm-3 m-2">
            <img
              className="border border-dark mt-4 w-100"
              src={product.image ? `/api/image/${product.image.id}` : picture}
              alt={product.title}
            />
          </div>
          <div className="col-8" key={product.id}>
            <h3 className="m-2">Recept neve : </h3>
            <p>{product.name}</p>
            <h3 className="m-2">Recept leírása : </h3>
            <div className="col-9">{product.description}</div>
            <h3 className="m-2">Recept Nehézség : </h3>
            <p>
              {product.difficulty === 'HARD'
                ? 'Nehéz'
                : product.difficulty === 'MEDIUM'
                ? 'Közepes'
                : 'Könnyű'}
            </p>
            <h3 className="m-2">Recept elkész ideje : </h3>
            <p>{product.preparationTime} perc</p>

            <h3 className="m-2">Recept kategóriája : </h3>
            {product.categories.map((category) => (
              <div className="" key={category.id}>
                {' '}
                {category.name}
              </div>
            ))}

            <h3 className="mt-4">Recept alapanyagjai : </h3>

            {product.ingredients.map((ingredient) => (
              <>
                <div className="row mt-2" key={ingredient.ingredient.name}>
                  <div className="col-2">{ingredient.ingredient.name}</div>
                  <div className="col-2">{ingredient.amount}</div>
                  <div className="col-2">{ingredient.unit}</div>
                </div>
              </>
            ))}
            <Link className="btn btn-success mt-4" to="/recipes">
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
