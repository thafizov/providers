import React from 'react';
import Breadcrumbs from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <div className="mb-6">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">{title}</h1>
        {actions && <div className="flex space-x-2">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader; 