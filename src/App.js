//import './App.css';

import './customcss/style.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import ShowEscenarioDeportivo from './components/ShowEscenarioDeportivo';
import CreateEscenarioDeportivo from './components/CreateEscenarioDeportivo';
import EditEscenarioDeportivo from './components/EditEscenarioDeportivo';

import ShowRole from './components/ShowRole';
import CreateRole from './components/CreateRole';
import EditRole from './components/EditRole';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/escenarios_deportivos'element={<ShowEscenarioDeportivo/>}/>
          <Route path='/escenarios_deportivos/create' element={<CreateEscenarioDeportivo/>} />
          <Route path='/escenarios_deportivos/edit/:id_esc' element={<EditEscenarioDeportivo/>} />

          <Route path='/roles' element={<ShowRole/>}/>
          <Route path='/roles/create' element={<CreateRole/>} />
          <Route path='/roles/edit/:id' element={<EditRole/>} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
