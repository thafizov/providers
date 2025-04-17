import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  txHash: string;
  status: 'completed' | 'pending' | 'failed';
}

// Демо-данные для истории транзакций
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2023-10-15T14:32:10',
    amount: '1250 USDT',
    txHash: 'mFgXHXS6vYfgZx5D5QQ5pQVc5cPkCR5p8WJ4pYbmtm8=',
    status: 'completed'
  },
  {
    id: '2',
    date: '2023-10-14T09:18:45',
    amount: '750 USDT',
    txHash: 'jjjnAYC525wk6y56YPF5aeD9VdKV82sshZQS7MrXXSA=',
    status: 'completed'
  },
  {
    id: '3',
    date: '2023-10-12T16:45:22',
    amount: '1200 USDT',
    txHash: 'TfKXS5KnXf3kvbOY5ygL51r8Uf3GiJTJU6ZcAjsUMcw=',
    status: 'pending'
  },
  {
    id: '4',
    date: '2023-10-10T11:55:37',
    amount: '120 USDT',
    txHash: 'qf9YLNr56feAptWKwJ3wr77VEzNbHKCkL6e8C3aHcZ8=',
    status: 'completed'
  },
  {
    id: '5',
    date: '2023-10-08T08:25:19',
    amount: '500 USDT',
    txHash: 'YLr9GJTjLcKD9v5Xjs2pmKxZLPgcabsvBNp3pw3HN4U=',
    status: 'failed'
  }
];

const WalletAddressCard: React.FC<{ address: string }> = ({ address }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCopyAddress();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
      <div className="absolute -right-10 -top-10 opacity-10">
        <span className="material-icons-outlined text-9xl">account_balance_wallet</span>
      </div>
      <h3 className="text-xl font-bold mb-1">Адрес вашего кошелька</h3>
      <p className="text-blue-100 text-sm mb-4">Используйте этот адрес для получения средств</p>
      
      <div className="bg-black/30 p-4 rounded-xl backdrop-blur-sm flex items-center justify-between mb-4 relative">
        <div className="font-mono text-sm md:text-base overflow-hidden text-ellipsis">
          {address}
        </div>
        <button 
          onClick={handleCopyAddress}
          onKeyDown={handleKeyDown}
          className="ml-2 bg-white/20 hover:bg-white/30 p-2 rounded-lg backdrop-blur-sm transition-all duration-200"
          aria-label="Копировать адрес кошелька"
          tabIndex={0}
        >
          <span className="material-icons-outlined text-white">
            {isCopied ? 'check' : 'content_copy'}
          </span>
        </button>
        
        {isCopied && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded text-sm animate-fade-in-down">
            Скопировано!
          </div>
        )}
      </div>
      
      <div className="flex justify-between text-sm">
        <div>
          <span className="text-blue-200">Сеть:</span> <span className="font-semibold">TON</span>
        </div>
        <div>
          <span className="text-blue-200">Валюта:</span> <span className="font-semibold">USDT</span>
        </div>
      </div>
    </div>
  );
};

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const statusClasses = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  };
  
  const statusLabels = {
    completed: 'Выполнен',
    pending: 'В обработке',
    failed: 'Ошибка'
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      <td className="py-4 px-4">
        <span className="font-medium">{formatDate(transaction.date)}</span>
      </td>
      <td className="py-4 px-4">
        <span className="font-semibold">{transaction.amount}</span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <span className="font-mono text-sm text-gray-600 truncate max-w-[120px] md:max-w-[180px] lg:max-w-[250px]">
            {transaction.txHash}
          </span>
          <a 
            href={`https://tonscan.org/tx/${transaction.txHash}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-500 hover:text-blue-700"
            aria-label="Открыть транзакцию в обозревателе блокчейна"
          >
            <span className="material-icons-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[transaction.status]}`}>
          {statusLabels[transaction.status]}
        </span>
      </td>
    </tr>
  );
};

const Wallet: React.FC = () => {
  // Адрес кошелька TON
  const walletAddress = 'EQBIhPuWmjT7fP-VomuTWnW-5RMDAQkWDFv_X4GGmNDQCCnW';
  
  return (
    <div>
      <PageHeader title="Кошелек" />
      
      <div className="mb-8">
        <WalletAddressCard address={walletAddress} />
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">История начислений</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата и время
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сумма
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Хеш транзакции
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTransactions.map(transaction => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </tbody>
          </table>
        </div>
        
        {mockTransactions.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <span className="material-icons-outlined text-3xl mb-2">inbox</span>
            <p>История транзакций пуста</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet; 