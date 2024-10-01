import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';

const EditRol = () => {
  const { id } = useParams();
  const [role, setRole] = useState({ nombre_rol: '', desc_rol: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`${endpoint}/roles/${id}`);
        setRole(response.data.role);
      } catch (error) {
        console.error('Error al obtener el rol:', error);
      }
    };
    fetchRole();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${endpoint}/roles/${id}`, role);
      navigate('/roles'); // Redirigir a la lista de roles
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
    }
  };

  return (
    <div>
      <h2>Editar Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Rol</label>
          <input
            type="text"
            className="form-control"
            name="nombre_rol"
            value={role.nombre_rol}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="desc_rol"
            value={role.desc_rol}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar rol</button>
        <Link to="/roles" className="btn btn-secondary ms-2">Cancelar</Link>
      </form>
    </div>
  );
};

export default EditRol;
