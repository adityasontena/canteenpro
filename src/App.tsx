import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import CanteenRegistration from './components/auth/CanteenRegistration';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import FoodItems from './components/FoodItems';
import Orders from './components/Orders';
import Analytics from './components/Analytics';
import Payments from './components/Payments';
import Feedback from './components/Feedback';
import Settings from './components/Settings';
import Notifications from './components/Notifications';

function App() {
  const { isRegistered } = useAuth();

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Routes>
          <Route path="*" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<CanteenRegistration />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/food-items" element={<FoodItems />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;