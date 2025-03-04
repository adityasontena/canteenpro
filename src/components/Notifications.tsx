import React from 'react';
import { Bell, X, ShoppingBag, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import useSound from 'use-sound';

const Notifications = () => {
  const { notifications, removeNotification } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Bell className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={() => notifications.forEach(n => removeNotification(n.id))}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications</h3>
              <p className="mt-2 text-sm text-gray-600">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex space-x-4">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'order' ? 'bg-blue-50' :
                    notification.type === 'feedback' ? 'bg-green-50' :
                    'bg-orange-50'
                  }`}>
                    {notification.type === 'order' ? (
                      <ShoppingBag className={`h-5 w-5 text-blue-500`} />
                    ) : notification.type === 'feedback' ? (
                      <MessageSquare className={`h-5 w-5 text-green-500`} />
                    ) : (
                      <Bell className={`h-5 w-5 text-orange-500`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;