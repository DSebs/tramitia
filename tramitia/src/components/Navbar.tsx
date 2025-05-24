import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import avionLogo from '../assets/branding/avionLogo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  // Navegar a la página principal y luego hacer scroll a la sección
  const scrollToSection = (sectionId: string) => {
    navigate('/', { replace: true });
    // Usar setTimeout para asegurar que la navegación se complete antes del scroll
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Ir al inicio de la página principal
  const goToHome = () => {
    navigate('/');
  };

  return (
    <nav
      className="w-full flex items-center justify-between px-4 md:px-8 py-3 bg-[#F5F5F5] shadow-sm fixed top-0 left-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={goToHome}
        tabIndex={0}
        aria-label="Ir al inicio"
      >
        <img
          src={avionLogo}
          alt="Logo de Tramitia, un avión de papel azul"
          className="h-12 w-12 transition-transform hover:scale-105"
        />
      </div>
      <ul className="hidden md:flex gap-10 font-poppins text-lg text-[#2C3E50]">
      {isLanding ? (
  <>
    <li>
      <span
        onClick={() => scrollToSection('servicio')}
        className="text-[#2C3E50] hover:text-[#32A5DD] transition-colors cursor-pointer"
      >
        Servicio
      </span>
    </li>
    <li>
      <span
        onClick={() => scrollToSection('nosotros')}
        className="text-[#2C3E50] hover:text-[#32A5DD] transition-colors cursor-pointer"
      >
        Nosotros
      </span>
    </li>
    <li>
      <span
        onClick={() => scrollToSection('consultados')}
        className="text-[#2C3E50] hover:text-[#32A5DD] transition-colors cursor-pointer"
      >
        Consultados
      </span>
    </li>
  </>
) : (
  <>
    <li>
      <Link
        to="/"
        className="text-[#2C3E50] hover:text-[#32A5DD] transition-colors"
      >
        Inicio
      </Link>
    </li>
    <li>
      <Link
        to="/historial"
        className="text-[#2C3E50] hover:text-[#32A5DD] transition-colors"
      >
        Historial
      </Link>
    </li>
  </>
)}

      </ul>
      {/* Botón "Acceder" usando Link para SPA */}
      <Link
        to="/login"
        className="bg-[#2C3E50] text-[#DFFFD8] font-nunito px-6 py-2 rounded-lg shadow hover:bg-[#4B6A89] hover:text-[#f5ffe6] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Acceder"
      >
        Acceder
      </Link>
      {/* Menú hamburguesa para móvil */}
      <button
        className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Abrir menú de navegación"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-7 h-7 text-[#2C3E50]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-[#F5F5F5] shadow-md flex flex-col items-center gap-4 py-4 md:hidden font-poppins text-lg text-[#2C3E50] animate-fade-in z-50">
        {isLanding ? (
          <>
            <li>
              <span
                onClick={() => {
                  scrollToSection('servicio');
                  setMenuOpen(false);
                }}
                className="hover:text-[#32A5DD] transition-colors cursor-pointer"
              >
                Servicio
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  scrollToSection('nosotros');
                  setMenuOpen(false);
                }}
                className="hover:text-[#32A5DD] transition-colors cursor-pointer"
              >
                Nosotros
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  scrollToSection('consultados');
                  setMenuOpen(false);
                }}
                className="hover:text-[#32A5DD] transition-colors cursor-pointer"
              >
                Consultados
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/"
                className="hover:text-[#32A5DD] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/historial"
                className="hover:text-[#32A5DD] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Historial
              </Link>
            </li>
          </>
        )}
      </ul>
      )}
    </nav>
  );
};

export default Navbar;
