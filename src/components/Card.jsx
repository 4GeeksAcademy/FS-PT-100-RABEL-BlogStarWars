import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useGlobal } from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';

const Tarjeta = ({ item }) => {
  const { estado, dispatch } = useGlobal();
  const esFavorito = estado.favoritos.some(f => f.id === item.id && f.tipo === item.tipo);

  const tiposImagen = {
    people: 'characters',
    planets: 'planets',
    vehicles: 'vehicles'
  };

  const manejarFavorito = () => {
    dispatch({
      tipo: 'TOGGLE_FAVORITO',
      item: {
        id: item.id,
        tipo: item.tipo,
        nombre: item.nombre,
        detalles: item.detalles
      }
    });
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={`https://starwars-visualguide.com/assets/img/${tiposImagen[item.tipo]}/${item.id}.jpg`}
        onError={(e) => {
          e.target.src = 'https://placehold.co/400x200?text=Imagen+no+disponible';
          e.target.alt = 'Imagen no disponible';
        }}
        alt={`Imagen de ${item.nombre}`}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{item.nombre}</Card.Title>
        <Card.Text>
          {Object.entries(item.detalles)
            .filter(([key]) => !['url', 'created', 'edited'].includes(key))
            .slice(0, 2)
            .map(([key, val]) => (
              <span key={key} className="d-block mb-1"> 
                <strong>{key.replace(/_/g, ' ')}:</strong> {val || 'N/A'}
              </span>
            ))}
        </Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Button 
            variant={esFavorito ? 'warning' : 'outline-secondary'}
            onClick={manejarFavorito}
            size="sm"
          >
            {esFavorito ? '★ Quitar' : '☆ Guardar'}
          </Button>
          <Link
            to={`/${item.tipo}/${item.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            Detalles
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Tarjeta;