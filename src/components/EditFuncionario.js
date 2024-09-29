import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

const EditFuncionario = () => {
  const [nombre, setNombre] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState('');
  const navigate = useNavigate();
  const { id_fun } = useParams();

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${endpoint}/funcionarios/create`);
      setUsuarios(response.data.users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();

    const getFuncionarioById = async () => {
      try {
        const response = await axios.get(`${endpoint}/funcionarios/${id_fun}`);
        setNombre(response.data.nombre_fun);
        setSelectedUsuario(response.data.user_id); // Asegúrate que este campo esté presente
      } catch (error) {
        console.error("Error al obtener el funcionario:", error);
      }
    };
    getFuncionarioById();
  }, [id_fun]);

  const update = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${endpoint}/funcionarios/${id_fun}`, {
        nombre_fun: nombre,
        user_id: selectedUsuario
      });
      navigate('/'); // Redirigir después de actualizar
    } catch (error) {
      console.error("Error al actualizar el funcionario:", error);
    }
  };

  return (
    <div>
      <h3>Edit Funcionario</h3>
      <form onSubmit={update}>
        <div className='mb-3'>
          <label className='form-label'>Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type='text'
            className='form-control'
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Usuario</label>
          <select
            value={selectedUsuario}
            onChange={(e) => setSelectedUsuario(e.target.value)}
            className='form-control'
            required
          >
            <option value=''>Selecciona un usuario</option>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.name}
                </option>
              ))
            ) : (
              <option value='' disabled>No hay usuarios disponibles</option>
            )}
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditFuncionario;
