import React from 'react';
import { BarChart2, TrendingUp, Users, DollarSign } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <select className="rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '₹45,690', trend: '+8.2%', icon: DollarSign },
          { title: 'Total Orders', value: '456', trend: '+12.5%', icon: BarChart2 },
          { title: 'Average Order Value', value: '₹320', trend: '+3.1%', icon: TrendingUp },
          { title: 'Unique Customers', value: '234', trend: '+5.1%', icon: Users },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Icon className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">{stat.trend}</span>
                <span className="text-gray-600 ml-1">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Items</h2>
          <div className="space-y-4">
            {[
              { name: 'Masala Dosa', orders: 145, revenue: '₹13,050' },
              { name: 'Veg Biryani', orders: 98, revenue: '₹15,680' },
              { name: 'Coffee', orders: 89, revenue: '₹3,560' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.orders} orders</p>
                </div>
                <p className="font-semibold text-gray-900">{item.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h2>
          <div className="space-y-4">
            {[
              { time: '12:00 PM - 1:00 PM', orders: 45, percentage: '25%' },
              { time: '1:00 PM - 2:00 PM', orders: 38, percentage: '21%' },
              { time: '7:00 PM - 8:00 PM', orders: 32, percentage: '18%' },
            ].map((peak, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">{peak.time}</span>
                  <span className="text-gray-600">{peak.orders} orders</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: peak.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;