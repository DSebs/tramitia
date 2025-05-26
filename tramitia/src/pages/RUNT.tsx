import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HoverTooltip from '../components/HoverTooltip';
import { useAuth } from '../contexts/AuthContext';
import ventanillaDoodle from '../assets/RUNT/paso1_runt.png';
import biometricoDoodle from '../assets/RUNT/paso2_runt.png';
import runtImg from '../assets/imgTramites/runt.jpeg';
import pagoDoodle from '../assets/RUNT/paso3_runt.png';
import mapaImg from '../assets/LibretaMilitar/Mapa.png';

const RUNT = () => {
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
      title: "Reúne tus documentos y acércate a un organismo de tránsito",
      image: ventanillaDoodle,
      description: "Lleva tu cédula original (o pasaporte/cédula de extranjería si eres extranjero) a la Secretaría de Tránsito municipal o punto autorizado más cercano. No necesitas cita previa: solo debes estar presente físicamente, ya que el registro incluye toma de foto y huella digital."
    },
    {
      id: 2,
      title: "Registro en el sistema y toma de datos biométricos",
      image: biometricoDoodle,
      description: "En el punto de atención, el funcionario ingresará tus datos personales en el sistema del RUNT. Luego, te tomarán una foto y las huellas digitales. Este registro crea tu perfil único en la base de datos nacional."
    },
    {
      id: 3,
      title: "Realiza el pago y finaliza el registro",
      image: pagoDoodle,
      description: "El costo del registro varía según la ciudad, pero ronda los $15.000 a $20.000 COP. Puedes pagar en caja o datáfono según el punto de atención. Una vez finalizado el proceso, quedarás oficialmente inscrito en el RUNT y podrás avanzar con otros trámites de tránsito."
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
          style={{ backgroundImage: `url(${runtImg})` }}
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
                RUNT
              </h1>
              <p className="text-left text-lg sm:text-xl md:text-2xl font-inter font-semibold text-white mb-6 leading-relaxed">
              El RUNT (Registro Único Nacional de Tránsito) es la base de datos oficial que centraliza toda la información relacionada con vehículos, licencias de conducción, accidentes de tránsito, y más
              </p>
              
              {/* Difficulty Rating */}
              <div className="flex items-center gap-2 mb-8">
                <span className="text-white font-poppins font-semibold text-lg">DIFICULTAD:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-6 h-6 ${
                        star <= 3 ? 'text-yellow-400' : 'text-gray-400'
                      } fill-current`}
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
              
              <div className="space-y-6 text-[#2C3E50] font-poppins text-lg leading-relaxed text-left max-w-4xl">
                <p>

                El RUNT es la base de datos que valida tu información ante todos los organismos de tránsito; sin estar inscrito no puedes matricular vehículos, 
                sacar licencia ni pagar multas en línea. Desde 2025 el registro ciudadano cuesta $19 400 COP y se hace en cualquier 
                Ventanilla Única de Servicios (VUS) o Organismo de Tránsito. Debes llevar cédula original y pagar en caja; el analista toma tus biométricos y sube datos al sistema en menos de 10 minutos.
                Para consultas posteriores, ingresas gratis a <a href='https://runt.gov.co/'>runt.gov.co</a> y verificas vehículos, licencias o multas. 

                </p>
                
                <p>
                Además de ser obligatorio para acceder a trámites básicos de tránsito, el RUNT funciona como puente entre distintas entidades del Estado. 
                Por ejemplo, al tramitar tu licencia de conducción, los datos del RUNT se cruzan con los registros del Ministerio de Transporte, el <HoverTooltip 
                    term="SIMIT" 
                    explanation=" Sistema integrado de información sobre multas y sanciones por infracciones de tránsito."
                  >
                    SIMIT
                  </HoverTooltip> y la <HoverTooltip 
                    term="DIAN" 
                    explanation="Dirección de impuestos y aduanas nacionales."
                  >
                    DIAN
                  </HoverTooltip> para validar identidad, comparendos, 
                y estado de impuestos vehiculares. También facilita la trazabilidad de vehículos usados, pues te permite saber si un carro tiene embargo, mora en <HoverTooltip 
                    term="SOAT" 
                    explanation="Seguro obligatorio de accidentes de tránsito."
                  >
                    SOAT
                  </HoverTooltip> o revisión técnico-mecánica vencida. Estar inscrito en el RUNT es estar formalmente dentro del sistema de movilidad del país: sin este registro, simplemente no existes en el mundo del tránsito colombiano.
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
                      <h4 className="font-semibold mb-2">Ministerio de Transporte</h4>
                      <p className="text-sm opacity-90">
                      Entidad encargada de reglamentar y supervisar el funcionamiento del RUNT a nivel nacional.
                      Define las políticas públicas de movilidad y tránsito terrestre.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Agencia Nacional de Seguridad Vial</h4>
                      <p className="text-sm opacity-90">
                      Vigila que los datos del RUNT contribuyan a mejorar la seguridad vial en Colombia. 
                      Usa la información para planificar campañas y acciones de prevención.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Secretarías de Tránsito Municipales</h4>
                      <p className="text-sm opacity-90">
                      Son las encargadas de inscribir a los ciudadanos en el RUNT de forma presencial. 
                      También usan el sistema para validar y registrar trámites locales como licencias, matrículas y comparendos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Requirements */}
              <div className="bg-gradient-to-b from-[#648DB6] to-[#2C3E50] text-white rounded-lg p-6">
                <h3 className="text-xl font-poppins font-bold mb-6 text-left">
                  Documentos Requeridos
                </h3>
                
                <ul className="text-left space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm">Cedula de ciudadania</span>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Timeline */}
            <div className="relative">
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 cursor-pointer transition-all duration-300 ${
                      activeStep === step.id ? 'transform scale-105' : ''
                    }`}
                    onMouseEnter={() => setActiveStep(step.id)}
                  >
                    {/* Step Number */}
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
                      activeStep === step.id 
                        ? 'bg-[#32A5DD] shadow-lg transform scale-110' 
                        : index + 1 <= activeStep 
                          ? 'bg-[#32A5DD]' 
                          : 'bg-[#2C3E50]'
                    }`}>
                      {step.id}
                    </div>
                    
                    {/* Step Content */}
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
                    className="w-64 h-48 object-contain transition-all duration-500 ease-in-out transform hover:scale-105"
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
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-[#2C3E50] mb-12 text-center">
            Lugares de Interés
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Container */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-b from-[#4A6B8A] to-[#2C3E50] rounded-lg p-6 shadow-lg">
                <img
                  src={mapaImg}
                  alt="Mapa de ubicaciones importantes para el trámite del RUNT"
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
                    Dirección Territorial Tolima, Ministerio de Transporte, Cra. 5 #61, Ibagué, Tolima
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#32A5DD] rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-sm font-poppins text-[#2C3E50]">
                    Secretaría De Tránsito, Transporte Y De La Movilidad, Cra. 23 Sur #87, Ibagué, Tolima
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

export default RUNT; 