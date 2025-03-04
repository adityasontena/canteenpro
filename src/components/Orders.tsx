import React, { useState } from 'react';
import { Clock, CheckCircle2, XCircle, ChefHat } from 'lucide-react';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

const Orders = () => {
  const { orders, updateOrderStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'new' | 'preparing' | 'ready' | 'completed' | 'cancelled'>('new');

  const handleStatusUpdate = (orderId: string, newStatus: 'preparing' | 'ready' | 'completed' | 'cancelled') => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order ${orderId} marked as ${newStatus}`);
  };

  const filteredOrders = orders.filter(order => order.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <div className="flex space-x-2">
          {(['new', 'preparing', 'ready', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'new' && orders.filter(o => o.status === 'new').length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                  {orders.filter(o => o.status === 'new').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <ChefHat className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No {activeTab} orders</h3>
            <p className="mt-2 text-sm text-gray-600">
              {activeTab === 'new'
                ? 'New orders will appear here'
                : activeTab === 'preparing'
                ? 'Orders being prepared will appear here'
                : activeTab === 'ready'
                ? 'Orders ready for pickup will appear here'
                : activeTab === 'cancelled'
                ? 'Cancelled orders will appear here'
                : 'Completed orders will appear here'}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'new' ? 'bg-blue-50 text-blue-600' :
                      order.status === 'preparing' ? 'bg-yellow-50 text-yellow-600' :
                      order.status === 'ready' ? 'bg-green-50 text-green-600' :
                      order.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                  <div className="mt-4 space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="text-gray-600">₹{item.price}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-100 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{order.time}</span>
                </div>
              </div>
              {order.status !== 'completed' && order.status !== 'cancelled' && (
                <div className="mt-6 flex space-x-3">
                  {order.status === 'new' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'preparing')}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      <ChefHat className="h-5 w-5 mr-2" />
                      Start Preparing
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'ready')}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Mark as Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'completed')}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Complete Order
                    </button>
                  )}
                  {(order.status === 'new' || order.status === 'preparing') && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                      className="flex items-center justify-center px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Cancel Order
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;