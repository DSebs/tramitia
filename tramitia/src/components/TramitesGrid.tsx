import { useNavigate } from 'react-router-dom';
import TramiteCard from './TramiteCard';
import libretaMilitarImg from '../assets/imgTramites/Libreta Militar.jpg';
import pasaporteImg from '../assets/imgTramites/Pasaporte.jpeg';
import licenciaImg from '../assets/imgTramites/Licencia.jpg';
import runtImg from '../assets/imgTramites/Renta.jpeg';
import seguroMedicoImg from '../assets/imgTramites/Seguro Medico.jpg';
import creditoImg from '../assets/imgTramites/Credito.jpeg';

const tramites = [
  { title: 'Libreta Militar', image: libretaMilitarImg },
  { title: 'Pasaporte', image: pasaporteImg },
  { title: 'Licencia de Conduccion', image: licenciaImg },
  { title: 'RUNT', image: runtImg },
  { title: 'Seguro Medico', image: seguroMedicoImg },
  { title: 'Vida Crediticia', image: creditoImg },
];

const TramitesGrid = () => {
  const navigate = useNavigate();

  const handleTramiteClick = (tramiteTitle: string) => {
    if (tramiteTitle === 'Libreta Militar') {
      navigate('/tramites/libreta-militar');
    } else if (tramiteTitle === 'RUNT') {
      navigate('/tramites/runt');
    } else {
      console.log(`Ir a sección de ${tramiteTitle}`);
    }
  };

  return (
    <section id="consultados" className="w-full flex flex-col items-center justify-center mt-28 px-2">
      <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#2C3E50] mb-8 text-center">
        ¡LOS MÁS CONSULTADOS!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {tramites.map((tramite) => (
          <TramiteCard
            key={tramite.title}
            title={tramite.title}
            image={tramite.image}
            onClick={() => handleTramiteClick(tramite.title)}
          />
        ))}
      </div>
    </section>
  );
};

export default TramitesGrid; 