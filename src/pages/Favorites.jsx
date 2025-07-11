import React, { useEffect } from 'react';
import { useGlobal } from '../hooks/useGlobalReducer';
import Tarjeta from '../components/Card';

const Favorites = () => {
  const { estado, dispatch } = useGlobal();

  useEffect(() => {
    const cargarFavoritos = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/favorites?user_id=1`);
        if (!resp.ok) throw new Error("Error al obtener favoritos");
        const data = await resp.json();

        const favoritos = [];

        data.personajes?.forEach(p => favoritos.push({ ...p, tipo: "people", detalles: p }));
        data.planetas?.forEach(p => favoritos.push({ ...p, tipo: "planets", detalles: p }));
        data.vehiculos?.forEach(v => favoritos.push({ ...v, tipo: "vehicles", detalles: v }));

        dispatch({ tipo: "SET_FAVORITOS", favoritos });
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    };

    cargarFavoritos();
  }, [dispatch]);

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
