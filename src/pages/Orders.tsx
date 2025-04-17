import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';

interface Order {
  id: string;
  date: string;
  cardId: string;
  bankName: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
}

// Примерные данные для демонстрации
const mockOrders: Order[] = [
  {
    id: 'ORD-001234',
    date: '2025-04-17 09:25:43',
    cardId: '1278',
    bankName: 'Сбер',
    amount: 4500,
    status: 'success',
  },
  {
    id: 'ORD-001235',
    date: '2025-04-17 10:15:22',
    cardId: '5678',
    bankName: 'Альфа',
    amount: 12800,
    status: 'failed',
  },
  {
    id: 'ORD-001236',
    date: '2025-04-17 11:05:57',
    cardId: '9012',
    bankName: 'Тинькофф',
    amount: 7650,
    status: 'pending',
  },
  {
    id: 'ORD-001237',
    date: '2025-04-17 12:32:10',
    cardId: '3456',
    bankName: 'ВТБ',
    amount: 19200,
    status: 'success',
  },
  {
    id: 'ORD-001238',
    date: '2025-04-17 13:45:33',
    cardId: '1278',
    bankName: 'Сбер',
    amount: 3100,
    status: 'success',
  },
  {
    id: 'ORD-001239',
    date: '2025-04-17 14:20:15',
    cardId: '5678',
    bankName: 'Альфа',
    amount: 8900,
    status: 'failed',
  },
  {
    id: 'ORD-001240',
    date: '2025-04-17 15:10:48',
    cardId: '9012',
    bankName: 'Тинькофф',
    amount: 5400,
    status: 'pending',
  },
];

// Сводные данные
const ordersTotalAmount = mockOrders.reduce((sum, order) => sum + order.amount, 0);
const successfulOrdersCount = mockOrders.filter(order => order.status === 'success').length;
const failedOrdersCount = mockOrders.filter(order => order.status === 'failed').length;

type SortField = 'id' | 'date' | 'amount';
type SortDirection = 'asc' | 'desc';

const OrderStatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const styles = {
    success: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  const labels = {
    success: 'Успешно',
    failed: 'Ошибка',
    pending: 'В обработке',
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

// Компонент для отображения карточки заказа на мобильных устройствах
const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const dateObj = new Date(order.date);
  const formattedDate = dateObj.toLocaleDateString('ru-RU');
  const formattedTime = dateObj.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">{order.id}</h3>
        <OrderStatusBadge status={order.status} />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-500 mb-1">Дата</div>
          <div className="font-medium">
            {formattedDate} <span className="text-gray-500">{formattedTime}</span>
          </div>
        </div>
        
        <div>
          <div className="text-gray-500 mb-1">Карта</div>
          <div className="font-medium">{order.bankName} {order.cardId}</div>
        </div>
        
        <div className="col-span-2">
          <div className="text-gray-500 mb-1">Сумма</div>
          <div className="text-lg font-bold text-gray-900">{order.amount.toLocaleString('ru-RU')} ₽</div>
        </div>
      </div>
    </div>
  );
};

