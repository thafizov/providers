import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

interface CardStats {
  id: string;
  cardId: string;
  bankName: string;
  successOrders: number;
  failedOrders: number;
  turnover: number;
  balance: number;
}

// Примерные данные для демонстрации
const mockCardStats: Record<string, CardStats[]> = {
  day: [
    {
      id: '1',
      cardId: '1278',
      bankName: 'Сбер',
      successOrders: 42,
      failedOrders: 2,
      turnover: 156800,
      balance: 356800,
    },
    {
      id: '2',
      cardId: '5678',
      bankName: 'Альфа',
      successOrders: 27,
      failedOrders: 3,
      turnover: 98500,
      balance: 248500,
    },
    {
      id: '3',
      cardId: '9012',
      bankName: 'Тинькофф',
      successOrders: 35,
      failedOrders: 3,
      turnover: 124300,
      balance: 524300,
    },
  ],
  week: [
    {
      id: '1',
      cardId: '1278',
      bankName: 'Сбер',
      successOrders: 152,
      failedOrders: 8,
      turnover: 856800,
      balance: 356800,
    },
    {
      id: '2',
      cardId: '5678',
      bankName: 'Альфа',
      successOrders: 97,
      failedOrders: 12,
      turnover: 398500,
      balance: 248500,
    },
    {
      id: '3',
      cardId: '9012',
      bankName: 'Тинькофф',
      successOrders: 105,
      failedOrders: 9,
      turnover: 624300,
      balance: 524300,
    },
    {
      id: '4',
      cardId: '3456',
      bankName: 'ВТБ',
      successOrders: 87,
      failedOrders: 5,
      turnover: 476200,
      balance: 176200,
    },
  ],
  month: [
    {
      id: '1',
      cardId: '1278',
      bankName: 'Сбер',
      successOrders: 352,
      failedOrders: 18,
      turnover: 2856800,
      balance: 356800,
    },
    {
      id: '2',
      cardId: '5678',
      bankName: 'Альфа',
      successOrders: 297,
      failedOrders: 22,
      turnover: 1398500,
      balance: 248500,
    },
    {
      id: '3',
      cardId: '9012',
      bankName: 'Тинькофф',
      successOrders: 305,
      failedOrders: 19,
      turnover: 1624300,
      balance: 524300,
    },
    {
      id: '4',
      cardId: '3456',
      bankName: 'ВТБ',
      successOrders: 287,
      failedOrders: 15,
      turnover: 1476200,
      balance: 176200,
    },
    {
      id: '5',
      cardId: '7891',
      bankName: 'Газпромбанк',
      successOrders: 187,
      failedOrders: 12,
      turnover: 876200,
      balance: 276200,
    },
  ],
  all: [
    {
      id: '1',
      cardId: '1278',
      bankName: 'Сбер',
      successOrders: 952,
      failedOrders: 48,
      turnover: 12856800,
      balance: 356800,
    },
    {
      id: '2',
      cardId: '5678',
      bankName: 'Альфа',
      successOrders: 597,
      failedOrders: 62,
      turnover: 7398500,
      balance: 248500,
    },
    {
      id: '3',
      cardId: '9012',
      bankName: 'Тинькофф',
      successOrders: 805,
      failedOrders: 49,
      turnover: 8624300,
      balance: 524300,
    },
    {
      id: '4',
      cardId: '3456',
      bankName: 'ВТБ',
      successOrders: 687,
      failedOrders: 35,
      turnover: 6476200,
      balance: 176200,
    },
    {
      id: '5',
      cardId: '7891',
      bankName: 'Газпромбанк',
      successOrders: 487,
      failedOrders: 32,
      turnover: 4876200,
      balance: 276200,
    },
  ]
};

// Цвета для карточек разных банков
const bankColors: Record<string, { bg: string, accent: string, logo: string }> = {
  'Сбер': { 
    bg: 'from-green-50 to-green-100',
    accent: 'bg-green-500',
    logo: 'bg-green-600'
  },
  'Альфа': { 
    bg: 'from-red-50 to-red-100',
    accent: 'bg-red-500',
    logo: 'bg-red-600'
  },
  'Тинькофф': { 
    bg: 'from-yellow-50 to-yellow-100',
    accent: 'bg-yellow-500',
    logo: 'bg-yellow-600'
  },
  'ВТБ': { 
    bg: 'from-blue-50 to-blue-100',
    accent: 'bg-blue-500',
    logo: 'bg-blue-600'
  },
  'Газпромбанк': { 
    bg: 'from-indigo-50 to-indigo-100',
    accent: 'bg-indigo-500',
    logo: 'bg-indigo-600'
  },
};

type TimePeriod = 'day' | 'week' | 'month' | 'all';

