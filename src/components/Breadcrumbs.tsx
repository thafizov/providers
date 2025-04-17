import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Словарь с русскими названиями страниц
  const pathTranslations: Record<string, string> = {
    'dashboard': 'Дашборд',
    'orders': 'Список ордеров',
    'wallet': 'Кошелек',
    'requisites': 'Реквизиты',
    'reports': 'Отчёты',
  };

  // Если нет путей, т.е. главная страница, показываем только "Дашборд"
  if (pathnames.length === 0) {
    return (
      <nav className="mb-2 sm:mb-4" aria-label="Breadcrumbs">
        <ol className="flex items-center text-xs sm:text-sm text-gray-500">
          <li>
            <span className="font-medium text-gray-700">Дашборд</span>
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav className="mb-2 sm:mb-4 overflow-x-auto pb-1 whitespace-nowrap" aria-label="Breadcrumbs">
      <ol className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
        <li>
          <Link 
            to="/" 
            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
            aria-label="Перейти на главную"
          >
            <span className="material-icons-outlined text-base sm:text-lg">home</span>
          </Link>
        </li>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <React.Fragment key={routeTo}>
              <li>
                <span className="material-icons-outlined text-gray-400" style={{ fontSize: '12px' }}>
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