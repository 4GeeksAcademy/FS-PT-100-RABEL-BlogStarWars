import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Spinner, Row, Col } from 'react-bootstrap';
import { useGlobal } from '../hooks/useGlobalReducer';
import Tarjeta from '../components/Card';

const Home = () => {
  const location = useLocation();
  const tipo = location.pathname.includes("planet")
  ? "planets"
  : location.pathname.includes("vehicle")
  ? "vehicles"
  : "people";


  const { estado, dispatch } = useGlobal();
  
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        dispatch({ tipo: 'SET_CARGANDO', valor: true });

        const respuesta = await fetch(`https://expert-space-enigma-jjqxwggwj9xx2qg46-3000.app.github.dev/${tipo}`);
        const datos = await respuesta.json();

       const elementos = datos.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          tipo: tipo,
          detalles: item,
          swapi_id: item.swapi_id // ⚠️ aquí lo guardas aparte
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

