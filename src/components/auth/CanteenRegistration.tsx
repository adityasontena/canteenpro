import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Upload, Clock, MapPin, Phone, User, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const CanteenRegistration = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    address: '',
    contactNumber: '',
    ownerName: '',
    licenseNumber: '',
    serviceType: [] as string[],
    operatingHours: {
      monday: { open: '09:00', close: '18:00', isOpen: true },
      tuesday: { open: '09:00', close: '18:00', isOpen: true },
      wednesday: { open: '09:00', close: '18:00', isOpen: true },
      thursday: { open: '09:00', close: '18:00', isOpen: true },
      friday: { open: '09:00', close: '18:00', isOpen: true },
      saturday: { open: '09:00', close: '18:00', isOpen: true },
      sunday: { open: '09:00', close: '18:00', isOpen: false },
    },
    logo: '',
  });

  const handleServiceTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: prev.serviceType.includes(type)
        ? prev.serviceType.filter(t => t !== type)
        : [...prev.serviceType, type]
    }));
  };

  const handleOperatingHoursChange = (day: string, field: 'open' | 'close' | 'isOpen', value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      register(formData);
      toast.success('Registration completed successfully!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <ChefHat className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Register Your Canteen</h2>
          <p className="mt-2 text-sm text-gray-600">
            Step {step} of 3: {
              step === 1 ? 'Basic Information' :
              step === 2 ? 'Operating Hours' :
              'Upload Logo & Finish'
            }
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Canteen Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">University Name</label>
                  <input
                    type="text"
                    required
                    value={formData.university}
                    onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Type</label>
                  <div className="mt-2 space-x-4">
                    {['Veg', 'Non-Veg', 'Both'].map((type) => (
                      <label key={type} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.serviceType.includes(type)}
                          onChange={() => handleServiceTypeChange(type)}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {Object.entries(formData.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4">
                    <div className="w-28">
                      <span className="text-sm font-medium text-gray-700">
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </span>
                    </div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={hours.isOpen}
                        onChange={(e) => handleOperatingHoursChange(day, 'isOpen', e.target.checked)}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Open</span>
                    </label>
                    {hours.isOpen && (
                      <>
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) => handleOperatingHoursChange(day, 'open', e.target.value)}
                          className="rounded-lg border border-gray-200 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="text-gray-600">to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) => handleOperatingHoursChange(day, 'close', e.target.value)}
                          className="rounded-lg border border-gray-200 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">License Number</label>
                  <input
                    type="text"
                    required
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Canteen Logo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-orange-500 hover:text-orange-600">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData(prev => ({ ...prev, logo: reader.result as string }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                {step === 3 ? 'Complete Registration' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CanteenRegistration;