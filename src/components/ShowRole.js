import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';

const ShowRol = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    try {
      const response = await axios.get(`${endpoint}/roles`);
      setRoles(response.data.roles); // Asegúrate de que la estructura de respuesta sea { roles: [...] }
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  const deleteRol = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este rol?')) {
      try {
        await axios.delete(`${endpoint}/roles/${id}`);
        getAllRoles();
      } catch (error) {
        console.error('Error al eliminar rol:', error);
      }
    }
  };

  return (
    <div>
      <div className='d-grid gap-2'>
        <Link to="create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear Nuevo Rol</Link>
      </div>

      <table className='table table-striped'>
        <thead className='bg-primary text-white'>
          <tr>
            <th>ID</th>
            <th>Nombre del Rol</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((rol) => (
              <tr key={rol.id_rol}>
                <td>{rol.id_rol}</td>
                <td>{rol.nombre_rol}</td>
                <td>{rol.desc_rol || 'Sin descripción'}</td>
                <td>
                  <Link to={`edit/${rol.id_rol}`} className='btn btn-warning'>Editar</Link>
                  <button onClick={() => deleteRol(rol.id_rol)} className='btn btn-danger'>Borrar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className='text-center'>No se encontraron roles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRol;
