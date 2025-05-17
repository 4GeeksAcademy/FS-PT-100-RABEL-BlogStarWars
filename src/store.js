const getState = () => ({
  store: {
    favoritos: JSON.parse(localStorage.getItem("swFavoritos")) || [],
    cargando: false
  },
  actions: {
    toggleFavorito: (item, tipo) => {
      const currentState = JSON.parse(localStorage.getItem("swFavoritos")) || [];
      const existe = currentState.some(fav => fav.url === item.url);
      
      const nuevosFavoritos = existe 
        ? currentState.filter(fav => fav.url !== item.url) 
        : [...currentState, { ...item, tipo }];
      
      localStorage.setItem("swFavoritos", JSON.stringify(nuevosFavoritos));
      return { favoritos: nuevosFavoritos };
    },
    setCargando: (estado) => ({ cargando: estado })
  }
});

export default getState;


