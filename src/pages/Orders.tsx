import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';

interface Order {
  id: string;
  date: string;
  cardNumber: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  paymentMethod: string;
}

// Примерные данные для демонстрации
const mockOrders: Order[] = [
  {
    id: 'ORD-001234',
    date: '2025-04-17 09:25:43',
    cardNumber: '•••• •••• •••• 1234',
    amount: 4500,
    status: 'success',
    paymentMethod: 'Visa',
  },
  {
    id: 'ORD-001235',
    date: '2025-04-17 10:15:22',
    cardNumber: '•••• •••• •••• 5678',
    amount: 12800,
    status: 'failed',
    paymentMethod: 'MasterCard',
  },
  {
    id: 'ORD-001236',
    date: '2025-04-17 11:05:57',
    cardNumber: '•••• •••• •••• 9012',
    amount: 7650,
    status: 'pending',
    paymentMethod: 'MIR',
  },
  {
    id: 'ORD-001237',
    date: '2025-04-17 12:32:10',
    cardNumber: '•••• •••• •••• 3456',
    amount: 19200,
    status: 'success',
    paymentMethod: 'Visa',
  },
  {
    id: 'ORD-001238',
    date: '2025-04-17 13:45:33',
    cardNumber: '•••• •••• •••• 1234',
    amount: 3100,
    status: 'success',
    paymentMethod: 'MasterCard',
  },
  {
    id: 'ORD-001239',
    date: '2025-04-17 14:20:15',
    cardNumber: '•••• •••• •••• 5678',
    amount: 8900,
    status: 'failed',
    paymentMethod: 'MIR',
  },
  {
    id: 'ORD-001240',
    date: '2025-04-17 15:10:48',
    cardNumber: '•••• •••• •••• 9012',
    amount: 5400,
    status: 'pending',
    paymentMethod: 'Visa',
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
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as Order['status'] | 'all');
  };

  const handlePaymentMethodFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethodFilter(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
    
    // Filter by payment method
    if (paymentMethodFilter !== 'all') {
      result = result.filter(order => order.paymentMethod === paymentMethodFilter);
    }
    
    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(term) || 
        order.cardNumber.toLowerCase().includes(term)
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
  }, [statusFilter, paymentMethodFilter, searchTerm, sortField, sortDirection]);

  // Получаем уникальные методы оплаты
  const paymentMethods = Array.from(new Set(mockOrders.map(order => order.paymentMethod)));

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Статус
            </label>
            <select
              id="status-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            <label htmlFor="payment-method-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Метод оплаты
            </label>
            <select
              id="payment-method-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={paymentMethodFilter}
              onChange={handlePaymentMethodFilterChange}
            >
              <option value="all">Все методы</option>
              {paymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center space-x-1">
                    <span>ID заказа</span>
                    <span className="material-icons-outlined text-gray-400 text-sm">{getSortIcon('id')}</span>
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Дата и время</span>
                    <span className="material-icons-outlined text-gray-400 text-sm">{getSortIcon('date')}</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Номер карты
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Сумма</span>
                    <span className="material-icons-outlined text-gray-400 text-sm">{getSortIcon('amount')}</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Метод оплаты
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.cardNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {order.amount.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.paymentMethod}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Заказы не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div className="text-sm text-gray-700">
                Показано <span className="font-medium">{filteredOrders.length}</span> из <span className="font-medium">{mockOrders.length}</span> заказов
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Предыдущая</span>
                    <span className="material-icons-outlined text-sm">chevron_left</span>
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-gray-50"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Следующая</span>
                    <span className="material-icons-outlined text-sm">chevron_right</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 