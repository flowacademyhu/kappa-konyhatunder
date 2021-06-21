import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/recipes');
      setProducts(response.data);
    } catch (err) {
      console.error('Error during api call:', err);
    }
  }, []);

  return (
    <ul className="list-group">
      {products
        ? products.map((p) => (
            <Link to={`/products/${p.id}`} key={p.id}>
              <li className="list-group-item list-group-item-action">
                {p.name}
              </li>
            </Link>
          ))
        : 'Loading List...'}
    </ul>
  );
}

export default ProductList;
