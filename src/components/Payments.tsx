import React from 'react';
import { DollarSign, Download, CreditCard, Wallet } from 'lucide-react';

const Payments = () => {
  const transactions = [
    { id: 'TXN-001', order: '#ORD-1234', amount: 180, method: 'Card', status: 'completed', date: '2024-03-15 10:30 AM' },
    { id: 'TXN-002', order: '#ORD-1235', amount: 220, method: 'UPI', status: 'completed', date: '2024-03-15 10:45 AM' },
    { id: 'TXN-003', order: '#ORD-1236', amount: 60, method: 'Cash', status: 'completed', date: '2024-03-15 11:00 AM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
        <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          <Download className="h-5 w-5 mr-2" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Today\'s Revenue', value: '₹15,690', icon: DollarSign },
          { title: 'Card Payments', value: '₹8,450', icon: CreditCard },
          { title: 'Digital Payments', value: '₹7,240', icon: Wallet },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Icon className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-100">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="text-sm text-gray-600">
                  <td className="p-4 font-medium">{transaction.id}</td>
                  <td className="p-4">{transaction.order}</td>
                  <td className="p-4">₹{transaction.amount}</td>
                  <td className="p-4">{transaction.method}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-4">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;