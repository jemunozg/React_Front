//import './App.css';

import './customcss/style.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


import ShowEscenarioDeportivo from './components/ShowEscenarioDeportivo';
import CreateEscenarioDeportivo from './components/CreateEscenarioDeportivo';
import EditEscenarioDeportivo from './components/EditEscenarioDeportivo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/escenarios_deportivos'element={<ShowEscenarioDeportivo/>}/>
          <Route path='/escenarios_deportivos/create' element={<CreateEscenarioDeportivo/>} />
          <Route path='/escenarios_deportivos/edit/:id_esc' element={<EditEscenarioDeportivo/>} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
