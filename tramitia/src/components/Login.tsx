import React, { useState } from 'react';
import logo from '../assets/branding/tramitiaBannerREC.png'; 
import logoG from '../assets/branding/LogoGoogle.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, provider);
      // El AuthProvider manejará la navegación automáticamente
      navigate('/historial');
    } catch (error) {
      console.error('Error con Google Login:', error);
      setError('Error al iniciar sesión con Google. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // El AuthProvider manejará la navegación automáticamente
      navigate('/historial');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Email o contraseña incorrectos. Por favor verifica tus datos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-[#eef5fb] to-[#c0e1f9] overflow-hidden">
      <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-lg w-full max-w-3xl max-h-[90vh] mx-4 overflow-y-auto flex flex-col justify-between gap-8">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo Tramitia" className="w-60 mb-6" />
          <p className="text-gray-600 italic text-2xl font-bold font-poppins">Inicia Sesión</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-xl mx-auto w-full">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6 max-w-xl mx-auto w-full">
          <div>
            <label htmlFor="email" className="block font-semibold text-black mb-2 font-poppins font-normal">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digita tu correo"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-semibold text-black mb-2 font-poppins font-normal">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digita tu contraseña"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5bb0d4] hover:bg-[#419bc3] text-white py-3 rounded-full font-bold shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-black text-white border border-black rounded-full py-3 text-sm font-bold shadow transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src={logoG}
              alt="Google icon"
              className="w-6 h-6 mr-3"
            />
            {isLoading ? 'Iniciando...' : 'Continuar con Google'}
          </button>
        </form>

        <p className="text-sm text-gray-600 max-w-xl mx-auto text-center">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            ¡Regístrate!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
