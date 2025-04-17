import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-blue-500">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Страница не найдена</h2>
          <p className="mt-2 text-base text-gray-500">
            Запрашиваемая страница не существует или была перемещена.
          </p>
        </div>
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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