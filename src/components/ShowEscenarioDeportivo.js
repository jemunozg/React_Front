import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ShowEscenarioDeportivo = () => {
  const [escenariosDeportivos, setEscenariosDeportivos] = useState([])

  useEffect(() => {
    getAllEscenarioDeportivo()
  }, [])

  const getAllEscenarioDeportivo = async () => {
    try {
      const response = await axios.get(`${endpoint}/escenarios_deportivos`)
      setEscenariosDeportivos(response.data) 
    } catch (error) {
      console.error('Error fetching escenarios:', error)
    }
  }

  const deleteEscenarioDeportivo = async (id) => {
    try {
      await axios.delete(`${endpoint}/escenarios_deportivos/${id}`)
      getAllEscenarioDeportivo()
    } catch (error) {
      console.error('Error deleting escenario:', error)
    }
  }

  return (
    <div>
      <div className='d-grid gap-2'>
        <Link to="create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
      </div>

      <table className='table table-striped'>
        <thead className='bg-primary text-white'>
          <tr>
            <th>ID</th>
            <th>Fecha de Disponibilidad</th>
            <th>Nombre</th>
            <th>Funcionario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {escenariosDeportivos.map((escenario) => ( 
            <tr key={escenario.id_esc}>
              <td>{escenario.id_esc}</td>
              <td>{escenario.fecha_dis}</td>
              <td>{escenario.nombre_esc}</td>
              {/* Asegúrate de que funcionario está cargado y muestra su nombre */}
              <td>
                {escenario.funcionario ? (
                  <>
                    {escenario.funcionario.id_fun}  {escenario.funcionario.nombre}
                  </>
                ) : 'No asignado'}
              </td>
              <td>
                <Link to={`edit/${escenario.id_esc}`} className='btn btn-warning'>Edit</Link>
                <button onClick={() => deleteEscenarioDeportivo(escenario.id_esc)} className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShowEscenarioDeportivo;
