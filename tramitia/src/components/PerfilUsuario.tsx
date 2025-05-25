import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TramiteCard from './TramiteCard';
import ComingSoonModal from './ComingSoonModal';
import libretaMilitarImg from '../assets/imgTramites/Libreta Militar.jpg';
import pasaporteImg from '../assets/imgTramites/Pasaporte.jpeg';
import licenciaImg from '../assets/imgTramites/Licencia.jpg';
import { useAuth } from '../contexts/AuthContext';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const { currentUser, isPremium, userData } = useAuth();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedTramite, setSelectedTramite] = useState('');
  
  const historialTramites = [
    { title: 'Libreta Militar', image: libretaMilitarImg },
    { title: 'Pasaporte', image: pasaporteImg },
    { title: 'Licencia de Conduccion', image: licenciaImg },
  ];

  const favoritosTramites = [
    { title: 'Libreta Militar', image: libretaMilitarImg },
    { title: 'Pasaporte', image: pasaporteImg },
  ];

  // Datos adicionales para usuarios premium
  const recordatorios = [
    { tramite: 'Libreta Militar', fecha: '02/04/2025', tipo: 'Renovación' },
    { tramite: 'Pasaporte', fecha: '02/04/2025', tipo: 'Vencimiento' },
  ];

  const carpetas = [
    { tramite: 'Libreta Militar', documentos: 5, fecha: '02/04/2005' },
    { tramite: 'Pasaporte', documentos: 3, fecha: '02/04/2005' },
  ];

  // Función para manejar clics en trámites
  const handleTramiteClick = (tramiteTitle: string) => {
    if (tramiteTitle === 'Libreta Militar') {
      navigate('/tramites/libreta-militar');
    } else {
      // Mostrar modal "Esperalo pronto" para otros trámites
      setSelectedTramite(tramiteTitle);
      setShowComingSoon(true);
    }
  };

  const handleCloseModal = () => {
    setShowComingSoon(false);
    setSelectedTramite('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header con información del usuario */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-[#2C3E50] mb-2">
              ¡Hola, {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Usuario'}!
            </h1>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isPremium 
                  ? 'bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] text-[#2C3E50]' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {isPremium ? 'PREMIUM' : 'FREE'}
              </span>
              {isPremium && userData?.premiumSince && (
                <span className="text-sm text-gray-600">
                  Premium desde: {userData.premiumSince.toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          {!isPremium && (
            <button
              onClick={() => navigate('/premium')}
              className="bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] text-[#2C3E50] px-6 py-3 rounded-lg font-semibold hover:from-[#9BC5E8] hover:to-[#d1f7d1] transition-all shadow-lg"
            >
              Upgrade a Premium
            </button>
          )}
        </div>
      </div>

      {/* Historial de trámites section */}
      <section className="mb-8">
        <h2 className="text-2xl font-poppins font-semibold text-[#2C3E50] mb-6">
          Historial de trámites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {historialTramites.map((tramite) => (
            <TramiteCard
              key={tramite.title}
              title={tramite.title}
              image={tramite.image}
              onClick={() => handleTramiteClick(tramite.title)}
            />
          ))}
        </div>
      </section>

      {/* Favoritos section */}
      <section className="mb-8">
        <h2 className="text-2xl font-poppins font-semibold text-[#2C3E50] mb-6">
          Favoritos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoritosTramites.map((tramite) => (
            <TramiteCard
              key={tramite.title}
              title={tramite.title}
              image={tramite.image}
              onClick={() => handleTramiteClick(tramite.title)}
            />
          ))}
          <button
            className="flex items-center justify-center w-full h-full min-h-[200px] bg-[#F5F5F5] rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
            onClick={() => console.log('Agregar nuevo favorito')}
          >
            <span className="text-4xl text-gray-400">+</span>
          </button>
        </div>
      </section>

      {/* Secciones Premium */}
      {isPremium ? (
        <>
          {/* Recordatorios section - Solo Premium */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-poppins font-semibold text-[#2C3E50]">
                Recordatorios
              </h2>
              <span className="bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] text-[#2C3E50] text-xs font-bold px-2 py-1 rounded-full">
                PREMIUM
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recordatorios.map((recordatorio, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#2C3E50]">{recordatorio.tramite}</h3>
                      <p className="text-sm text-gray-600">{recordatorio.tipo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#32A5DD]">{recordatorio.fecha}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button
                className="flex items-center justify-center h-24 bg-[#F5F5F5] rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
                onClick={() => console.log('Agregar recordatorio')}
              >
                <span className="text-2xl text-gray-400">+</span>
              </button>
            </div>
          </section>

          {/* Carpetas section - Solo Premium */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-poppins font-semibold text-[#2C3E50]">
                Carpetas
              </h2>
              <span className="bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] text-[#2C3E50] text-xs font-bold px-2 py-1 rounded-full">
                PREMIUM
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carpetas.map((carpeta, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#2C3E50]">{carpeta.tramite}</h3>
                      <p className="text-sm text-gray-600">{carpeta.documentos} documentos</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#32A5DD]">{carpeta.fecha}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button
                className="flex items-center justify-center h-24 bg-[#F5F5F5] rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
                onClick={() => console.log('Crear carpeta')}
              >
                <span className="text-2xl text-gray-400">+</span>
              </button>
            </div>
          </section>
        </>
      ) : (
        /* Banner de upgrade para usuarios free */
        <div className="mt-8 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">
              ¡Desbloquea todas las funciones con Premium!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-[#2C3E50] mb-2">Recordatorios</h4>
                <p className="text-sm text-gray-600">Nunca olvides fechas importantes de tus trámites</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-[#2C3E50] mb-2">Gestor de Carpetas</h4>
                <p className="text-sm text-gray-600">Organiza todos tus documentos en un solo lugar</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-[#2C3E50] mb-2">Asistente IA</h4>
                <p className="text-sm text-gray-600">Recibe ayuda personalizada para tus trámites</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-[#2C3E50] mb-2">Acceso Completo</h4>
                <p className="text-sm text-gray-600">Información detallada de todos los trámites</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/premium')}
              className="bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] text-[#2C3E50] px-8 py-3 rounded-lg font-semibold hover:from-[#9BC5E8] hover:to-[#d1f7d1] transition-all shadow-lg"
            >
              Suscríbete a Premium
            </button>
          </div>
        </div>
      )}

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={handleCloseModal}
        tramiteTitle={selectedTramite}
      />
    </div>
  );
};

export default PerfilUsuario; 