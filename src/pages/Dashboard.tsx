import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

interface CardStats {
  id: string;
  cardId: string;
  bankName: string;
  dailyPayments: number;
  successRate: number;
  failedRate: number;
  balance: number;
}

// Примерные данные для демонстрации
const mockCardStats: CardStats[] = [
  {
    id: '1',
    cardId: '1278',
    bankName: 'Сбер',
    dailyPayments: 42,
    successRate: 95,
    failedRate: 5,
    balance: 156800,
  },
  {
    id: '2',
    cardId: '5678',
    bankName: 'Альфа',
    dailyPayments: 27,
    successRate: 88,
    failedRate: 12,
    balance: 98500,
  },
  {
    id: '3',
    cardId: '9012',
    bankName: 'Тинькофф',
    dailyPayments: 35,
    successRate: 92,
    failedRate: 8,
    balance: 124300,
  },
  {
    id: '4',
    cardId: '3456',
    bankName: 'ВТБ',
    dailyPayments: 19,
    successRate: 100,
    failedRate: 0,
    balance: 76200,
  },
];

// Сводная статистика
const totalDailyPayments = mockCardStats.reduce((sum, card) => sum + card.dailyPayments, 0);
const totalBalance = mockCardStats.reduce((sum, card) => sum + card.balance, 0);
const avgSuccessRate = Math.round(
  mockCardStats.reduce((sum, card) => sum + card.successRate, 0) / mockCardStats.length
);

// Цвета для карточек разных банков
const bankColors: Record<string, { bg: string, accent: string, pattern: string }> = {
  'Сбер': { 
    bg: 'from-green-500 to-green-700',
    accent: 'bg-green-400',
    pattern: 'bg-green-600'
  },
  'Альфа': { 
    bg: 'from-red-500 to-red-700',
    accent: 'bg-red-400',
    pattern: 'bg-red-600'
  },
  'Тинькофф': { 
    bg: 'from-yellow-500 to-yellow-700',
    accent: 'bg-yellow-400',
    pattern: 'bg-yellow-600'
  },
  'ВТБ': { 
    bg: 'from-blue-500 to-blue-700',
    accent: 'bg-blue-400',
    pattern: 'bg-blue-600'
  },
};

const StatCard: React.FC<{ stats: CardStats }> = ({ stats }) => {
  const colors = bankColors[stats.bankName] || { 
    bg: 'from-gray-500 to-gray-700',
    accent: 'bg-gray-400',
    pattern: 'bg-gray-600'
  };
  
  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl shadow-md overflow-hidden h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      {/* Декоративные элементы для стиля банковской карты */}
      <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"></div>
      <div className="absolute bottom-16 left-4 w-10 h-6 rounded-md bg-white/20 backdrop-blur-sm"></div>
      <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full ${colors.pattern} opacity-10`}></div>
      
      <div className="p-6 h-full flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              {stats.bankName} {stats.cardId}
            </h3>
            <span className={`px-3 py-1 ${colors.accent} text-white text-xs font-medium rounded-full`}>
              {stats.dailyPayments} платежей
            </span>
          </div>
        </div>
        
        <div className="space-y-4 mb-6 z-10">
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-medium text-white/70">Успешные</div>
              <div className="text-xs font-semibold text-white">{stats.successRate}%</div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-black/20">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white/40"
                style={{ width: `${stats.successRate}%` }}
              ></div>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-medium text-white/70">Неудачные</div>
              <div className="text-xs font-semibold text-white">{stats.failedRate}%</div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-black/20">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white/20"
                style={{ width: `${stats.failedRate}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/20">
          <div className="text-sm text-white/70 mb-1">Текущий баланс</div>
          <div className="text-2xl font-bold text-white">
            {stats.balance.toLocaleString('ru-RU')} ₽
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{ title: string; value: string; icon: string; color: string }> = ({ 
  title, value, icon, color 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <span className="material-icons-outlined text-white">{icon}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  
  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    
    // Не позволяем выбрать дату из будущего
    if (newDate <= new Date()) {
      setCurrentDate(newDate);
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
  const dateElement = (
    <div className="flex items-center text-sm bg-white rounded-lg shadow-sm">
      <button 
        onClick={handlePrevDay}
        className="px-3 py-2 hover:bg-gray-50 rounded-l-lg transition-colors"
        aria-label="Предыдущий день"
      >
        <span className="material-icons-outlined text-gray-500">chevron_left</span>
      </button>
      
      <span className="px-3 py-2 font-medium">
        {isToday(currentDate) ? 'Сегодня' : formatDate(currentDate)}
      </span>
      
      <button 
        onClick={handleNextDay}
        className={`px-3 py-2 rounded-r-lg transition-colors ${
          isToday(currentDate) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-500'
        }`}
        disabled={isToday(currentDate)}
        aria-label="Следующий день"
      >
        <span className="material-icons-outlined">chevron_right</span>
      </button>
    </div>
  );

  return (
    <div>
      <PageHeader title="Дашборд" actions={dateElement} />
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          title="Всего транзакций сегодня"
          value={`${totalDailyPayments}`}
          icon="payments"
          color="bg-blue-500"
        />
        <SummaryCard
          title="Общий баланс"
          value={`${totalBalance.toLocaleString('ru-RU')} ₽`}
          icon="account_balance"
          color="bg-purple-500"
        />
        <SummaryCard
          title="Средний % успешных платежей"
          value={`${avgSuccessRate}%`}
          icon="verified"
          color="bg-green-500"
        />
      </div>
      
      {/* Card stats */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Состояние платежных карт</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockCardStats.map(stats => (
          <StatCard key={stats.id} stats={stats} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 