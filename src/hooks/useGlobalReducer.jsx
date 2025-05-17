import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

const estadoInicial = {
  cargando: false,
  favoritos: [],
  elementos: []
};

const reducer = (state, action) => {
  switch (action.tipo) {
    case 'TOGGLE_FAVORITO':
      const existe = state.favoritos.some(fav => 
        fav.id === action.item.id && fav.tipo === action.item.tipo
      );
      
      return {
        ...state,
        favoritos: existe
          ? state.favoritos.filter(fav => 
              fav.id !== action.item.id || fav.tipo !== action.item.tipo
            )
          : [...state.favoritos, action.item]
      };

    case 'SET_CARGANDO':
      return { ...state, cargando: action.valor };

    case 'SET_ELEMENTOS':
      return { ...state, elementos: action.elementos };

    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  return (
    <GlobalContext.Provider value={{ estado: state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("Usar dentro de GlobalProvider");
  return context;
};