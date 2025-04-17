import React from 'react';
import Breadcrumbs from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <div className="mb-6 sticky top-20 md:top-0 bg-gray-50 pt-2 pb-4 z-10">
      <Breadcrumbs />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-0">{title}</h1>
        {actions && <div className="flex space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader; 