import React from 'react';
import PageHeader from '../components/PageHeader';

const Reports: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageHeader title="Отчёты" />
      
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="bg-indigo-50 p-4 rounded-full mb-6">
            <span className="material-icons-outlined text-indigo-500 text-5xl">analytics</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Раздел находится в разработке
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-lg">
            В настоящее время мы работаем над этим разделом. В будущем здесь вы сможете просматривать и настраивать различные отчеты по вашим операциям и анализировать эффективность работы.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mb-8">
            <div className="bg-gray-50 p-5 rounded-lg text-left">
              <div className="flex items-center mb-3">
                <span className="material-icons-outlined text-purple-500 mr-2">insert_chart</span>
                <h3 className="text-gray-800 font-medium">Финансовая аналитика</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Полная финансовая статистика, графики доходности и анализ тенденций
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg text-left">
              <div className="flex items-center mb-3">
                <span className="material-icons-outlined text-teal-500 mr-2">schedule</span>
                <h3 className="text-gray-800 font-medium">Периодические отчеты</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Настраиваемые ежедневные, еженедельные и ежемесячные отчеты
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg text-left">
              <div className="flex items-center mb-3">
                <span className="material-icons-outlined text-amber-500 mr-2">summarize</span>
                <h3 className="text-gray-800 font-medium">Сводная статистика</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Сводная статистика по различным платежным методам и картам
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg text-left">
              <div className="flex items-center mb-3">
                <span className="material-icons-outlined text-blue-500 mr-2">cloud_download</span>
                <h3 className="text-gray-800 font-medium">Экспорт данных</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Экспорт отчетов в различных форматах: CSV, XLS, PDF
              </p>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Ожидаемая дата запуска: <span className="font-semibold">Скоро</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 