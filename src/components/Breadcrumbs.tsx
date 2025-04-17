import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Словарь с русскими названиями страниц
  const pathTranslations: Record<string, string> = {
    'orders': 'Список ордеров',
    'requisites': 'Реквизиты',
    'reports': 'Отчёты',
  };

  return (
    <nav className="mb-4" aria-label="Breadcrumbs">
      <ol className="flex items-center space-x-1 text-sm text-gray-500">
        <li>
          <Link 
            to="/" 
            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
            aria-label="Перейти на главную"
          >
            <span className="material-icons-outlined text-lg">home</span>
          </Link>
        </li>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <React.Fragment key={routeTo}>
              <li>
                <span className="material-icons-outlined text-gray-400" style={{ fontSize: '14px' }}>
                  chevron_right
                </span>
              </li>
              <li>
                {isLast ? (
                  <span className="font-medium text-gray-700">
                    {pathTranslations[name] || name}
                  </span>
                ) : (
                  <Link 
                    to={routeTo} 
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {pathTranslations[name] || name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 