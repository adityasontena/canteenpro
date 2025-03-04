export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  available: boolean;
}

export interface Order {
  id: string;
  customer: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  time: string;
  canteen: string;
}

export interface Feedback {
  id: number;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  order: string;
  replied: boolean;
}

export interface Notification {
  id: string;
  type: 'order' | 'feedback' | 'system';
  title: string;
  message: string;
  time: string;
}