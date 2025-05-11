import tramitiaBanner from '../assets/branding/tramitiaBannerREC.png';

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center mt-6 px-2" id="servicio">
      <div className="bg-gradient-to-br from-white to-[#AED6F1] rounded-2xl shadow-xl px-4 sm:px-8 md:px-14 py-8 md:py-16 flex flex-col items-start max-w-5xl w-full min-h-[420px] md:min-h-[520px]">
        <img src={tramitiaBanner} alt="Logo de Tramitia, un avión de papel azul" className="w-48 sm:w-64 md:w-[420px] h-auto mb-6 self-start" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold mb-4 text-[#2C3E50] text-left w-full">
          Tu mejor aliado en tramites
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-poppins font-normal mb-8 md:mb-10 text-[#2C3E50] text-left w-full">
          Te guiamos con informacion clara y concisa<br />para que no te pierdas en tu proceso
        </p>
        <form className="w-full flex flex-col sm:flex-row items-stretch gap-3 mt-auto" role="search" aria-label="Buscador de trámites">
          <input
            type="text"
            placeholder="¿Qué buscas tramitar? (Ej: Libreta militar)"
            aria-label="Buscar trámite"
            className="flex-1 font-inter text-[#2C3E50] placeholder-gray-500 bg-white border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none px-5 py-3 sm:px-7 sm:py-4 text-base sm:text-xl outline-none shadow-sm focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="button"
            className="bg-blue-500 border border-blue-500 rounded-lg sm:rounded-l-none sm:rounded-r-lg px-5 py-3 sm:px-7 sm:py-4 text-white hover:bg-blue-600 transition-colors flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Buscar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero; 