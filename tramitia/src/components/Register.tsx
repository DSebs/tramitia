import React, { useState } from 'react';
import logo from '../assets/branding/tramitiaBannerREC.png';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
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
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.correo, formData.contraseña);
      if (formData.contraseña !== formData.confirmarContraseña) {
        alert('Las contraseñas no coinciden');
        return;
      }
      const user = userCredential.user;
      console.log('Usuario registrado:', user.email);
      navigate('/'); // Redirige al home
    } catch (error) {
      console.error('Error al registrar usuario:', error);
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

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
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
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              placeholder="Digita tu contraseña"
              required
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-3 border-2 bg-white text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero-no-decirlo">Prefiero no decirlo</option>
            </select>
          </div>
        </form>

        {/* Botón de Registro */}
        <div className="max-w-2xl mx-auto mb-6">
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full bg-[#5bb0d4] hover:bg-[#419bc3] text-white py-3 rounded-full font-bold shadow transition-colors"
          >
            Completar Registro
          </button>
        </div>

     

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
