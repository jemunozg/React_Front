import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

const CreateEscenarioDeportivo = () => {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);
    const [selectedFuncionario, setSelectedFuncionario] = useState('');
    const navigate = useNavigate();

    // Función para obtener la lista de funcionarios
    const fetchFuncionarios = async () => {
        try {
            const response = await axios.get(`${endpoint}/funcionarios`);
            console.log("Funcionarios obtenidos:", response.data); // Verifica la estructura
            const data = response.data;

            // Verificar si la respuesta es un array, si no lo es, asignar un array vacío
            if (Array.isArray(data)) {
                setFuncionarios(data);
            } else {
                console.error("La respuesta de funcionarios no es un array");
                setFuncionarios([]);
            }
        } catch (error) {
            console.error("Error al obtener funcionarios:", error);
            setFuncionarios([]); // Manejo de error: asegurar que funcionarios sea un array
        }
    };

    // Llamar a fetchFuncionarios al cargar el componente
    useEffect(() => {
        fetchFuncionarios();
    }, []);

    // Función para almacenar el nuevo escenario
    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${endpoint}/escenarios_deportivos`, {
                nombre_esc: nombre, 
                fecha_dis: fecha,    
                id_fun: selectedFuncionario 
            });
            navigate('/escenarios_deportivos'); // Redirigir a la lista de escenarios después de crear
        } catch (error) {
            console.error("Error al crear el escenario deportivo:", error);
        }
    };

    return (
        <div>
            <h3>Crear Nuevo Escenario Deportivo</h3>
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
                    <label className='form-label'>Funcionario</label>
                    <select
                        value={selectedFuncionario}
                        onChange={(e) => setSelectedFuncionario(e.target.value)}
                        className='form-control'
                        required
                    >
                        <option value=''>Selecciona un funcionario</option>
                        {/* Asegúrate de que funcionarios sea un array antes de mapear */}
                        {Array.isArray(funcionarios) && funcionarios.map((funcionario) => (
                            <option key={funcionario.id_fun} value={funcionario.id_fun}>
                                {funcionario.nombre_fun}
                            </option>
                        ))}
                    </select>
                </div>
                <button type='submit' className='btn btn-success'>
                    Crear
                </button>
            </form>
        </div>
    );
};

export default CreateEscenarioDeportivo;
