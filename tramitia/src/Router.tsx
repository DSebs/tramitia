import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import LibretaMilitar from './pages/LibretaMilitar';

// Componente simple para pruebas


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tramites/libreta-militar" element={<LibretaMilitar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;