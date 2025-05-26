import { useState, useEffect } from 'react';
import libretaMilitarImg from '../assets/imgTramites/Libreta Militar.jpg';
import runtImg from '../assets/imgTramites/Renta.jpeg';

interface Document {
  id: string;
  name: string;
  completed: boolean;
}

interface Folder {
  id: string;
  tramiteId: string;
  tramiteTitle: string;
  documents: Document[];
  createdAt: Date;
}

interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder?: Folder;
  onSaveFolder: (folder: Omit<Folder, 'id' | 'createdAt'>) => void;
  existingFolders?: Folder[];
}

const FolderModal = ({ isOpen, onClose, folder, onSaveFolder, existingFolders = [] }: FolderModalProps) => {
  const [selectedTramiteId, setSelectedTramiteId] = useState(folder?.tramiteId || '');
  const [documents, setDocuments] = useState<Document[]>([]);

  // Documentos por trámite
  const documentsByTramite: Record<string, Document[]> = {
    'libreta-militar': [
      { id: 'doc1', name: 'Documento 1 - Cédula de ciudadanía', completed: false },
      { id: 'doc2', name: 'Documento 2 - Registro Civil de Nacimiento', completed: false },
      { id: 'doc3', name: 'Documento 3 - Fotografías 3x4', completed: false },
      { id: 'doc4', name: 'Documento 4 - Certificado de Estudios', completed: false },
      { id: 'doc5', name: 'Documento 5 - Examenes medicos', completed: false }
    ],
    'runt': [
      { id: 'doc1', name: 'Documento 1 - Cédula de ciudadanía', completed: false },
    ]
  };

  const tramites = [
    {
      id: 'libreta-militar',
      title: 'Libreta Militar',
      image: libretaMilitarImg
    },
    {
      id: 'runt',
      title: 'RUNT',
      image: runtImg
    }
  ];

  // Inicializar documentos cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (folder) {
        // Si es una carpeta existente, usar sus documentos
        setDocuments(folder.documents || []);
        setSelectedTramiteId(folder.tramiteId);
      } else {
        // Si es una carpeta nueva, limpiar todo
        setDocuments([]);
        setSelectedTramiteId('');
      }
    }
  }, [isOpen, folder]);

  const handleTramiteChange = (tramiteId: string) => {
    setSelectedTramiteId(tramiteId);
    // Si es un folder nuevo, cargar documentos del trámite seleccionado
    if (!folder) {
      setDocuments(documentsByTramite[tramiteId] || []);
    }
  };

  const handleDocumentToggle = (documentId: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, completed: !doc.completed }
          : doc
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTramiteId && documents.length > 0) {
      const selectedTramite = tramites.find(t => t.id === selectedTramiteId);
      if (selectedTramite) {
        onSaveFolder({
          tramiteId: selectedTramiteId,
          tramiteTitle: selectedTramite.title,
          documents
        });
        handleClose();
      }
    }
  };

  const handleClose = () => {
    if (!folder) {
      setSelectedTramiteId('');
      setDocuments([]);
    }
    onClose();
  };

  const selectedTramite = tramites.find(t => t.id === selectedTramiteId);
  const completedCount = documents.filter(doc => doc.completed).length;
  const totalCount = documents.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-poppins font-semibold text-[#2C3E50]">
            {folder ? 'Gestionar Carpeta' : 'Crear Nueva Carpeta'}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selección de Trámite */}
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Trámite *
              </label>
              {folder ? (
                <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedTramite?.image}
                      alt={selectedTramite?.title}
                      className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-poppins font-semibold text-[#2C3E50] text-sm">
                        {selectedTramite?.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {tramites.filter(tramite => !existingFolders.some(f => f.tramiteId === tramite.id)).length > 0 ? (
                    <select
                      value={selectedTramiteId}
                      onChange={(e) => handleTramiteChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins bg-white text-gray-900"
                      required
                    >
                      <option value="">Seleccionar trámite</option>
                      {tramites.map((tramite) => {
                        // Si es una carpeta nueva, no mostrar trámites que ya tienen carpetas
                        const hasExistingFolder = !folder && existingFolders.some(f => f.tramiteId === tramite.id);
                        if (hasExistingFolder) return null;
                        
                        return (
                          <option key={tramite.id} value={tramite.id}>
                            {tramite.title}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <div className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-center">
                      <p className="text-gray-600 font-poppins">
                        Ya tienes carpetas para todos los trámites disponibles.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Solo puedes tener una carpeta por trámite.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Progreso */}
            {documents.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#2C3E50]">
                    Progreso de documentos
                  </span>
                  <span className="text-sm text-[#2C3E50]">
                    {completedCount}/{totalCount}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Lista de Documentos */}
            {documents.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-3">
                  Documentos Requeridos
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={document.id}
                        checked={document.completed}
                        onChange={() => handleDocumentToggle(document.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        htmlFor={document.id}
                        className={`flex-1 text-sm font-poppins cursor-pointer ${
                          document.completed 
                            ? 'text-gray-500 line-through' 
                            : 'text-[#2C3E50]'
                        }`}
                      >
                        {document.name}
                      </label>
                      {document.completed && (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-poppins"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!selectedTramiteId || documents.length === 0 || (!folder && tramites.filter(tramite => !existingFolders.some(f => f.tramiteId === tramite.id)).length === 0)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] text-[#2C3E50] rounded-lg hover:from-[#9BC5E8] hover:to-[#d1f7d1] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {folder ? 'Guardar' : 'Crear Carpeta'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FolderModal; 