import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TramiteCard from './TramiteCard';
import ComingSoonModal from './ComingSoonModal';
import AddFavoriteModal from './AddFavoriteModal';
import AddReminderModal from './AddReminderModal';
import FolderModal from './FolderModal';
import libretaMilitarImg from '../assets/imgTramites/Libreta Militar.jpg';
import pasaporteImg from '../assets/imgTramites/Pasaporte.jpeg';
import licenciaImg from '../assets/imgTramites/Licencia.jpg';
import { useAuth } from '../contexts/AuthContext';
import type { Tramite, Reminder, Folder } from '../services/userService';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const { currentUser, isPremium, userData, addFavorite, removeFavorite, addUserReminder, removeUserReminder, addUserFolder, updateUserFolder, removeUserFolder } = useAuth();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedTramite, setSelectedTramite] = useState('');
  const [showAddFavorite, setShowAddFavorite] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | undefined>(undefined);
  
  const historialTramites = [
    { title: 'Libreta Militar', image: libretaMilitarImg },
    { title: 'Pasaporte', image: pasaporteImg },
    { title: 'Licencia de Conduccion', image: licenciaImg },
  ];

  // Obtener datos del usuario
  const favoritosTramites = userData?.favorites || [];
  const recordatorios = userData?.reminders || [];
  const carpetas = userData?.folders || [];

  // Función para manejar clics en trámites
  const handleTramiteClick = (tramiteTitle: string) => {
    if (tramiteTitle === 'Libreta Militar') {
      navigate('/tramites/libreta-militar');
    } else if (tramiteTitle === 'RUNT') {
      navigate('/tramites/runt');
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

  const handleAddFavorite = async (tramite: Tramite) => {
    await addFavorite(tramite);
    setShowAddFavorite(false);
  };

  const handleRemoveFavorite = async (tramiteId: string) => {
    await removeFavorite(tramiteId);
  };

  const handleAddReminder = async (reminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    await addUserReminder(reminder);
    setShowAddReminder(false);
  };

  const handleRemoveReminder = async (reminderId: string) => {
    await removeUserReminder(reminderId);
  };

  const handleAddFolder = async (folder: Omit<Folder, 'id' | 'createdAt'>) => {
    await addUserFolder(folder);
    setShowFolderModal(false);
    setSelectedFolder(undefined);
  };

  const handleUpdateFolder = async (folder: Omit<Folder, 'id' | 'createdAt'>) => {
    if (selectedFolder) {
      await updateUserFolder(selectedFolder.id, folder);
      setShowFolderModal(false);
      setSelectedFolder(undefined);
    }
  };

  const handleRemoveFolder = async (folderId: string) => {
    await removeUserFolder(folderId);
  };

  const handleEditFolder = (folder: Folder) => {
    setSelectedFolder(folder);
    setShowFolderModal(true);
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
            <div key={tramite.id} className="relative group">
              <TramiteCard
                title={tramite.title}
                image={tramite.image}
                onClick={() => handleTramiteClick(tramite.title)}
              />
              <button
                onClick={() => handleRemoveFavorite(tramite.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Remover de favoritos"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button
            className="flex items-center justify-center w-full h-full min-h-[200px] bg-[#F5F5F5] rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
            onClick={() => setShowAddFavorite(true)}
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
              {recordatorios.map((recordatorio) => (
                <div key={recordatorio.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#2C3E50]">{recordatorio.tramiteTitle}</h3>
                      <p className="text-sm text-gray-600">{recordatorio.message}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#32A5DD]">
                        {new Date(recordatorio.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveReminder(recordatorio.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Eliminar recordatorio"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                className="flex items-center justify-center h-24 bg-[#F5F5F5] rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
                onClick={() => setShowAddReminder(true)}
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
              {carpetas.map((carpeta) => {
                const completedDocs = carpeta.documents.filter(doc => doc.completed).length;
                const totalDocs = carpeta.documents.length;
                const progressPercentage = totalDocs > 0 ? (completedDocs / totalDocs) * 100 : 0;
                
                return (
                  <div key={carpeta.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative group cursor-pointer hover:shadow-md transition-shadow"
                       onClick={() => handleEditFolder(carpeta)}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-[#2C3E50]">{carpeta.tramiteTitle}</h3>
                        <p className="text-sm text-gray-600">{completedDocs}/{totalDocs} documentos completados</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#32A5DD]">
                          {carpeta.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Barra de progreso */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">{Math.round(progressPercentage)}% completado</p>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFolder(carpeta.id);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      title="Eliminar carpeta"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
              <button
                className="flex items-center justify-center h-24 bg-[#F5F5F5] rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
                onClick={() => setShowFolderModal(true)}
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

      <AddFavoriteModal
        isOpen={showAddFavorite}
        onClose={() => setShowAddFavorite(false)}
        onAddFavorite={handleAddFavorite}
        currentFavorites={favoritosTramites}
      />

      <AddReminderModal
        isOpen={showAddReminder}
        onClose={() => setShowAddReminder(false)}
        onAddReminder={handleAddReminder}
      />

      <FolderModal
        isOpen={showFolderModal}
        onClose={() => {
          setShowFolderModal(false);
          setSelectedFolder(undefined);
        }}
        folder={selectedFolder}
        onSaveFolder={selectedFolder ? handleUpdateFolder : handleAddFolder}
        existingFolders={carpetas}
      />
    </div>
  );
};

export default PerfilUsuario; 