const BankCard: React.FC<{ stats: CardStats }> = ({ stats }) => {
  const colors = bankColors[stats.bankName] || { 
    bg: 'from-gray-50 to-gray-100',
    accent: 'bg-gray-500',
    logo: 'bg-gray-600'
  };
  
  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)} млн ₽`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)} тыс ₽`;
    } else {
      return `${amount} ₽`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full border border-gray-100 h-full">
      <div className="p-4 sm:p-5 flex flex-col h-full">
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md text-white ${colors.logo} mr-2 sm:mr-3`}>
              {stats.bankName.charAt(0)}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {stats.bankName} {stats.cardId}
              </h3>
            </div>
          </div>
        </div>
        
        {/* Баланс (самый важный показатель) */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Текущий баланс</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">
            {formatAmount(stats.balance)}
          </div>
        </div>
        
        {/* Оборот */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs sm:text-sm font-medium text-gray-500">Оборот</div>
            <div className="text-base sm:text-lg font-semibold text-gray-800">{formatAmount(stats.turnover)}</div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1">
            <div 
              className={`${colors.accent} h-1 rounded-full`} 
              style={{ width: `${Math.min(100, stats.turnover / 500000 * 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Количество ордеров */}
        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-50 p-2 rounded-lg h-16 flex flex-col justify-center">
              <div className="text-2xs sm:text-xs text-green-600 mb-1">Успешные</div>
              <div className="text-sm sm:text-base font-semibold text-green-700">{stats.successOrders}</div>
            </div>
            <div className="bg-red-50 p-2 rounded-lg h-16 flex flex-col justify-center">
              <div className="text-2xs sm:text-xs text-red-600 mb-1">Неуспешные</div>
              <div className="text-sm sm:text-base font-semibold text-red-700">{stats.failedOrders}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: string; 
  color: string;
  subValue?: string;
  subLabel?: string;
}> = ({ 
  title, 
  value, 
  icon, 
  color,
  subValue,
  subLabel
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full h-full flex flex-col">
      <div className="flex items-start">
        <div className={`p-2 sm:p-3 rounded-lg ${color} flex-shrink-0`}>
          <span className="material-icons-outlined text-white text-base sm:text-xl">{icon}</span>
        </div>
        <div className="ml-3 sm:ml-4 min-w-0 flex-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{value}</p>
          {subValue && subLabel && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              <span className="font-medium">{subValue}</span> {subLabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const TimePeriodSelector: React.FC<{
  currentPeriod: TimePeriod;
  onChange: (period: TimePeriod) => void;
}> = ({ currentPeriod, onChange }) => {
  return (
    <div className="inline-flex bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0 max-w-full">
      <button 
        onClick={() => onChange('day')}
        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
          currentPeriod === 'day' 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        Сегодня
      </button>
      <button 
        onClick={() => onChange('week')}
        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
          currentPeriod === 'week' 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        Неделя
      </button>
      <button 
        onClick={() => onChange('month')}
        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
          currentPeriod === 'month' 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        Месяц
      </button>
      <button 
        onClick={() => onChange('all')}
        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
          currentPeriod === 'all' 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        Всё время
      </button>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod>('day');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const handlePeriodChange = (period: TimePeriod) => {
    setCurrentPeriod(period);
  };
  
  // Получаем статистику для текущего выбранного периода
  const currentStats = mockCardStats[currentPeriod];
  
  // Вычисляем сводные данные для текущего периода
  const totalTurnover = currentStats.reduce((sum, card) => sum + card.turnover, 0);
  const totalSuccessOrders = currentStats.reduce((sum, card) => sum + card.successOrders, 0);
  const totalFailedOrders = currentStats.reduce((sum, card) => sum + card.failedOrders, 0);
  const totalBalance = currentStats.reduce((sum, card) => sum + card.balance, 0);
  
  // Форматирование суммы для сводных карточек
  const formatTotal = (amount: number) => {
    return amount.toLocaleString('ru-RU') + ' ₽';
  };
  
  // Компонент для периода времени в заголовке
  const periodElement = (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
      <TimePeriodSelector 
        currentPeriod={currentPeriod} 
        onChange={handlePeriodChange} 
      />
      <button 
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="flex items-center text-xs sm:text-sm bg-white rounded-lg shadow-sm px-3 py-2 text-gray-700 hover:bg-gray-50 whitespace-nowrap flex-shrink-0"
      >
        <span className="material-icons-outlined mr-1 text-gray-500 text-sm">date_range</span>
        <span>Выбрать дату</span>
      </button>
    </div>
  );

  return (
    <div>
      <PageHeader title="Дашборд" actions={periodElement} />
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="h-full">
          <SummaryCard
            title="Оборот"
            value={formatTotal(totalTurnover)}
            subValue={`${currentStats.length}`}
            subLabel="активных карт"
            icon="payments"
            color="bg-blue-500"
          />
        </div>
        <div className="h-full">
          <SummaryCard
            title="Успешные операции"
            value={`${totalSuccessOrders}`}
            subValue={`${(totalSuccessOrders / (totalSuccessOrders + totalFailedOrders) * 100).toFixed(1)}%`}
            subLabel="успешных транзакций"
            icon="check_circle"
            color="bg-green-500"
          />
        </div>
        <div className="h-full">
          <SummaryCard
            title="Неуспешные операции"
            value={`${totalFailedOrders}`}
            icon="error"
            color="bg-red-500"
          />
        </div>
        <div className="h-full">
          <SummaryCard
            title="Общий баланс"
            value={formatTotal(totalBalance)}
            icon="account_balance"
            color="bg-purple-500"
          />
        </div>
      </div>
      
      {/* Bank Cards heading */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Карты банков</h2>
        <div className="text-sm text-gray-500">Всего: {currentStats.length}</div>
      </div>
      
      {/* Bank Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentStats.map(card => (
          <BankCard key={card.id} stats={card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 