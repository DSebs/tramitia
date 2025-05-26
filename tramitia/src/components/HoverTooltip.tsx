import { useState, useRef } from 'react';

interface HoverTooltipProps {
  term: string;
  explanation: string;
  children: React.ReactNode;
  className?: string;
}

const HoverTooltip = ({ term, explanation, children, className = '' }: HoverTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <span
        ref={elementRef}
        className={`relative cursor-help border-b border-dotted border-[#32A5DD] text-[#32A5DD] hover:text-[#2891C7] transition-colors ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      
      {isVisible && (
        <div
          className="fixed z-[100] bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
          <h4 className="font-poppins font-semibold text-[#2C3E50] text-sm mb-2">
            {term}
          </h4>
          <p className="font-poppins text-gray-600 text-xs leading-relaxed">
            {explanation}
          </p>
        </div>
      )}
    </>
  );
};

export default HoverTooltip; 