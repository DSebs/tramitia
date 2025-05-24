import { useNavigate } from 'react-router-dom';
import TramiteCard from './TramiteCard';
import libretaMilitarImg from '../assets/imgTramites/Libreta Militar.jpg';
import pasaporteImg from '../assets/imgTramites/Pasaporte.jpeg';
import licenciaImg from '../assets/imgTramites/Licencia.jpg';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const historialTramites = [
    { title: 'Libreta Militar', image: libretaMilitarImg },
    { title: 'Pasaporte', image: pasaporteImg },
    { title: 'Licencia de Conduccion', image: licenciaImg },
  ];

  const favoritosTramites = [
    { title: 'Libreta Militar', image: libretaMilitarImg },
    { title: 'Pasaporte', image: pasaporteImg },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
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
              onClick={() => console.log(`Ver trámite: ${tramite.title}`)}
            />
          ))}
        </div>
      </section>

      {/* Favoritos section */}
      <section>
        <h2 className="text-2xl font-poppins font-semibold text-[#2C3E50] mb-6">
          Favoritos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoritosTramites.map((tramite) => (
            <TramiteCard
              key={tramite.title}
              title={tramite.title}
              image={tramite.image}
              onClick={() => console.log(`Ver favorito: ${tramite.title}`)}
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

      {/* Premium subscription banner */}
      <div className="mt-8 flex flex-col items-center justify-center text-center">
        <p className="text-sm text-gray-600 mb-2">Gestiona tu trámite de mejor manera</p>
        <button
          className="bg-[#DFFFD8] text-[#2C3E50] px-4 py-1.5 text-sm font-medium hover:bg-[#d0f5c9] transition-colors"
          onClick={() => navigate('/premium')}
        >
          Suscríbete a Premium
        </button>
      </div>
    </div>
  );
};

export default PerfilUsuario; 