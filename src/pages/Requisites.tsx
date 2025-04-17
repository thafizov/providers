import React from 'react';
import PageHeader from '../components/PageHeader';

const Requisites: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageHeader title="Реквизиты" />
      
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="bg-blue-50 p-4 rounded-full mb-6">
            <span className="material-icons-outlined text-blue-500 text-5xl">construction</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Раздел находится в разработке
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-lg">
            В настоящее время мы работаем над этим разделом. Здесь вы сможете добавлять и управлять своими платежными реквизитами для различных валют и платежных систем.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8 w-full max-w-md">
            <h3 className="text-sm uppercase text-gray-500 font-semibold mb-4">Планируемый функционал</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="material-icons-outlined text-green-500 mr-2">check_circle</span>
                <span className="text-left">Добавление банковских реквизитов</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="material-icons-outlined text-green-500 mr-2">check_circle</span>
                <span className="text-left">Привязка электронных кошельков</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="material-icons-outlined text-green-500 mr-2">check_circle</span>
                <span className="text-left">Настройка криптовалютных адресов</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="material-icons-outlined text-green-500 mr-2">check_circle</span>
                <span className="text-left">Управление платежными методами</span>
              </li>
            </ul>
          </div>
          
          <div className="text-sm text-gray-500">
            Ожидаемая дата запуска: <span className="font-semibold">Скоро</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requisites; 