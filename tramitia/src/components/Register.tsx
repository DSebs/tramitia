import React, { useState } from 'react';
import logo from '../assets/branding/tramitiaBannerREC.png';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    ciudad: '',
    genero: '',
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validar que las contraseñas coincidan
    if (formData.contraseña !== formData.confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    // Validar longitud de contraseña
    if (formData.contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.correo, formData.contraseña);
      
      // Actualizar el perfil del usuario con el nombre
      await updateProfile(userCredential.user, {
        displayName: `${formData.nombre} ${formData.apellidos}`.trim()
      });

      console.log('Usuario registrado:', userCredential.user.email);
      // El AuthProvider manejará la navegación automáticamente
      navigate('/historial');
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      
      // Manejar errores específicos de Firebase
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este correo electrónico ya está registrado');
          break;
        case 'auth/invalid-email':
          setError('El correo electrónico no es válido');
          break;
        case 'auth/weak-password':
          setError('La contraseña es muy débil');
          break;
        default:
          setError('Error al crear la cuenta. Por favor intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-[#eef5fb] to-[#c0e1f9] overflow-auto">
      <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-lg w-full max-w-3xl mx-4">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo Tramitia" className="w-40 mb-2" />
          <p className="text-gray-600 mb-4 text-2xl font-bold font-poppins">Crea tu cuenta</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
          <div>
            <label htmlFor="nombre" className="block text-black mb-2 font-bold font-poppins">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Digita tu nombre"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="apellidos" className="block font-bold font-poppins text-black mb-2">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Digita tus apellidos"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="correo" className="block font-bold font-poppins text-black mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Digita tu correo"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="ciudad" className="block font-bold font-poppins text-black mb-2">Ciudad</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              placeholder="Ciudad de residencia"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="contraseña" className="block font-bold font-poppins text-black mb-2">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Digita tu contraseña (mín. 6 caracteres)"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="confirmarContraseña" className="block font-bold font-poppins text-black mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarContraseña"
              name="confirmarContraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              placeholder="Confirma tu contraseña"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="genero" className="block font-bold font-poppins text-black-800 mb-2">Género</label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero-no-decirlo">Prefiero no decirlo</option>
            </select>
          </div>

          {/* Botón de Registro */}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5bb0d4] hover:bg-[#419bc3] text-white py-3 rounded-full font-bold shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creando cuenta...' : 'Completar Registro'}
            </button>
          </div>
        </form>

        {/* Enlace a Login */}
        <p className="text-sm text-gray-600 max-w-2xl mx-auto text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
