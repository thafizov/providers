import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-6 text-center">
        <div>
          <h1 className="text-7xl sm:text-9xl font-bold text-blue-500">404</h1>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-900">Страница не найдена</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Запрашиваемая страница не существует или была перемещена.
          </p>
        </div>
        <div className="mt-6 sm:mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Вернуться на главную страницу"
          >
            <span className="material-icons-outlined mr-2">home</span>
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 