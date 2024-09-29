import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

const CreateEscenarioDeportivo = () => {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [funcionarioId, setFuncionarioId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para almacenar el nuevo escenario
    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${endpoint}/escenarios_deportivos`, {
                nombre_esc: nombre,
                fecha_dis: fecha,
                id_fun: funcionarioId  // Usar el ID ingresado por el usuario
            });
            navigate('/escenarios_deportivos'); // Redirigir a la lista de escenarios después de crear
        } catch (error) {
            console.error("Error al crear el escenario deportivo:", error);
            setError("Error al crear el escenario deportivo.");
        }
    };

    return (
        <div>
            <h3>Crear Nuevo Escenario Deportivo</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={store}>
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
                <button type='submit' className='btn btn-success'>
                    Crear
                </button>
            </form>
        </div>
    );
};

export default CreateEscenarioDeportivo;
