const AboutUs = () => {
  return (
    <section id="nosotros" className="w-screen max-w-none min-h-[55vh] flex justify-center items-center pt-32 pb-24 md:pt-40 md:pb-32 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]" style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', marginTop: '6rem' }}>
      {/* Fondo absoluto para cubrir toda la sección */}
      <div className="absolute inset-0 w-full h-full bg-[#2C3E50] z-0" aria-hidden="true" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto px-4 gap-10 md:gap-20">
        <h2
          className="font-poppins text-5xl sm:text-7xl md:text-8xl font-bold text-left bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-[length:200%_auto] bg-clip-text text-transparent select-none leading-tight animate-gradient-x"
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          ¿Quienes Somos?
        </h2>
        <p className="font-inter text-lg text-white max-w-md text-left leading-relaxed py-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisi nisi euismod euismod, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisi nisi euismod euismod, euismod euismod nisi nisi euismod.
        </p>
      </div>
      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default AboutUs; 