import { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lineSpacing, setLineSpacing } = useAccessibility();
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const spacingOptions = [
    { value: 'normal', label: 'Normal', description: 'Espaciado estándar' },
    { value: 'increased', label: 'Aumentado', description: 'Más espacio entre líneas' },
    { value: 'large', label: 'Grande', description: 'Máximo espaciado' }
  ] as const;

  return (
    <div className="relative" ref={menuRef}>
      {/* Imagen de accesibilidad clickeable */}
      <img 
        src="/AccesibilidadSi.jpg"
        alt="Opciones de accesibilidad"
        className="w-8 h-8 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform shadow-sm border border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
        title="Opciones de accesibilidad"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      />

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fade-in">
          <div className="py-1">
            {/* Título */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
              <h3 className="text-sm font-semibold text-[#2C3E50]">Espaciado de texto</h3>
              <p className="text-xs text-gray-600 mt-1">Ajusta la separación entre líneas</p>
            </div>
            
            {/* Opciones */}
            <div className="py-1">
              {spacingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setLineSpacing(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between group ${
                    lineSpacing === option.value ? 'bg-blue-100 border-r-4 border-[#32A5DD]' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      lineSpacing === option.value ? 'text-[#32A5DD]' : 'text-[#2C3E50]'
                    }`}>
                      {option.label}
                    </div>
                    <div className={`text-xs mt-1 ${
                      lineSpacing === option.value ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {option.description}
                    </div>
                  </div>
                  {lineSpacing === option.value && (
                    <div className="ml-2">
                      <svg className="w-5 h-5 text-[#32A5DD]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer informativo */}
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 rounded-b-lg">
              <p className="text-xs text-gray-500">Tu preferencia se guardará automáticamente</p>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para la animación */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AccessibilityMenu; 