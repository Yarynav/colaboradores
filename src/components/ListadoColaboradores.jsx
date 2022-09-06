import { Colaborador } from './Colaborador';

export const ListadoColaboradores = ({
  setColaborador,
  eliminarColaborador,
  colaboradoresFiltrados,
}) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {colaboradoresFiltrados && colaboradoresFiltrados.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado colaboradores
          </h2>
          <p className="text-xl mt-5 text-center mb-10">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Colaboradores</span>
          </p>
          {colaboradoresFiltrados.map((colaborador) => (
            <Colaborador
              colaborador={colaborador}
              key={colaborador.id}
              setColaborador={setColaborador}
              eliminarColaborador={eliminarColaborador}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">
            No hay colaboradores
          </h2>
          <p className="text-xl mt-5 text-center mb-10">
            Comienza agregando colaboradores {''}
            <span className="text-indigo-600 font-bold">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </div>
  );
};
