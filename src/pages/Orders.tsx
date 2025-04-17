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
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
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
    <span className="text-sm text-gray-500 px-4 py-2 bg-white rounded-md">
      <span className="material-icons-outlined text-xs align-middle mr-1">calendar_today</span>
      Сегодня, {new Date().toLocaleDateString('ru-RU')}
    </span>
  );

  return (
    <div>
      <PageHeader title="Список ордеров" actions={dateElement} />
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <span className="material-icons-outlined text-blue-600">receipt_long</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Всего заказов</h3>
              <p className="text-lg font-bold text-gray-900">{mockOrders.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <span className="material-icons-outlined text-green-600">check_circle</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Успешные / Неудачные</h3>
              <p className="text-lg font-bold text-gray-900">{successfulOrdersCount} / {failedOrdersCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <span className="material-icons-outlined text-purple-600">payments</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Общая сумма</h3>
              <p className="text-lg font-bold text-gray-900">{ordersTotalAmount.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Поиск
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons-outlined text-gray-400 text-sm">search</span>
              </div>
              <input
                type="text"
                id="search"
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Номер заказа или карты"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Статус
            </label>
            <select
              id="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-none"
              style={{ 
                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="all">Все статусы</option>
              <option value="success">Успешно</option>
              <option value="failed">Ошибка</option>
              <option value="pending">В обработке</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Минимальная сумма
            </label>
            <div className="relative">
              <input
                type="number"
                id="minAmount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="От"
                value={minAmount}
                onChange={handleMinAmountChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Максимальная сумма
            </label>
            <div className="relative">
              <input
                type="number"
                id="maxAmount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="До"
                value={maxAmount}
                onChange={handleMaxAmountChange}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Orders table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                    <span>ID</span>
                    <span className="material-icons-outlined text-gray-400 ml-1 text-sm">
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
                    <span>Дата</span>
                    <span className="material-icons-outlined text-gray-400 ml-1 text-sm">
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
                    <span>Сумма</span>
                    <span className="material-icons-outlined text-gray-400 ml-1 text-sm">
                      {getSortIcon('amount')}
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Способ оплаты
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.bankName} {order.cardId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount.toLocaleString('ru-RU')} ₽
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    QR-код
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <span className="material-icons-outlined text-gray-300 text-4xl">search_off</span>
            <p className="mt-2">Нет ордеров, соответствующих фильтрам</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 