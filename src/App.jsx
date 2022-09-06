import { useState } from 'react';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Formulario } from './components/Formulario';
import { ListadoColaboradores } from './components/ListadoColaboradores';
import { colaboradoresData } from './data/ColaboradoresData';
import { Search } from './components/Search';

function App() {
  const [colaboradores, setColaboradores] = useState(colaboradoresData);
  const [colaboradoresFiltrados, setColaboradoresFiltrados] =
    useState(colaboradores);
  const [colaborador, setColaborador] = useState({});

  //este Effect se recarga una sola vez cuando el componente esta listo, y va a ver si localstorage si hay algo lo va a leer y lo va asignar o setiar a colaborador
  // ya set colaborador no se va encontrar vacio por lo tanto se va ejecutar el segundo de effect
  useEffect(() => {
    const obtenerLS = () => {
      // si no hay nada en local storage se agrega un arreglo vacio
      //con JSON.parse lo pasamos de un string a un arreglo
      const colaboradoresLS =
        JSON.parse(localStorage.getItem('colaboradores')) ?? colaboradoresData;
      setColaboradores(colaboradoresLS);
      setColaboradoresFiltrados(colaboradoresLS);
    };

    obtenerLS();
  }, []);

  useEffect(() => {
    //este effect sincroniza el status con lo que hay en colaboradores
    //va hacer un arreglo por lo tanto lo convertimos en un string con json.stringify
    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
  }, [colaboradores]);

  const eliminarColaborador = (id) => {
    const colaboradoresActualizado = colaboradores.filter(
      (colaborador) => colaborador.id !== id
    );
    setColaboradores(colaboradoresActualizado);
    setColaboradoresFiltrados(colaboradoresActualizado);
  };
  const manejarBusqueda = (textoBusqueda) => {
    if (textoBusqueda.length === 0) {
      setColaboradoresFiltrados(colaboradores);
    } else {
      const busquedaNombre = colaboradores.filter(
        //si nombre esta dentro del colaborador.nombre retorna True
        (colaborador) =>
          colaborador.nombre.indexOf(textoBusqueda) > -1 ||
          colaborador.apellido.indexOf(textoBusqueda) > -1 ||
          colaborador.email.indexOf(textoBusqueda) > -1
      );
      setColaboradoresFiltrados(busquedaNombre);
    }
  };
  return (
    <div className="container mx-auto mt-20">
      <Header />
      <Search manejarBusqueda={manejarBusqueda} />
      <div className="mt-12 flex">
        <Formulario
          colaboradores={colaboradores}
          setColaboradores={setColaboradores}
          colaborador={colaborador}
          setColaborador={setColaborador}
        />
        <ListadoColaboradores
          colaboradoresFiltrados={colaboradoresFiltrados}
          setColaborador={setColaborador}
          eliminarColaborador={eliminarColaborador}
        />
      </div>
    </div>
  );
}

export default App;
