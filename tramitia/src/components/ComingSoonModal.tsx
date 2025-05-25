import React from 'react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  tramiteTitle: string;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose, tramiteTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#2C3E50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-poppins font-bold text-[#2C3E50] mb-4">
            ¡Esperalo pronto!
          </h3>
          
          <p className="text-[#2C3E50] mb-6 font-poppins">
            El trámite de <strong>{tramiteTitle}</strong> estará disponible próximamente. 
            Estamos trabajando para brindarte la mejor experiencia.
          </p>
          
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] text-[#2C3E50] px-6 py-3 rounded-lg font-semibold hover:from-[#9BC5E8] hover:to-[#d1f7d1] transition-all shadow-lg"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal; 