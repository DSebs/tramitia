interface TramiteCardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

const TramiteCard = ({ title, image, onClick }: TramiteCardProps) => {
  return (
    <button
      className="flex flex-col items-center w-full h-full bg-[radial-gradient(circle_at_60%_40%,_#FFFFFF_60%,_#F5F5F5_100%)] rounded-xl shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform hover:-translate-y-1 hover:shadow-lg"
      onClick={onClick}
      aria-label={`Consultar trámite: ${title}`}
      tabIndex={0}
      type="button"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-32 object-cover object-center rounded-t-xl"
        loading="lazy"
      />
      <div className="flex-1 flex items-center justify-center w-full p-4">
        <span className="font-poppins text-lg font-semibold text-[#2C3E50] text-center">
          {title}
        </span>
      </div>
    </button>
  );
};

export default TramiteCard; 