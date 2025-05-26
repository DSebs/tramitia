import { useState } from 'react';
import libretaMilitarImg from '../assets/imgTramites/Libreta Militar.jpg';
import runtImg from '../assets/imgTramites/Renta.jpeg';

interface Tramite {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Reminder {
  id: string;
  tramiteId: string;
  tramiteTitle: string;
  message: string;
  date: string;
  createdAt: Date;
}

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReminder: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void;
}

const AddReminderModal = ({ isOpen, onClose, onAddReminder }: AddReminderModalProps) => {
  const [selectedTramite, setSelectedTramite] = useState<Tramite | null>(null);
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [showTramiteList, setShowTramiteList] = useState(false);

  // Datos de trámites disponibles para recordatorios
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
    }
  ];

  const handleSelectTramite = (tramite: Tramite) => {
    setSelectedTramite(tramite);
    setShowTramiteList(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTramite && message.trim() && date) {
      onAddReminder({
        tramiteId: selectedTramite.id,
        tramiteTitle: selectedTramite.title,
        message: message.trim(),
        date
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedTramite(null);
    setMessage('');
    setDate('');
    setShowTramiteList(false);
    onClose();
  };

  // Obtener fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-poppins font-semibold text-[#2C3E50]">
            Agregar Recordatorio
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
                Seleccionar Trámite *
              </label>
              {selectedTramite ? (
                <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedTramite.image}
                      alt={selectedTramite.title}
                      className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-poppins font-semibold text-[#2C3E50] text-sm">
                        {selectedTramite.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowTramiteList(true)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowTramiteList(true)}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors bg-white"
                >
                  Seleccionar trámite
                </button>
              )}
            </div>

            {/* Lista de Trámites */}
            {showTramiteList && (
              <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto bg-white">
                {availableTramites.map((tramite) => (
                  <button
                    key={tramite.id}
                    type="button"
                    onClick={() => handleSelectTramite(tramite)}
                    className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={tramite.image}
                        alt={tramite.title}
                        className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-poppins font-semibold text-[#2C3E50] text-sm">
                          {tramite.title}
                        </h3>
                        <p className="text-[#2C3E50] opacity-70 text-xs font-poppins line-clamp-1">
                          {tramite.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Mensaje del Recordatorio *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ej: Renovación de documento, Vencimiento próximo..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins resize-none bg-white text-gray-900"
                rows={3}
                required
              />
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Fecha del Recordatorio *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins bg-white text-gray-900"
                required
              />
            </div>

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
                disabled={!selectedTramite || !message.trim() || !date}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] text-[#2C3E50] rounded-lg hover:from-[#9BC5E8] hover:to-[#d1f7d1] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReminderModal; 