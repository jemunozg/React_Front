import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

const CreateRole = () => {
    const [nombreRol, setNombreRol] = useState('');
    const [descRol, setDescRol] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para almacenar el nuevo rol
    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${endpoint}/roles`, {
                nombre_rol: nombreRol,
                desc_rol: descRol,
            });
            navigate('/roles'); // Redirigir a la lista de roles después de crear
        } catch (error) {
            console.error("Error al crear el rol:", error);
            setError("Error al crear el rol."); // Manejo del error
        }
    };

    return (
        <div>
            <h3>Crear Nuevo Rol</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={store}>
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
                <button type='submit' className='btn btn-success'>
                    Crear
                </button>
            </form>
        </div>
    );
};

export default CreateRole;
