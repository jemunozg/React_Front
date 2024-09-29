import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

const CreateFuncionario = () => {
    const [nombre, setNombre] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState('');
    const navigate = useNavigate();

    // Función para obtener la lista de usuarios
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get(`${endpoint}/users`);
            console.log("Usuarios obtenidos:", response.data); // Log de respuesta
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    // Llamar a fetchUsuarios al cargar el componente
    useEffect(() => {
        console.log("Componente montado"); // Log de montaje
        fetchUsuarios();
    }, []);

    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${endpoint}/funcionarios`, {
                nombre_fun: nombre,    
                user_id: selectedUsuario // Se envía el usuario seleccionado
            });
            navigate('/');
        } catch (error) {
            console.error("Error al crear funcionario:", error);
        }
    };

    return (
        <div>
            <h3>Create New Funcionario</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre del Funcionario</label>
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
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type='submit' className='btn btn-success'>
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateFuncionario;
