export const Colaborador = ({
  colaborador,
  setColaborador,
  eliminarColaborador,
}) => {
  //manejar
  const handleEliminar = () => {
    const respuesta = confirm('Deseas Eliminar este colaborador');
    if (respuesta) {
      eliminarColaborador(colaborador.id);
    }
  };
  return (
    <div className="bg-white shadow-md m-3 px-5 py-10 rounded-xl">
      <p className="font-bold mb-3 text-gray-700 uppercase ">
        Nombre:
        <span className="font-normal normal-case"> {colaborador.nombre}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase ">
        Apellidos:
        <span className="font-normal normal-case"> {colaborador.apellido}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase ">
        Correo:
        <span className="font-normal normal-case"> {colaborador.email}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase ">
        Fecha Nacimiento:
        <span className="font-normal normal-case"> {colaborador.fecha}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase ">
        Información del colaborador:
        <span className="font-normal normal-case">
          {' '}
          {colaborador.informacion}
        </span>
      </p>
      <div className=" flex justify-between mt ">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          onClick={() => setColaborador(colaborador)}
        >
          Editar
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={handleEliminar}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
