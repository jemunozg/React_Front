import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

const EditEscenarioDeportivo = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id_esc } = useParams();  // Asegúrate de que esto coincida con la ruta

  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get(`${endpoint}/funcionarios`);
      console.log("Funcionarios:", response.data); // Verifica la respuesta
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Error al obtener funcionarios:", error);
      setError("Error al obtener la lista de funcionarios.");
    }
  };

  useEffect(() => {
    console.log("ID Escenario:", id_esc); // Log para verificar ID
    fetchFuncionarios();

    const getEscenarioById = async () => {
      try {
        const response = await axios.get(`${endpoint}/escenarios_deportivos/${id_esc}`);
        console.log("Datos del escenario:", response.data); // Log de respuesta
        setNombre(response.data.nombre_esc);
        setFecha(response.data.fecha_dis);
        setSelectedFuncionario(response.data.id_fun);
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
        id_fun: selectedFuncionario
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
          <label className='form-label'>Funcionario</label>
          <select
            value={selectedFuncionario}
            onChange={(e) => setSelectedFuncionario(e.target.value)}
            className='form-control'
            required
          >
            <option value=''>Selecciona un funcionario</option>
            {Array.isArray(funcionarios) && funcionarios.map((funcionario) => (
              <option key={funcionario.id_fun} value={funcionario.id_fun}>
                {funcionario.nombre_fun}
              </option>
            ))}
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditEscenarioDeportivo;
