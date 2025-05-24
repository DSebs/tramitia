import { useNavigate } from 'react-router-dom';
import PricingCard from './PricingCard';

const plans = [
  {
    title: 'Plan Gratuito',
    price: '$0 - Cero pollito',
    currency: 'COP',
    period: 'mensual',
    benefits: [
      { text: 'Acceso a la informacion de todos los tramites', included: true },
      { text: 'Asistente de diagnostico con ruta personalizada', included: false },
      { text: 'Gestor de carpetas y checklist para documentos y formularios', included: false },
      { text: 'Configuracion de recordatorios y alertas para fechas criticas', included: false },
    ],
    buttonText: 'Acceder',
    buttonColor: 'bg-[#2C3E50] text-[#DFFFD8] hover:bg-[#4B6A89] hover:text-[#f5ffe6]',
    highlighted: false,
  },
  {
    title: 'Plan Premium',
    price: '$ 18.000 / mes',
    currency: 'COP',
    period: 'mensual',
    benefits: [
      { text: 'Acceso a la informacion de todos los tramites', included: true },
      { text: 'Asistente de diagnostico con ruta personalizada', included: true },
      { text: 'Gestor de carpetas y checklist para documentos y formularios', included: true },
      { text: 'Configuracion de recordatorios y alertas para fechas criticas', included: true },
    ],
    buttonText: 'Suscríbete a Premium',
    buttonColor: 'bg-[#2C3E50] text-[#DFFFD8] hover:bg-[#4B6A89] hover:text-[#f5ffe6]',
    highlighted: true,
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  const handlePlanClick = (planTitle: string) => {
    switch (planTitle) {
      case 'Plan Premium':
        navigate('/premium');
        break;
      case 'Plan Gratuito':
        navigate('/login');
        break;
      default:
        break;
    }
  };

  return (
    <section className="w-screen max-w-none min-h-[70vh] flex flex-col items-center justify-center py-24 md:py-32 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]" style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
      {/* Fondo gradiente absoluto */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#2C3E50] to-[#648DB6] z-0" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">¿Necesitas mas ayuda?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-stretch justify-center">
          {plans.map((plan) => (
            <div key={plan.title} className="flex justify-center">
              <div className="w-full max-w-md transition-transform hover:-translate-y-1 hover:shadow-2xl">
                <PricingCard {...plan} onClick={() => handlePlanClick(plan.title)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 