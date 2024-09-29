import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import ShowRole from './components/ShowRole';
import CreateRole from './components/CreateRole';
import EditRole from './components/EditRole';

import ShowUser from './components/ShowUser';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

import ShowFuncionario from './components/ShowFuncionario';
import CreateFuncionario from './components/CreateFuncionario';
import EditFuncionario from './components/EditFuncionario';

import ShowEscenarioDeportivo from './components/ShowEscenarioDeportivo';
import CreateEscenarioDeportivo from './components/CreateEscenarioDeportivo';
import EditEscenarioDeportivo from './components/EditEscenarioDeportivo';

import ShowReserva from './components/ShowReserva';
import CreateReserva from './components/CreateReserva';
import EditReserva from './components/EditReserva';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/roles' element={<ShowRole/>}/>
          <Route path='/roles/create' element={<CreateRole/>}/>
          <Route path='/roles/edit/:id' element={<EditRole/>}/>

          <Route path='/users' element={<ShowUser/>}/>
          <Route path='/users/create' element={<CreateUser/>}/>
          <Route path='/users/edit/:id' element={<EditUser/>}/>

          <Route path='/funcionarios' element={<ShowFuncionario/>}/>
          <Route path='/funcionarios/create' element={<CreateFuncionario/>}/>
          <Route path='/funcionarios/edit/:id_fun' element={<EditFuncionario/>} />
          
          <Route path='/escenarios_deportivos'element={<ShowEscenarioDeportivo/>}/>
          <Route path='/escenarios_deportivos/create' element={<CreateEscenarioDeportivo/>} />
          <Route path='/escenarios_deportivos/edit/:id_esc' element={<EditEscenarioDeportivo/>} />

          <Route path='/reservas' element={<ShowReserva/>}/>
          <Route path='/reservas/create' element={<CreateReserva/>}/>
          <Route path='/reservas/edit/:id_res' element={<EditReserva/>} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
