import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HoverTooltip from '../components/HoverTooltip';
import { useAuth } from '../contexts/AuthContext';
import libretaMilitarImg from '../assets/imgTramites/Libreta Militar.jpg';
import papeleoDoodle from '../assets/LibretaMilitar/papeleo_doodle.png';
import filaDoodle from '../assets/LibretaMilitar/fila_doodle.png';
import mapaImg from '../assets/LibretaMilitar/Mapa.png';

const LibretaMilitar = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  const { currentUser, isPremium } = useAuth();

  const handlePremiumClick = () => {
    if (!currentUser) {
      // Usuario no autenticado - redirigir a login
      navigate('/login');
    } else if (!isPremium) {
      // Usuario free - redirigir a premium
      navigate('/premium');
    } else {
      // Usuario premium - redirigir a asistente (por ahora mostrar modal)
      setShowPremiumModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowPremiumModal(false);
  };

  // Función para obtener el texto del botón según el estado del usuario
  const getButtonText = () => {
    if (!currentUser) return "¡Inicia Sesión!";
    if (!isPremium) return "Suscríbete a Premium";
    return "Ruta Personalizada";
  };

  // Datos para el paso a paso
  const steps = [
    {
      id: 1,
      title: "Recopilación de documentos",
      image: papeleoDoodle,
      description: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      id: 2,
      title: "Solicitud en línea",
      image: filaDoodle,
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
    },
    {
      id: 3,
      title: "Pago de tasas",
      image: papeleoDoodle,
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi."
    },
    {
      id: 4,
      title: "Cita presencial",
      image: filaDoodle,
      description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner Section */}
      <section className="relative w-full h-[600px] mt-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${libretaMilitarImg})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between h-full px-4 sm:px-8 md:px-16 lg:px-24 py-8">
          {/* Empty space to push content to bottom */}
          <div></div>
          
          {/* Bottom Content Container */}
          <div className="flex justify-between items-end">
            {/* Left Side - Main Content */}
            <div className="max-w-2xl">
              <h1 className="text-left text-4xl sm:text-5xl md:text-6xl font-poppins font-semibold mb-4 bg-gradient-to-r from-white to-[#AED6F1] bg-clip-text text-transparent">
                Libreta Militar
              </h1>
              <p className="text-left text-lg sm:text-xl md:text-2xl font-inter font-semibold text-white mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Donec volutpat, turpis id viverra pretium
              </p>
              
              {/* Difficulty Rating */}
              <div className="flex items-center gap-2 mb-8">
                <span className="text-white font-poppins font-semibold text-lg">DIFICULTAD:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((star) => (
                    <svg
                      key={star}
                      className="w-6 h-6 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Premium CTA */}
            <div className="text-right">
              <p className="text-white font-poppins text-base mb-4">
                Gestiona tu trámite de mejor manera
              </p>
              <button
                onClick={handlePremiumClick}
                className="bg-gradient-to-r from-[#AED6F1] to-[#DFFFD8] text-[#2C3E50] font-nunito px-6 py-3 rounded-lg shadow hover:from-[#9BC5E8] hover:to-[#d1f7d1] transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="flex-1 bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-[#2C3E50] mb-8 text-left">
                Hablando <span className="text-[#32A5DD]">Claro</span>
              </h2>
              
              <div className="space-y-6 text-[#2C3E50] font-poppins text-lg leading-relaxed text-left max-w-3xl">
                <p>
                  Lorem ipsum <HoverTooltip 
                    term="Dolor" 
                    explanation="Término legal que se refiere al proceso administrativo de identificación militar obligatorio para ciudadanos colombianos."
                  >
                    dolor
                  </HoverTooltip> sit amet, consectetur 
                  adipiscing elit. Donec volutpat, turpis id 
                  viverra pretium, leo risus molestie erat, in 
                  pharetra ex est at tellus. Sed vehicula 
                  euismod nisl, ac tristique diam iaculis a. 
                  Nulla sit amet nisl a
                </p>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetur 
                  adipiscing elit. Donec volutpat, turpis id 
                  viverra pretium, leo risus <HoverTooltip 
                    term="Molestie" 
                    explanation="Proceso que requiere documentación específica y cumplimiento de requisitos establecidos por las autoridades militares."
                  >
                    molestie
                  </HoverTooltip> erat, in 
                  pharetra ex est at tellus. Sed vehicula 
                  euismod nisl, ac tristique diam iaculis a. 
                  Nulla sit amet nisl a
                </p>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetur 
                  adipiscing elit. Donec volutpat, turpis id 
                  viverra pretium, leo risus molestie erat, in 
                  pharetra ex est at tellus. Sed <HoverTooltip 
                    term="Vehicula" 
                    explanation="Trámite requerido para obtener la situación militar definida, esencial para acceder a empleos públicos y otros procesos."
                  >
                    vehicula
                  </HoverTooltip> 
                  euismod nisl, ac tristique diam iaculis a. 
                  Nulla sit amet nisl a
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Entities */}
              <div className="bg-gradient-to-b from-[#2C3E50] to-[#648DB6] text-white rounded-lg p-6 mb-8">
                <h3 className="text-xl font-poppins font-bold mb-6 text-left">
                  Entidades Relacionadas
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Ministerio de Defensa Nacional</h4>
                      <p className="text-sm opacity-90">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Donec volutpat, turpis id viverra
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Ejército Nacional</h4>
                      <p className="text-sm opacity-90">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Donec volutpat, turpis id ver
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Ministerio de Justicia y de Derecho</h4>
                      <p className="text-sm opacity-90">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Donec volutpat, turpis id ver
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Requirements */}
              <div className="bg-gradient-to-b from-[#648DB6] to-[#2C3E50] text-white rounded-lg p-6">
                <h3 className="text-xl font-poppins font-bold mb-6 text-left">
                  Requisitos Generales
                </h3>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm">Lorem ipsum dolor sit amet,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm">Lorem ipsum dolor sit amet,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm">Lorem ipsum dolor sit amet,</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paso a Paso Section */}
      <section className="bg-white-50 px-4 sm:px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-[#2C3E50] mb-12 text-left">
            Paso A Paso
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Timeline */}
            <div className="relative self-center">  {/* ⬅ Agregamos self-center para alineación vertical */}
                <div className="space-y-8">
                {steps.map((step, index) => (
                    <div
                    key={step.id}
                    className={`flex items-start gap-4 cursor-pointer transition-all duration-300 ${
                        activeStep === step.id ? 'transform scale-105' : ''
                    }`}
                    onMouseEnter={() => setActiveStep(step.id)}
                    >
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
                        activeStep === step.id 
                        ? 'bg-[#32A5DD] shadow-lg transform scale-110' 
                        : index + 1 <= activeStep 
                            ? 'bg-[#32A5DD]' 
                            : 'bg-[#2C3E50]'
                    }`}>
                        {step.id}
                    </div>

                    <div className="text-left flex-1 pt-2">
                        <h3 className={`font-poppins font-semibold text-xl transition-colors duration-300 ${
                        activeStep === step.id ? 'text-[#32A5DD]' : 'text-[#2C3E50]'
                        }`}>
                        {step.title}
                        </h3>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Right Side - Dynamic Content */}
            <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="transition-all duration-500 ease-in-out">
                <div className="flex justify-center mb-6">
                    <img
                    src={steps.find(step => step.id === activeStep)?.image}
                    alt={`Ilustración paso ${activeStep}`}
                    className="w-80 h-56 object-contain transition-all duration-500 ease-in-out transform hover:scale-105" // ⬅ Imagen más grande
                    />
                </div>

                <h3 className="text-2xl font-poppins font-bold text-[#2C3E50] mb-4 text-center">
                    {steps.find(step => step.id === activeStep)?.title}
                </h3>

                <p className="text-[#2C3E50] font-poppins leading-relaxed text-justify">
                    {steps.find(step => step.id === activeStep)?.description}
                </p>
                </div>
            </div>
            </div>
        </div>
      </section>

      {/* Lugares de Interés Section */}
      <section className="bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#2C3E50] mb-12 text-center">
            Lugares de Interés
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Container */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-b from-[#4A6B8A] to-[#2C3E50] rounded-lg p-6 shadow-lg">
                <img
                  src={mapaImg}
                  alt="Mapa de ubicaciones importantes para el trámite de Libreta Militar"
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="text-center mt-4">
                  <span className="text-[#32A5DD] font-poppins text-sm font-semibold">Mapa de ubicaciones</span>
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-100 rounded-lg p-6 h-full">
                <h3 className="text-xl font-poppins font-bold text-[#2C3E50] mb-6">
                  Lugares
                </h3>
                
                <ul className="text-left space-y-4">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#32A5DD] rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm font-poppins text-[#2C3E50]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#32A5DD] rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm font-poppins text-[#2C3E50]">
                      Donec volutpat, turpis id viverra pretium, leo risus
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#32A5DD] rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm font-poppins text-[#2C3E50]">
                      Sed vehicula euismod nisl, ac tristique diam iaculis
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#32A5DD] rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm font-poppins text-[#2C3E50]">
                      Nulla sit amet nisl a mauris tincidunt
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Modal - Actualizado para usuarios premium */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-poppins font-bold text-[#2C3E50] mb-4">
              {isPremium ? 'Asistente Personalizado' : 'Suscripción Premium'}
            </h3>
            <p className="text-[#2C3E50] mb-6">
              {isPremium 
                ? 'El asistente personalizado estará disponible próximamente. Te ayudará a crear una ruta específica para tu trámite.'
                : 'Accede a contenido exclusivo y herramientas avanzadas para gestionar tus trámites de manera más eficiente.'
              }
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cerrar
              </button>
              {!isPremium && (
                <Link
                  to="/premium"
                  className="flex-1 bg-[#32A5DD] text-white py-2 px-4 rounded-lg hover:bg-[#2891C7] transition-colors text-center"
                  onClick={handleCloseModal}
                >
                  Ver Planes
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LibretaMilitar; 