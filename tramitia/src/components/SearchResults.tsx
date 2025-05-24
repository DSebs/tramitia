import { useNavigate } from 'react-router-dom';
import libretaMilitarImg from '../assets/imgTramites/Libreta Militar.jpg';
import pasaporteImg from '../assets/imgTramites/Pasaporte.jpeg';
import licenciaImg from '../assets/imgTramites/Licencia.jpg';
import runtImg from '../assets/imgTramites/Renta.jpeg';

interface SearchResult {
  title: string;
  description: string;
  image: string;
  route: string;
}

interface SearchResultsProps {
  query: string;
  onSelect: () => void;
  isVisible: boolean;
}

const SearchResults = ({ query, onSelect, isVisible }: SearchResultsProps) => {
  const navigate = useNavigate();

  // Datos de trámites disponibles para búsqueda
  const availableTramites: SearchResult[] = [
    {
      title: 'Libreta Militar',
      description: 'Documento de identificación militar obligatorio para ciudadanos colombianos',
      image: libretaMilitarImg,
      route: '/tramites/libreta-militar'
    },
    {
      title: 'RUNT',
      description: 'Registro Único Nacional de Tránsito para conductores y vehículos',
      image: runtImg,
      route: '/tramites/runt'
    },
    {
      title: 'Pasaporte',
      description: 'Documento de viaje internacional',
      image: pasaporteImg,
      route: '#'
    },
    {
      title: 'Licencia de Conducción',
      description: 'Permiso para conducir vehículos automotores',
      image: licenciaImg,
      route: '#'
    }
  ];

  // Filtrar resultados basado en la búsqueda
  const filteredResults = availableTramites.filter(tramite =>
    tramite.title.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  const handleResultClick = (route: string) => {
    if (route !== '#') {
      navigate(route);
    }
    onSelect();
  };

  if (!isVisible || query.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 mt-2 max-h-60 overflow-y-auto">
      {filteredResults.length > 0 ? (
        filteredResults.map((result, index) => (
          <button
            key={index}
            className="w-full p-4 text-left bg-white hover:bg-gray-100 border-b border-gray-100 last:border-b-0 transition-colors focus:outline-none focus:bg-gray-100"
            onClick={() => handleResultClick(result.route)}
          >
            <div className="flex items-center gap-3">
              <img
                src={result.image}
                alt={result.title}
                className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-poppins font-semibold text-[#2C3E50] text-lg">
                  {result.title}
                </h3>
                <p className="text-[#2C3E50] opacity-70 text-sm font-poppins line-clamp-2">
                  {result.description}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-[#2C3E50] opacity-40 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        ))
      ) : (
        <div className="p-4 text-center text-[#2C3E50] font-poppins bg-white">
          No se encontraron resultados para "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchResults; 