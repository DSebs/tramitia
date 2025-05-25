import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tramitiaLogo from '../assets/branding/tramitiaBannerREC.png';
import { useAuth } from '../contexts/AuthContext';

const Premium = () => {
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { currentUser, upgradeToPremium } = useAuth();

  const beneficios = [
    'Acceso a la información de todos los trámites',
    'Asistente de diagnóstico con ruta personalizada',
    'Gestor de carpetas y checklist para documentos y formularios',
    'Configuración de recordatorios y alertas para fechas críticas'
  ];

  const handleContinue = () => {
    if (email || currentUser?.email) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = async (confirmed: boolean) => {
    if (confirmed) {
      setIsProcessing(true);
      try {
        const success = await upgradeToPremium();
        if (success) {
          // Redirigir al historial después de un upgrade exitoso
          navigate('/historial');
        } else {
          alert('Hubo un error al procesar tu suscripción. Por favor intenta de nuevo.');
        }
      } catch (error) {
        console.error('Error upgrading to premium:', error);
        alert('Hubo un error al procesar tu suscripción. Por favor intenta de nuevo.');
      } finally {
        setIsProcessing(false);
        setShowConfirmation(false);
      }
    } else {
      setShowConfirmation(false);
    }
  };

  // Pre-llenar el email si el usuario está autenticado
  const displayEmail = currentUser?.email || email;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#32A5DD]/20 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Logo principal como banner dominante */}
      <div className="w-full max-w-6xl mb-12 flex justify-center">
        <img src={tramitiaLogo} alt="Tramitia" className="h-32 md:h-40 lg:h-48 w-auto object-contain" />
      </div>
      
      <div className="w-full max-w-5xl bg-white rounded-lg border border-[#32A5DD]/20 overflow-hidden">
        {/* Título */}
        <div className="w-full border-b border-[#32A5DD]/20 p-4">
          <h3 className="text-[#2C3E50] text-lg">
            Con nuestro plan premium podrás disfrutar de los siguientes beneficios
          </h3>
        </div>

        {/* Contenido principal */}
        <div className="p-8">
          {/* Beneficios y precio */}
          <div className="flex justify-between items-start mb-8">
            {/* Lista de beneficios */}
            <ul className="space-y-4 flex-1 max-w-2xl">
              {beneficios.map((beneficio, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2C3E50]">{beneficio}</span>
                </li>
              ))}
            </ul>

            {/* Precio */}
            <div className="text-right ml-12">
              <div className="text-3xl font-semibold mb-1">
                <span className="text-[#2C3E50]">POR </span>
                <span className="text-[#32A5DD]">SOLO</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-3xl font-bold text-[#2C3E50]">$ 18.000</span>
                <div className="flex items-center">
                  <span className="text-yellow-400 font-poppins font-bold text-xl">C</span>
                  <span className="text-[#32A5DD] font-poppins font-bold text-xl">O</span>
                  <span className="text-red-500 font-poppins font-bold text-xl">P</span>
                </div>
                <span className="text-sm text-[#2C3E50] border border-[#2C3E50]/20 rounded-full px-2 py-0.5 ml-1">
                  mensual
                </span>
              </div>
            </div>
          </div>

          {/* Línea separadora */}
          <div className="border-t border-[#32A5DD]/20 mb-6"></div>

          {/* Texto informativo */}
          <p className="text-sm text-[#2C3E50] mb-4">
            Tu pago quedará asociado a este correo.
          </p>

          {/* Formulario horizontal */}
          <div className="flex gap-6 items-end">
            <div className="flex-1">
              <label htmlFor="email" className="block text-[#2C3E50] font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={displayEmail}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!currentUser?.email}
                className={`w-full p-2 text-[#2C3E50] border border-[#32A5DD]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#32A5DD]/50 ${
                  currentUser?.email ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
                placeholder="Digita tu correo"
              />
              {currentUser?.email && (
                <p className="text-xs text-gray-500 mt-1">Email de tu cuenta actual</p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="payment" className="block text-[#2C3E50] font-medium mb-1">
                Método de Pago
              </label>
              <select
                id="payment"
                className="w-full p-2 bg-white text-[#2C3E50] border border-[#32A5DD]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#32A5DD]/50 appearance-none pr-8"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232C3E50'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                <option value="" className="text-[#2C3E50]">Selecciona un método de pago</option>
                <option value="credit" className="text-[#2C3E50]">Tarjeta de Crédito</option>
                <option value="debit" className="text-[#2C3E50]">Tarjeta de Débito</option>
              </select>
            </div>
            <button
              onClick={handleContinue}
              disabled={isProcessing}
              className="bg-[#2C3E50] text-white px-8 py-2 rounded-md hover:bg-[#4B6A89] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Procesando...' : 'Continuar'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirmación de Pago
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres confirmar la compra de nuestro servicio premium?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleConfirm(true)}
                disabled={isProcessing}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Procesando...' : 'Sí'}
              </button>
              <button
                onClick={() => handleConfirm(false)}
                disabled={isProcessing}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium; 