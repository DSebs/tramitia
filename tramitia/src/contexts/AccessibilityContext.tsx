import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AccessibilityContextType {
  lineSpacing: 'normal' | 'increased' | 'large';
  setLineSpacing: (spacing: 'normal' | 'increased' | 'large') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [lineSpacing, setLineSpacing] = useState<'normal' | 'increased' | 'large'>('normal');

  // Aplicar clases CSS al body según el espaciado seleccionado
  useEffect(() => {
    const body = document.body;
    
    // Remover clases anteriores
    body.classList.remove('line-spacing-normal', 'line-spacing-increased', 'line-spacing-large');
    
    // Añadir la clase correspondiente
    body.classList.add(`line-spacing-${lineSpacing}`);
    
    // Guardar preferencia en localStorage
    localStorage.setItem('tramitia-line-spacing', lineSpacing);
  }, [lineSpacing]);

  // Cargar preferencia guardada al inicializar
  useEffect(() => {
    const savedSpacing = localStorage.getItem('tramitia-line-spacing') as 'normal' | 'increased' | 'large' | null;
    if (savedSpacing && ['normal', 'increased', 'large'].includes(savedSpacing)) {
      setLineSpacing(savedSpacing);
    }
  }, []);

  const value = {
    lineSpacing,
    setLineSpacing,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}; 