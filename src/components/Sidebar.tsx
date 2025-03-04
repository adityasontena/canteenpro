import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  BarChart2, 
  Wallet, 
  MessageSquare, 
  Settings,
  ChefHat
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/food-items', icon: UtensilsCrossed, label: 'Food Items' },
    { path: '/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/analytics', icon: BarChart2, label: 'Analytics' },
    { path: '/payments', icon: Wallet, label: 'Payments' },
    { path: '/feedback', icon: MessageSquare, label: 'Feedback' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <ChefHat className="h-8 w-8 text-orange-500" />
          <span className="text-xl font-bold text-gray-800">CanteenPro</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;