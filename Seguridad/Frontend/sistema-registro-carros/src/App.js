import './App.css';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import ListTarjetaComponent from './components/Tarjeta/ListTarjetaComponent';
import ListVehiculoComponent from './components/Vehiculo/ListVehiculoComponent';
import GeneralInicioComponent from './components/general/GeneralInicioComponent';
import AddTarjetaComponent from './components/Tarjeta/AddTarjetaComponent';
import AddVehiculoComponent from './components/Vehiculo/AddVehiculoComponent';
import ListTarjetasVehiculosComponent from './components/TargetasVehiculos/ListTarjetasVehiculosComponent';
import AddTarjetasVehiculosComponent from './components/TargetasVehiculos/AddTarjetasVehiculosComponent'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/' element={<GeneralInicioComponent/>} />

          <Route path='/tarjetas' element={<ListTarjetaComponent/>} />
          <Route path='/add-tarjeta' element={<AddTarjetaComponent/>} />
          <Route path='/edit-tarjeta/:id' element={<AddTarjetaComponent/>} />

          <Route path='/vehiculos' element={<ListVehiculoComponent/>} />
          <Route path='/add-vehiculo' element={<AddVehiculoComponent/>} />
          <Route path='/adit-vehiculo/:id' element={<AddVehiculoComponent/>} />

          <Route path='/tarjetasYvehiculos' element={<ListTarjetasVehiculosComponent/>} />
          <Route path='/add-tarjetasYvehiculos' element={<AddTarjetasVehiculosComponent/>} />
          <Route path='/edit-tarjetasYvehiculos/:id' element={<AddTarjetasVehiculosComponent/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
