interface Benefit {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  currency: string;
  period: string;
  benefits: Benefit[];
  buttonText: string;
  buttonColor: string;
  highlighted?: boolean;
  onClick?: () => void;
}

const PricingCard = ({
  title,
  price,
  currency,
  period,
  benefits,
  buttonText,
  buttonColor,
  highlighted = false,
  onClick,
}: PricingCardProps) => {
  return (
    <div className={`flex flex-col bg-white rounded-xl shadow-lg p-8 md:p-12 w-full max-w-md border ${highlighted ? 'border-blue-400' : 'border-gray-200'} transition-transform hover:-translate-y-1 hover:shadow-2xl`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-poppins text-2xl font-semibold text-[#2C3E50]">{title}</span>
        <span className="text-xs font-inter border border-gray-400 rounded-full px-3 py-0.5 text-[#2C3E50] bg-white">{period}</span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="font-poppins text-3xl font-bold text-[#2C3E50]">{price}</span>
        <span className="font-poppins text-xl font-bold text-[#2C3E50]">{currency}</span>
      </div>
      <ul className="flex-1 mb-6 mt-2 space-y-3">
        {benefits.map((b, i) => (
          <li key={i} className={`flex items-center gap-2 text-left font-inter text-base ${b.included ? 'text-[#2C3E50]' : 'text-gray-400 line-through'}`}>
            {b.included ? (
              <span className="text-green-500">&#10003;</span>
            ) : (
              <span className="text-gray-400">&#10007;</span>
            )}
            {b.text}
          </li>
        ))}
      </ul>
      <button
        className={`mt-auto w-full py-3 rounded-lg font-nunito font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${buttonColor}`}
        type="button"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard; 