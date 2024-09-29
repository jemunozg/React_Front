import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';

const ShowRoles = () => {
  const [roles, setRoles] = useState([]); 
  const [error, setError] = useState('');

  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    try {
      const response = await axios.get(`${endpoint}/roles`);
      console.log('API response:', response.data);
      setRoles(Array.isArray(response.data.data) ? response.data.data : []); 
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Error al obtener la lista de roles.');
    }
  };

  const deleteRole = async (id) => {
    try {
      const response = await axios.delete(`${endpoint}/roles/${id}`);
      console.log("Response after delete:", response.data); // Para depuración
      getAllRoles(); 
    } catch (error) {
      console.error('Error deleting role:', error);
      setError(`Error al eliminar el rol: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <div className='d-grid gap-2'>
        <Link to="create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create Role</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>} 

      <table className='table table-striped'>
        <thead className='bg-primary text-white'>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.nombre_rol}</td>
                <td>{role.desc_rol}</td>
                <td>
                  <Link to={`edit/${role.id}`} className='btn btn-warning'>Edit</Link>
                  <button onClick={() => deleteRole(role.id)} className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No roles found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRoles;
