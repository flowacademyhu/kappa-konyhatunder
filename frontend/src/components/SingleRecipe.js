import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import picture from '../images/KonyhatunderDefaultImageWide.png';
import { Link } from 'react-router-dom';
import '../styles/SingleRecipe.css';
import { getRecipeList } from './apiCalls';
import { translateMeasurementUnits } from './translateMeasurementUnits';

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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      {product ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gridTemplateRows: 'auto auto',
            width: '100%',
          }}
          key={product.id}
        >
          <div
            style={{ gridColumn: 2, gridRow: 1, textAlign: 'center' }}
            className="d-flex justify-content-center"
          >
            <h1 className="recipeName">{product.name}</h1>
          </div>
          <img
            className="recipeImage"
            style={{ gridColumn: 2, gridRow: 2 }}
            src={
              product.image.fileType !== 'abc'
                ? `/api/image/${product.image.id}`
                : picture
            }
            alt={product.title}
          />
          <div
            style={{ gridColumn: 2, gridRow: 3, textAlign: 'center' }}
            className="d-flex justify-content-center"
          >
            <div key={product.id}>
              <h5 className="m-2">
                Elkészítési idő: {product.preparationTime} perc
              </h5>
              <h5>
                Nehézségi szint:
                {product.difficulty === 'HARD'
                  ? ' Nehéz'
                  : product.difficulty === 'MEDIUM'
                  ? ' Közepes'
                  : ' Könnyű'}
              </h5>
              <h5>Kategóriák: </h5>
              {product.categories.map((category) => (
                <div key={category.name}>
                  <li> {category.name}</li>{' '}
                </div>
              ))}
              <h5>Hozzávalók: </h5>

              {product.ingredients.map((ingredient) => (
                <>
                  <div key={ingredient.ingredient.name}>
                    <li>
                      {ingredient.ingredient.name} {ingredient.amount}{' '}
                      {translateMeasurementUnits(ingredient.unit)}
                    </li>
                  </div>
                </>
              ))}
              <h5>Elkészítés: </h5>
              <div>{product.description}</div>

              <Link className="btn btn-success mt-4" to="/recipes">
                Vissza
              </Link>
            </div>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
}
