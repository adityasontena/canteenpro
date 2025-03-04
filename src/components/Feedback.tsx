import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

const Feedback = () => {
  const feedbacks = [
    {
      id: 1,
      customer: 'Alice Smith',
      rating: 5,
      comment: 'Amazing food and quick service! The Masala Dosa was perfect.',
      date: '2024-03-15',
      order: '#ORD-1234',
      replied: false
    },
    {
      id: 2,
      customer: 'Bob Johnson',
      rating: 4,
      comment: 'Good food but slightly delayed delivery.',
      date: '2024-03-15',
      order: '#ORD-1235',
      replied: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Customer Feedback</h1>
        <select className="rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>All Ratings</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
          <option>2 Stars</option>
          <option>1 Star</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Average Rating', value: '4.5', icon: Star },
          { title: 'Total Reviews', value: '234', icon: MessageSquare },
          { title: '5 Star Reviews', value: '180', percentage: '76%', icon: Star },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {stat.value}
                    {stat.percentage && (
                      <span className="text-sm text-gray-600 ml-2">({stat.percentage})</span>
                    )}
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Icon className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-4">
                  <h3 className="font-semibold text-gray-900">{feedback.customer}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Order {feedback.order} • {feedback.date}</p>
                <p className="mt-3 text-gray-600">{feedback.comment}</p>
              </div>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                feedback.replied
                  ? 'bg-gray-100 text-gray-600'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}>
                {feedback.replied ? 'Replied' : 'Reply'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;