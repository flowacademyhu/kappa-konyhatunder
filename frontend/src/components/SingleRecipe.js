import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import picture from '../images/KonyhatunderDefaultImageWide.png';
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
          <img
            className="border border-dark w-50 mx-auto "
            style={{ gridColumn: 2, gridRow: 1 }}
            src={
              product.image !== null && product.image.fileType !== 'abc'
                ? `/api/image/${product.image.id}`
                : picture
            }
            alt={product.title}
          />
          <div
            style={{ gridColumn: 2, gridRow: 2, textAlign: 'center' }}
            className="d-flex justify-content-center"
          >
            <div key={product.id}>
              <h3>Recept neve : </h3>
              <p>{product.name}</p>
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
              <h3 className="m-2">Recept elkész ideje : </h3>
              <p>{product.preparationTime} perc</p>

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
                      {ingredient.unit}
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
