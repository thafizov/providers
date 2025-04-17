import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingIndicator from './components/LoadingIndicator';

// Использование ленивой загрузки для страниц
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Orders = lazy(() => import('./pages/Orders'));
const Wallet = lazy(() => import('./pages/Wallet'));
const Requisites = lazy(() => import('./pages/Requisites'));
const Reports = lazy(() => import('./pages/Reports'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingIndicator fullScreen />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="requisites" element={<Requisites />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;