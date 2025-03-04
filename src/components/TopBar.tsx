import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const navigate = useNavigate();
  const { notifications } = useApp();
  const { canteenInfo } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifications = notifications.length;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/notifications')}
            className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <Bell className="h-6 w-6" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                {unreadNotifications}
              </span>
            )}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{canteenInfo?.name || "Loading..."}</p>
              <p className="text-xs text-gray-500">{canteenInfo?.ownerName || "Owner"}</p>
            </div>
            <button 
              onClick={() => navigate('/settings')}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              {canteenInfo?.logo ? (
                <img 
                  src={canteenInfo.logo} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;