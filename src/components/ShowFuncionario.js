import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';

const ShowFuncionario = () => {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    getAllFuncionarios();
  }, []);

  const getAllFuncionarios = async () => {
    try {
      const response = await axios.get(`${endpoint}/funcionarios`);
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Error fetching funcionarios:', error);
    }
  };

  const deleteFuncionario = async (id_fun) => {
    try {
      await axios.delete(`${endpoint}/funcionarios/${id_fun}`);
      getAllFuncionarios();
    } catch (error) {
      console.error('Error deleting funcionario:', error);
    }
  };

  return (
    <div>
      <div className='d-grid gap-2'>
        <Link to="create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
      </div>

      <table className='table table-striped'>
        <thead className='bg-primary text-white'>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id_fun}>
              <td>{funcionario.id_fun}</td>
              <td>{funcionario.nombre_fun}</td>
              <td>
                {funcionario.user ? (
                  <>
                    {funcionario.user.id} {funcionario.user.name}
                  </>
                ) : (
                  'No asignado'
                )}
              </td>
              <td>
                <Link to={`edit/${funcionario.id_fun}`} className='btn btn-warning'>Edit</Link>
                <button onClick={() => deleteFuncionario(funcionario.id_fun)} className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowFuncionario;
