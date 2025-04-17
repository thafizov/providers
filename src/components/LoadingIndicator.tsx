import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'medium', 
  fullScreen = false,
  text = 'Загрузка...'
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-6 h-6 sm:w-8 sm:h-8 border-2 sm:border-3',
    large: 'w-10 h-10 sm:w-12 sm:h-12 border-3 sm:border-4',
  };

  const baseClasses = `
    animate-spin
    rounded-full
    border-blue-500
    border-t-transparent
    ${sizeClasses[size]}
  `;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <div className={baseClasses} />
        {text && <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">{text}</p>}
      </div>
    );
  }

  return <div className={baseClasses} />;
};

export default LoadingIndicator; 