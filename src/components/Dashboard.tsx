import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign, Clock } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Orders', value: '156', icon: ShoppingBag, trend: '+12.5%', color: 'blue' },
    { title: 'Revenue', value: '₹15,690', icon: DollarSign, trend: '+8.2%', color: 'green' },
    { title: 'Active Orders', value: '12', icon: Clock, trend: '', color: 'orange' },
    { title: 'Customers', value: '2,345', icon: Users, trend: '+5.1%', color: 'purple' },
  ];

  const recentOrders = [
    { id: '#ORD-1234', customer: 'Alice Smith', items: 'Masala Dosa, Coffee', total: '₹180', status: 'preparing' },
    { id: '#ORD-1235', customer: 'Bob Johnson', items: 'Veg Biryani', total: '₹220', status: 'new' },
    { id: '#ORD-1236', customer: 'Carol White', items: 'Samosa (2), Tea', total: '₹60', status: 'ready' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-500`} />
                </div>
              </div>
              {stat.trend && (
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">{stat.trend}</span>
                  <span className="text-gray-600 ml-1">vs last month</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">{order.items}</p>
                  <p className="font-medium text-gray-900">{order.total}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'new' ? 'bg-blue-50 text-blue-600' :
                  order.status === 'preparing' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;