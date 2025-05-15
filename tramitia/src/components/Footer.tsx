const Footer = () => {
  return (
    <footer className="w-screen max-w-none py-10 flex items-center justify-center bg-[#648DB6] text-center text-2xl md:text-4xl font-poppins relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden" style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', marginBottom: 0 }}>
      <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
        Desarrollado por Tramitia Dev Team
      </span>
      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite alternate;
        }
      `}</style>
    </footer>
  );
};

export default Footer; 