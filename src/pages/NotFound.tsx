import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <span className="material-icons-outlined text-red-500 text-6xl">error_outline</span>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Страница не найдена</h2>
      
      <p className="text-gray-600 mb-8 max-w-md">
        Извините, но страница, которую вы пытаетесь найти, не существует или была перемещена.
      </p>
      
      <div className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-medium rounded-lg transition-colors hover:bg-blue-700"
        >
          <span className="material-icons-outlined mr-2">home</span>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 