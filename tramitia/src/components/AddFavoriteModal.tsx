import { useState } from 'react';
import libretaMilitarImg from '../assets/imgTramites/Libreta Militar.jpg';
import pasaporteImg from '../assets/imgTramites/Pasaporte.jpeg';
import licenciaImg from '../assets/imgTramites/Licencia.jpg';
import runtImg from '../assets/imgTramites/Renta.jpeg';

interface Tramite {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface AddFavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFavorite: (tramite: Tramite) => void;
  currentFavorites: Tramite[];
}

const AddFavoriteModal = ({ isOpen, onClose, onAddFavorite, currentFavorites }: AddFavoriteModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de trámites disponibles
  const availableTramites: Tramite[] = [
    {
      id: 'libreta-militar',
      title: 'Libreta Militar',
      description: 'Documento de identificación militar obligatorio para ciudadanos colombianos',
      image: libretaMilitarImg
    },
    {
      id: 'runt',
      title: 'RUNT',
      description: 'Registro Único Nacional de Tránsito para conductores y vehículos',
      image: runtImg
    },
    {
      id: 'pasaporte',
      title: 'Pasaporte',
      description: 'Documento de viaje internacional',
      image: pasaporteImg
    },
    {
      id: 'licencia-conduccion',
      title: 'Licencia de Conducción',
      description: 'Permiso para conducir vehículos automotores',
      image: licenciaImg
    }
  ];

  // Filtrar trámites que no están en favoritos y que coinciden con la búsqueda
  const filteredTramites = availableTramites.filter(tramite => {
    const isNotInFavorites = !currentFavorites.some(fav => fav.id === tramite.id);
    const matchesSearch = tramite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tramite.description.toLowerCase().includes(searchQuery.toLowerCase());
    return isNotInFavorites && (searchQuery === '' || matchesSearch);
  });

  const handleAddFavorite = (tramite: Tramite) => {
    onAddFavorite(tramite);
    setSearchQuery('');
    onClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-poppins font-semibold text-[#2C3E50]">
            Agregar a Favoritos
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar trámites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins bg-white text-gray-900"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {filteredTramites.length > 0 ? (
            <div className="p-4 space-y-2">
              {filteredTramites.map((tramite) => (
                <button
                  key={tramite.id}
                  onClick={() => handleAddFavorite(tramite)}
                  className="w-full p-4 text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tramite.image}
                      alt={tramite.title}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-poppins font-semibold text-[#2C3E50] text-sm">
                        {tramite.title}
                      </h3>
                      <p className="text-[#2C3E50] opacity-70 text-xs font-poppins line-clamp-2">
                        {tramite.description}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              {currentFavorites.length === availableTramites.length ? (
                <div className="text-[#2C3E50] font-poppins">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-lg font-semibold mb-2">¡Todos los trámites están en favoritos!</p>
                  <p className="text-sm opacity-70">Ya has agregado todos los trámites disponibles a tu lista de favoritos.</p>
                </div>
              ) : searchQuery ? (
                <div className="text-[#2C3E50] font-poppins">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-lg font-semibold mb-2">No se encontraron resultados</p>
                  <p className="text-sm opacity-70">No hay trámites que coincidan con "{searchQuery}"</p>
                </div>
              ) : (
                <div className="text-[#2C3E50] font-poppins">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-lg font-semibold mb-2">Busca trámites para agregar</p>
                  <p className="text-sm opacity-70">Usa el buscador para encontrar trámites y agregarlos a tus favoritos.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFavoriteModal; 