const Orders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as Order['status'] | 'all');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleMinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinAmount(e.target.value);
  };
  
  const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxAmount(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to desc for new field
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) {
      return 'unfold_more';
    }
    return sortDirection === 'asc' ? 'expand_less' : 'expand_more';
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...mockOrders];

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Filter by amount
    if (minAmount) {
      const min = parseInt(minAmount, 10);
      if (!isNaN(min)) {
        result = result.filter(order => order.amount >= min);
      }
    }
    
    if (maxAmount) {
      const max = parseInt(maxAmount, 10);
      if (!isNaN(max)) {
        result = result.filter(order => order.amount <= max);
      }
    }
    
    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(term) || 
        `${order.bankName} ${order.cardId}`.toLowerCase().includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'id') {
        comparison = a.id.localeCompare(b.id);
      } else if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setFilteredOrders(result);
  }, [statusFilter, minAmount, maxAmount, searchTerm, sortField, sortDirection]);

  const dateElement = (
    <span className="text-xs sm:text-sm text-gray-500 px-3 py-2 bg-white rounded-md whitespace-nowrap">
      <span className="material-icons-outlined text-xs align-middle mr-1">calendar_today</span>
      Сегодня, {new Date().toLocaleDateString('ru-RU')}
    </span>
  );

  return (
    <div>
      <PageHeader title="Список ордеров" actions={dateElement} />
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-lg bg-blue-100">
              <span className="material-icons-outlined text-blue-600 text-base sm:text-lg">receipt_long</span>
            </div>
            <div className="ml-3 sm:ml-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Всего заказов</h3>
              <p className="text-base sm:text-lg font-bold text-gray-900">{mockOrders.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-lg bg-green-100">
              <span className="material-icons-outlined text-green-600 text-base sm:text-lg">check_circle</span>
            </div>
            <div className="ml-3 sm:ml-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Успешные / Неудачные</h3>
              <p className="text-base sm:text-lg font-bold text-gray-900">{successfulOrdersCount} / {failedOrdersCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 rounded-lg bg-purple-100">
              <span className="material-icons-outlined text-purple-600 text-base sm:text-lg">payments</span>
            </div>
            <div className="ml-3 sm:ml-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Общая сумма</h3>
              <p className="text-base sm:text-lg font-bold text-gray-900">{ordersTotalAmount.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter toggle for mobile */}
      <div className="sm:hidden mb-4">
        <button 
          onClick={toggleFilters}
          className="w-full flex items-center justify-center bg-white p-3 rounded-lg shadow-sm text-sm font-medium text-gray-700"
        >
          <span className="material-icons-outlined mr-2 text-gray-500">filter_list</span>
          {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
        </button>
      </div>
      
      {/* Filters */}
      <div className={`mb-6 bg-white p-4 rounded-lg shadow-sm ${!showFilters ? 'hidden sm:block' : ''}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Поиск
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 material-icons-outlined" style={{ fontSize: '18px' }}>search</span>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                placeholder="ID или карта"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Статус платежа
            </label>
            <select
              id="status"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="all">Все статусы</option>
              <option value="success">Успешные</option>
              <option value="failed">Неудачные</option>
              <option value="pending">В обработке</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="min-amount" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Мин. сумма (₽)
            </label>
            <input
              type="number"
              id="min-amount"
              className="block w-full pl-3 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
              placeholder="От"
              value={minAmount}
              onChange={handleMinAmountChange}
            />
          </div>
          
          <div>
            <label htmlFor="max-amount" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Макс. сумма (₽)
            </label>
            <input
              type="number"
              id="max-amount"
              className="block w-full pl-3 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
              placeholder="До"
              value={maxAmount}
              onChange={handleMaxAmountChange}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile view of orders */}
      <div className="sm:hidden space-y-4 mb-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <span className="material-icons-outlined text-4xl text-gray-400 mb-2">search_off</span>
            <p className="text-gray-500">Не найдено ордеров, соответствующих фильтрам</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
      
      {/* Desktop view - table */}
      <div className="hidden sm:block bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    ID Ордера
                    <span className="material-icons-outlined ml-1 text-gray-400" style={{ fontSize: '16px' }}>
                      {getSortIcon('id')}
                    </span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Дата
                    <span className="material-icons-outlined ml-1 text-gray-400" style={{ fontSize: '16px' }}>
                      {getSortIcon('date')}
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Карта
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center">
                    Сумма
                    <span className="material-icons-outlined ml-1 text-gray-400" style={{ fontSize: '16px' }}>
                      {getSortIcon('amount')}
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Не найдено ордеров, соответствующих фильтрам
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const dateObj = new Date(order.date);
                  const formattedDate = dateObj.toLocaleDateString('ru-RU');
                  const formattedTime = dateObj.toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  });
                  
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formattedDate}</div>
                        <div className="text-sm text-gray-500">{formattedTime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.bankName} {order.cardId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{order.amount.toLocaleString('ru-RU')} ₽</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <OrderStatusBadge status={order.status} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders; 