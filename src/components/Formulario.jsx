import { useState, useEffect } from 'react';
import { Error } from './Error';

export const Formulario = ({
  colaboradores,
  setColaboradores,
  colaborador,
  setColaborador,
}) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [informacion, setInformacion] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState(false);
  //es una forma de comprobar si un objeto tiene algo
  // useEffect(() => {
  //   console.log(Object.keys(colaborador));
  // }, [colaborador]);
  useEffect(() => {
    if (Object.keys(colaborador).length > 0) {
      setNombre(colaborador.nombre);
      setApellido(colaborador.apellido);
      setEmail(colaborador.email);
      setFecha(colaborador.fecha);
      setInformacion(colaborador.informacion);
    }
  }, [colaborador]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(0, 2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const handleSubmit = (e) => {
    //se invoca un preventDefault en el evento al enviar el formulario para evitar que el navegador se vuelva a cargar/actualizar
    e.preventDefault();
    //Validacion del Formulario
    //include: es una funcion del arreglo que me retorna verdadero si este encuentra lo que le estamos pasando como parametro
    if ([nombre, email, fecha, apellido, informacion].includes('')) {
      console.log('Hay Al Menos un campo vacio');
      setError(true);
      return;
    }
    setError(false);
    //Objeto de colaborador
    const objetocolaborador = {
      nombre,
      apellido,
      email,
      fecha,
      informacion,
    };

    //validar el boton de editar
    if (colaborador.id) {
      //editando el registro
      objetocolaborador.id = colaborador.id;
      //** el map recorreo o itera sobre el status de las tarjetas crea una variable temporal llamada colaboradoreStatus cuando identifica que es igual  **//
      //** al colaborador que esta en el formulario entonces retorna el Objeto nuevoque es el que esta en el formulario no en el que esta en la tarjeta **//
      //**  y si no retorna el de STATUS **//
      //vamos a iterar - recorrer
      const colaboradoresActualizado = colaboradores.map((colaboradoreState) =>
        colaboradoreState.id === colaborador.id
          ? objetocolaborador
          : colaboradoreState
      );
      // identificar que registro estamos editando
      // colaborador.id es igual a colaborador.id entoncese retorno objetocolaborador si no retorno colaboradoreState
      setColaboradores(colaboradoresActualizado);
      // limpiamos el STATUS
      setColaborador({});
    } else {
      //Nuevo registro
      //le agregamos al nuevo registro un ID
      objetocolaborador.id = generarId();
      setColaboradores([...colaboradores, objetocolaborador]);
    }

    //Reiniciar el from
    setNombre('');
    setApellido('');
    setEmail('');
    setFecha('');
    setInformacion('');
  };

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">colaborador</h2>
      <p className="text-lg mt-5 text-center mb-10">Añade colaborador</p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {/* reutilizar codigo con props */}
        {/* {error && (
          <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 ">
            <p>Todos los campos son obligatorios</p>
          </div>
        )} */}
        {error && <Error mensaje="Todos los campos son obligatorios" />}
        <div className="mb-7">
          <label
            //este label ocupa el htmlFor para saber a que input esta relacionado
            // por la accesibilidad para enlazar un label con un input
            // el HTMLFOR tiene que ser igual al id del input
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre
          </label>
          <input
            //el id del input tiene que ser igual al HTMLFOR
            id="mascota"
            type="text"
            placeholder="Nombre del colaborador"
            className="border-2 w-full p-2 mt-2 placeholder-gray-600 roun-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-7">
          <label
            // el HTMLFOR tiene que ser igual al id del input
            htmlFor="apellido"
            className="block text-gray-700 uppercase font-bold"
          >
            Apellidos
          </label>
          <input
            //el id del input tiene que ser igual al HTMLFOR
            id="apellido"
            type="text"
            placeholder="Apellidos del colaborador"
            className="border-2 w-full p-2 mt-2 placeholder-gray-600 roun-md"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="mb-7">
          <label
            // el HTMLFOR tiene que ser igual al id del input
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            //el id del input tiene que ser igual al HTMLFOR
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-600 roun-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-7">
          <label
            // el HTMLFOR tiene que ser igual al id del input
            htmlFor="fecha"
            className="block text-gray-700 uppercase font-bold"
          >
            Fecha de Nacimiento
          </label>
          <input
            //el id del input tiene que ser igual al HTMLFOR
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-600 roun-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-7">
          <label
            // el HTMLFOR tiene que ser igual al id del input
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Información del colaborador
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-600 roun-md"
            placeholder="Ingresa la información del colaborador"
            value={informacion}
            onChange={(e) => setInformacion(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer"
          value={colaborador.id ? 'Editar colaborador' : 'Agregar colaborador'}
        />
      </form>
    </div>
  );
};
