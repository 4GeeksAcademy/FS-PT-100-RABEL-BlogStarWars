import React from 'react';
import { useGlobal } from '../hooks/useGlobalReducer';
import Tarjeta from '../components/Card';

const Favorites = () => {
  const { estado } = useGlobal();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Tus Favoritos ({estado.favoritos.length})</h1>
      {estado.favoritos.length === 0 ? (
        <div className="alert alert-info">
          No has guardado ningún favorito todavía.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {estado.favoritos.map((fav) => (
            <Tarjeta 
              key={`${fav.tipo}-${fav.id}`}
              item={fav}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;