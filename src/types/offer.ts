// Общие типы
type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

type User = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

// Тип для элемента списка предложений
export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage?: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  images: string[];
  goods: string[];
  host: User;
  bedrooms: number;
  maxAdults: number;
};

export type Offers = Offer[]

// Тип для отзыва
export type Comment = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
};

export type Comments = Comment[]
