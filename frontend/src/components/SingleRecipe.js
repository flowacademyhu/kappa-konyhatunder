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
              product.image !== null && product.image.fileType !== 'abc'
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
                Elkészítési idő : {product.preparationTime} perc
              </h5>
              <p></p>
              <h3>Recept leírása : </h3>
              <div>{product.description}</div>
              <h3>Recept Nehézség : </h3>
              <p>
                {product.difficulty === 'HARD'
                  ? 'Nehéz'
                  : product.difficulty === 'MEDIUM'
                  ? 'Közepes'
                  : 'Könnyű'}
              </p>

              <h3>Recept kategóriája : </h3>
              {product.categories.map((category) => (
                <div key={category.id}> {category.name}</div>
              ))}

              <h3>Recept alapanyagjai : </h3>

              {product.ingredients.map((ingredient) => (
                <>
                  <div key={ingredient.ingredient.name}>
                    <div>
                      {ingredient.ingredient.name} {ingredient.amount}{' '}
                      {translateMeasurementUnits(ingredient.unit)}
                    </div>
                  </div>
                </>
              ))}
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
