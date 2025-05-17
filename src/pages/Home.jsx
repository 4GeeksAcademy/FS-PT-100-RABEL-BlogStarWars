
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Row, Col } from 'react-bootstrap';
import { useGlobal } from '../hooks/useGlobalReducer';
import Tarjeta from '../components/Card';

const Home = () => {
  const { tipo = "people" } = useParams();
  const { estado, dispatch } = useGlobal();
  
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        dispatch({ tipo: 'SET_CARGANDO', valor: true });
        
        const respuesta = await fetch(`https://www.swapi.tech/api/${tipo}`);
        const { results } = await respuesta.json();
        
        const datos = await Promise.all(
          results.map(async item => {
            const detalle = await fetch(item.url);
            return detalle.json();
          })
        );
        
        const elementos = datos.map(({ result }) => ({
          id: result.uid,
          nombre: result.properties.name,
          tipo: tipo,
          detalles: result.properties
        }));
        
        dispatch({ tipo: 'SET_CARGANDO', valor: false });
        dispatch({ tipo: 'SET_ELEMENTOS', elementos });
        
      } catch (error) {
        console.error("Error:", error);
        dispatch({ tipo: 'SET_CARGANDO', valor: false });
      }
    };
    
    obtenerDatos();
  }, [tipo, dispatch]);

  if (estado.cargando) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando datos de la galaxia...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-uppercase">{tipo}</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {estado.elementos?.map(item => (
          <Col key={`${tipo}-${item.id}`}>
            <Tarjeta item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
