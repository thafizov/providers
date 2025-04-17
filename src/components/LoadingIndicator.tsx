import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'medium', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  const baseClasses = `
    animate-spin
    rounded-full
    border-blue-400
    border-t-transparent
    ${sizeClasses[size]}
  `;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
        <div className={baseClasses} />
      </div>
    );
  }

  return <div className={baseClasses} />;
};

export default LoadingIndicator; 