
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Añadir importación de Link
import { Alert, Spinner, Card, ListGroup } from 'react-bootstrap';

const Single = () => {
  const { tipo, id } = useParams();
  const [elemento, setElemento] = useState(null);
  const [error, setError] = useState(null);

  
  const tiposImagen = {
    people: 'characters',
    planets: 'planets',
    vehicles: 'vehicles'
  };

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        
        if (!tipo || !id || isNaN(id)) {
        throw new Error('URL inválida');
      }
        
        const respuesta = await fetch(`https://www.swapi.tech/api/${tipo}/${id}`);
        
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
        
        const datos = await respuesta.json();
        
        if (!datos?.result?.properties) {
          throw new Error('Datos no encontrados');
        }

        setElemento(datos.result.properties);
        
      } catch (err) {
        setError(err.message);
      }
    };

    obtenerDetalle();
  }, [tipo, id]);

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">
          <Alert.Heading>¡Error!</Alert.Heading>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">
            ← Volver al inicio
          </Link>
        </Alert>
      </div>
    );
  }

  if (!elemento) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card className="shadow-lg">
        <div className="row g-0">
          <div className="col-md-4 bg-dark p-3">
            <Card.Img
              src={`https://starwars-visualguide.com/assets/img/${tiposImagen[tipo]}/${id}.jpg`}
              alt={elemento.name}
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x800?text=Imagen+no+disponible';
                e.target.className = 'img-fluid';
              }}
            />
          </div>
          
          <div className="col-md-8">
            <Card.Body className="p-4">
              <Card.Title className="display-4 mb-4">{elemento.name}</Card.Title>
              <ListGroup variant="flush">
                {Object.entries(elemento).map(([key, value]) => (
                  key !== 'url' && (
                    <ListGroup.Item 
                      key={key}
                      className="d-flex justify-content-between align-items-center py-3"
                    >
                      <span className="text-capitalize fw-medium">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="text-muted">
                        {value || 'No disponible'}
                      </span>
                    </ListGroup.Item>
                  )
                ))}
              </ListGroup>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Single;
