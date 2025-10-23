
export enum Screen {
  Onboarding,
  Dashboard,
  MarketDetail,
  Portfolio,
  Settings,
}

export interface Market {
  id: string;
  name: string;
  description: string;
  category: string;
  currentPrice: number;
  change24h: number;
  volume24h: number;
  predictionData: { month: string; price: number }[];
}

export interface Asset {
  symbol: string;
  name:string;
  balance: number;
  valueUSD: number;
  logoUrl: string;
  change24h: number;
}

export interface Transaction {
  id: string;
  type: 'Sent' | 'Received' | 'Swapped';
  asset: string;
  amount: number;
  valueUSD: number;
  date: string;
  address: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  time: string;
  imageUrl: string;
}
