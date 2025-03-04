import React, { createContext, useContext, useState } from 'react';

interface CanteenInfo {
  name: string;
  university: string;
  address: string;
  contactNumber: string;
  ownerName: string;
  licenseNumber: string;
  serviceType: string[];
  operatingHours: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
  logo: string;
}

interface AuthContextType {
  isRegistered: boolean;
  canteenInfo: CanteenInfo | null;
  register: (info: CanteenInfo) => void;
  updateCanteenInfo: (info: Partial<CanteenInfo>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [canteenInfo, setCanteenInfo] = useState<CanteenInfo | null>(null);

  const register = (info: CanteenInfo) => {
    setCanteenInfo(info);
    setIsRegistered(true);
  };

  const updateCanteenInfo = (info: Partial<CanteenInfo>) => {
    setCanteenInfo(prev => prev ? { ...prev, ...info } : null);
  };

  return (
    <AuthContext.Provider value={{
      isRegistered,
      canteenInfo,
      register,
      updateCanteenInfo,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}