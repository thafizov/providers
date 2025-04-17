import React from 'react';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <div className="mb-6 sticky top-0 z-10 bg-gray-50 pt-4 pb-2 md:pb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-0">{title}</h1>
        {actions && (
          <div className="flex w-full md:w-auto overflow-x-auto md:overflow-visible pb-2 md:pb-0 no-scrollbar">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 