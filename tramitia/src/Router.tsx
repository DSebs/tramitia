import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import PerfilUsuario from './components/PerfilUsuario';
import Premium from './components/Premium';
import Navbar from './components/Navbar';

// Componente simple para pruebas


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/historial" element={
          <>
            <Navbar />
            <div className="pt-20">
              <PerfilUsuario />
            </div>
          </>
        } />
        <Route path="/premium" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Premium />
            </div>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;