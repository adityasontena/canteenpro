import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { FoodItem, Order, Feedback, Notification } from '../types';
import toast from 'react-hot-toast';
import useSound from 'use-sound';

const notificationSound = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

interface AppContextType {
  foodItems: FoodItem[];
  orders: Order[];
  feedback: Feedback[];
  notifications: Notification[];
  addFoodItem: (item: Omit<FoodItem, 'id'>) => void;
  updateFoodItem: (id: string, item: Partial<FoodItem>) => void;
  deleteFoodItem: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'time'>) => void;
  removeNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { canteenInfo } = useAuth();
  const [playSound] = useSound(notificationSound);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Masala Dosa',
      price: 90,
      category: 'South Indian',
      image: 'https://images.unsplash.com/photo-1630410364547-5bb6d31f8c97?auto=format&fit=crop&q=80&w=300&h=200',
      available: true,
      description: 'Crispy dosa served with sambar and chutney',
    },
    {
      id: '2',
      name: 'Veg Biryani',
      price: 160,
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1599043513900-51b6b8b60816?auto=format&fit=crop&q=80&w=300&h=200',
      available: true,
      description: 'Fragrant rice cooked with mixed vegetables and spices',
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#ORD-1234',
      customer: 'Alice Smith',
      items: [
        { name: 'Masala Dosa', quantity: 1, price: 90 },
        { name: 'Coffee', quantity: 1, price: 40 }
      ],
      total: 130,
      status: 'preparing',
      time: '10:30 AM',
      canteen: canteenInfo?.name || ''
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'time'>) => {
    const newNotification = {
      ...notification,
      id: `NOTIF-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
    playSound();
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    // Simulate receiving new orders periodically
    const interval = setInterval(() => {
      const random = Math.random();
      if (random < 0.3) {
        addNotification({
          type: 'order',
          title: 'New Order Received',
          message: `Order #ORD-${Math.floor(Math.random() * 1000)} from Customer`,
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const addFoodItem = (item: Omit<FoodItem, 'id'>) => {
    const newItem = {
      ...item,
      id: `ITEM-${Date.now()}`,
    };
    setFoodItems([...foodItems, newItem]);
    toast.success('Food item added successfully!');
  };

  const updateFoodItem = (id: string, item: Partial<FoodItem>) => {
    setFoodItems(foodItems.map(fi => fi.id === id ? { ...fi, ...item } : fi));
    toast.success('Food item updated successfully!');
  };

  const deleteFoodItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
    toast.success('Food item deleted successfully!');
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
    addNotification({
      type: 'order',
      title: 'Order Status Updated',
      message: `Order ${id} is now ${status}`,
    });
  };

  return (
    <AppContext.Provider value={{
      foodItems,
      orders,
      feedback: [],
      notifications,
      addFoodItem,
      updateFoodItem,
      deleteFoodItem,
      updateOrderStatus,
      addNotification,
      removeNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}