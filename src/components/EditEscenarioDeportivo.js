import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

const EditEscenarioDeportivo = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id_esc } = useParams();  // Asegúrate de que esto coincida con la ruta

  useEffect(() => {
    const getEscenarioById = async () => {
      try {
        const response = await axios.get(`${endpoint}/escenarios_deportivos/${id_esc}`);
        console.log("Datos del escenario:", response.data); // Log de respuesta
        setNombre(response.data.nombre_esc);
        setFecha(response.data.fecha_dis);
        setFuncionarioId(response.data.id_fun); // Asigna el ID del funcionario directamente
      } catch (error) {
        console.error("Error al obtener el escenario deportivo:", error);
        setError(`No se pudo obtener el escenario deportivo con ID: ${id_esc}. Detalle: ${error.response?.data?.message || error.message}`);
      }
    };
    getEscenarioById();
  }, [id_esc]);

  const update = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${endpoint}/escenarios_deportivos/${id_esc}`, {
        nombre_esc: nombre,
        fecha_dis: fecha,
        id_fun: funcionarioId // Usar el ID ingresado por el usuario
      });
      navigate('/escenarios_deportivos');
    } catch (error) {
      console.error("Error al actualizar el escenario deportivo:", error);
      setError("Error al actualizar el escenario deportivo.");
    }
  };

  return (
    <div>
      <h3>Edit Escenario Deportivo</h3>
      {error && <div className="alert alert-danger">{error}</div>}
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
          <label className='form-label'>Fecha de Disponibilidad</label>
          <input
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            type='date'
            className='form-control'
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>ID del Funcionario</label>
          <input
            value={funcionarioId}
            onChange={(e) => setFuncionarioId(e.target.value)}
            type='text'
            className='form-control'
            required
            placeholder="Escribe el ID del funcionario"
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditEscenarioDeportivo;
