import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

const EditRole = () => {
  const [nombreRol, setNombreRol] = useState('');
  const [descRol, setDescRol] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();  // Asegúrate de que esto coincida con la ruta para obtener el ID del rol

  // Función para obtener los datos del rol a editar
  useEffect(() => {
    console.log("ID Rol:", id); // Log para verificar ID

    const getRoleById = async () => {
      try {
        const response = await axios.get(`${endpoint}/roles/${id}`);
        console.log("Datos del rol:", response.data); // Log de respuesta
        setNombreRol(response.data.data.nombre_rol);
        setDescRol(response.data.data.desc_rol);
      } catch (error) {
        console.error("Error al obtener el rol:", error);
        setError(`No se pudo obtener el rol con ID: ${id}. Detalle: ${error.response?.data?.message || error.message}`);
      }
    };
    getRoleById();
  }, [id]);

  // Función para actualizar el rol
  const update = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${endpoint}/roles/${id}`, {
        nombre_rol: nombreRol,
        desc_rol: descRol
      });
      navigate('/roles'); // Redirigir a la lista de roles después de actualizar
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      setError("Error al actualizar el rol.");
    }
  };

  return (
    <div>
      <h3>Edit Role</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={update}>
        <div className='mb-3'>
          <label className='form-label'>Nombre del Rol</label>
          <input
            value={nombreRol}
            onChange={(e) => setNombreRol(e.target.value)}
            type='text'
            className='form-control'
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Descripción del Rol</label>
          <input
            value={descRol}
            onChange={(e) => setDescRol(e.target.value)}
            type='text'
            className='form-control'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditRole;
