import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../hooks/useGlobalReducer';

export const BarraNavegacion = () => {
  const { estado } = useGlobal();

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        <Link to="/" className="navbar-brand h1 mb-0">StarWars DB</Link>
        <div className="d-flex gap-3 align-items-center">
          <Link to="/people" className="btn btn-outline-light btn-sm">Personajes</Link>
          <Link to="/planets" className="btn btn-outline-light btn-sm">Planetas</Link>
          <Link to="/vehicles" className="btn btn-outline-light btn-sm">Vehículos</Link>
          <Link 
            to="/favorites" 
            className="btn btn-warning btn-sm position-relative"
          >
            Favoritos
            {estado.favoritos.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {estado.favoritos.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};