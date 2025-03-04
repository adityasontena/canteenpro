import React from 'react';
import { User, Store, Clock, Camera } from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Canteen Profile</h2>
          <p className="text-sm text-gray-600 mt-1">Update your canteen information</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-lg bg-gray-100 flex items-center justify-center">
                <Store className="h-12 w-12 text-gray-400" />
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-orange-500 text-white hover:bg-orange-600">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Canteen Logo</h3>
              <p className="text-sm text-gray-600 mt-1">
                Upload a high-quality image of your canteen logo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Canteen Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                defaultValue="John's Canteen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                defaultValue="+91 98765 43210"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                defaultValue="Block A, University Campus"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Operating Hours</h2>
          <p className="text-sm text-gray-600 mt-1">Set your canteen's working hours</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div key={day} className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{day}</span>
                <div className="flex items-center space-x-4">
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="text-gray-600">to</span>
                  <input
                    type="time"
                    defaultValue="18:00"
                    className="rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Sunday</span>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;