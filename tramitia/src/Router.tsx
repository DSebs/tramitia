import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import LibretaMilitar from './pages/LibretaMilitar';
import RUNT from './pages/RUNT';
import PerfilUsuario from './components/PerfilUsuario';
import Premium from './components/Premium';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';

// Componente simple para pruebas


const Router = () => {
  return (
    <AuthProvider>
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
          <Route path="/tramites/libreta-militar" element={<LibretaMilitar />} />
          <Route path="/tramites/runt" element={<RUNT />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;