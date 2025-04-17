import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  icon: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center p-3 mb-2 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-blue-50 text-blue-700 shadow-sm' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
        }`
      }
      tabIndex={0}
      aria-label={`Перейти к разделу ${label}`}
    >
      <span className="material-icons-outlined mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

const Layout: React.FC = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(true);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
      
      setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 250);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    // Закрывать мобильное меню при смене страницы
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const handleStatusToggle = () => {
    setIsActive(prevState => !prevState);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleStatusToggle();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-md z-20">
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            className="p-2 mr-2 rounded-full hover:bg-gray-100"
          >
            <span className="material-icons-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          <img src="/logo.svg" alt="Providers CSBP Logo" className="h-8" />
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
            <span className="material-icons-outlined">account_circle</span>
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className={`fixed inset-0 md:relative md:inset-auto md:translate-x-0 md:w-64 bg-white shadow-lg md:shadow-md flex flex-col z-10 transition-transform duration-300 md:h-screen overflow-y-auto ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex-1 p-4">
          {/* Logo and User Profile - Desktop */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <img src="/logo.svg" alt="Providers CSBP Logo" className="h-10" />
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
              <span className="material-icons-outlined">account_circle</span>
            </div>
          </div>
          
          {/* User info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-3">
              <div>
                <div className="text-sm font-medium truncate max-w-[180px]">username@example.com</div>
                <div className="text-xs text-gray-500">ID: 12345678</div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs mr-2">Статус:</span>
              <button 
                onClick={handleStatusToggle}
                onKeyDown={handleKeyDown}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
                aria-pressed={isActive}
                aria-label={isActive ? 'Статус активен, нажмите чтобы деактивировать' : 'Статус не активен, нажмите чтобы активировать'}
                tabIndex={0}
              >
                <span 
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                    isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-xs ml-2 font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                {isActive ? 'Активен' : 'Не активен'}
              </span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mb-6">
            <div className="text-xs uppercase text-gray-400 font-semibold mb-3 ml-3">Навигация</div>
            <NavItem to="/" label="Дашборд" icon="dashboard" />
            <NavItem to="/orders" label="Список ордеров" icon="list_alt" />
            <NavItem to="/wallet" label="Кошелек" icon="account_balance_wallet" />
            <NavItem to="/requisites" label="Реквизиты" icon="account_balance" />
            <NavItem to="/reports" label="Отчёты" icon="analytics" />
          </nav>
        </div>
        
        {/* Logout button */}
        <div className="p-4 border-t border-gray-100">
          <button 
            className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            tabIndex={0}
            aria-label="Выйти из системы"
          >
            <span className="material-icons-outlined mr-3">logout</span>
            <span className="font-medium">Выйти</span>
          </button>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Main content with transition */}
      <div className="flex-1 overflow-auto p-4 md:p-6 md:h-screen">
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout; 