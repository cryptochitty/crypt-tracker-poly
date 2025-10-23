
import { Market, Asset, Transaction, NewsArticle } from './types';

export const MOCK_MARKETS: Market[] = [
  {
    id: '1',
    name: 'Will Bitcoin (BTC) surpass $75,000 by August 1st?',
    description: 'A prediction market on the future price of Bitcoin, a leading cryptocurrency.',
    category: 'Crypto',
    currentPrice: 0.65, // Representing 65% probability
    change24h: 0.05,
    volume24h: 1250000,
    predictionData: [
      { month: 'Jan', price: 60000 },
      { month: 'Feb', price: 62000 },
      { month: 'Mar', price: 68000 },
      { month: 'Apr', price: 65000 },
      { month: 'May', price: 71000 },
      { month: 'Jun', price: 69000 },
    ],
  },
  {
    id: '2',
    name: 'Will Ethereum (ETH) implement EIP-4844 before July?',
    description: 'This market resolves to "Yes" if Ethereum successfully implements EIP-4844 (Proto-Danksharding) on its mainnet.',
    category: 'Technology',
    currentPrice: 0.82,
    change24h: -0.02,
    volume24h: 850000,
    predictionData: [
      { month: 'Jan', price: 0.5 },
      { month: 'Feb', price: 0.6 },
      { month: 'Mar', price: 0.75 },
      { month: 'Apr', price: 0.8 },
      { month: 'May', price: 0.85 },
      { month: 'Jun', price: 0.82 },
    ],
  },
   {
    id: '3',
    name: 'Will BNB reach $700 in Q3 2024?',
    description: 'A prediction market on whether the price of Binance Coin (BNB) will hit a new all-time high in the third quarter.',
    category: 'Crypto',
    currentPrice: 0.45,
    change24h: 0.11,
    volume24h: 2100000,
    predictionData: [
      { month: 'Jan', price: 300 },
      { month: 'Feb', price: 350 },
      { month: 'Mar', price: 450 },
      { month: 'Apr', price: 550 },
      { month: 'May', price: 600 },
      { month: 'Jun', price: 620 },
    ],
  },
];

export const MOCK_ASSETS: Asset[] = [
    { symbol: 'BNB', name: 'BNB', balance: 15.5, valueUSD: 9145.00, logoUrl: `https://picsum.photos/seed/BNB/40`, change24h: 2.5 },
    { symbol: 'CAKE', name: 'PancakeSwap', balance: 1204.2, valueUSD: 3371.76, logoUrl: `https://picsum.photos/seed/CAKE/40`, change24h: -1.2 },
    { symbol: 'USDT', name: 'Tether', balance: 5210.8, valueUSD: 5210.80, logoUrl: `https://picsum.photos/seed/USDT/40`, change24h: 0.01 },
    { symbol: 'BTCB', name: 'Bitcoin BEP2', balance: 0.08, valueUSD: 5520.00, logoUrl: `https://picsum.photos/seed/BTC/40`, change24h: 4.8 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'Received', asset: 'BNB', amount: 2.5, valueUSD: 1475.00, date: '2024-07-21 14:30', address: '0x12...aBcD' },
  { id: 't2', type: 'Sent', asset: 'CAKE', amount: 50, valueUSD: 140.00, date: '2024-07-21 10:15', address: '0x34...eFgH' },
  { id: 't3', type: 'Swapped', asset: 'BNB to USDT', amount: 1, valueUSD: 590.00, date: '2024-07-20 18:00', address: 'PancakeSwap Router' },
  { id: 't4', type: 'Received', asset: 'BTCB', amount: 0.02, valueUSD: 1380.00, date: '2024-07-19 09:05', address: '0x56...iJkL' },
];

export const MOCK_NEWS: NewsArticle[] = [
    { id: 'n1', title: 'BNB Chain Announces Major Upgrade to Increase Scalability', source: 'CoinDesk', time: '2h ago', imageUrl: 'https://picsum.photos/seed/news1/100/100' },
    { id: 'n2', title: 'Polymarket Trading Volume Hits New Highs Amidst Political Bets', source: 'The Block', time: '5h ago', imageUrl: 'https://picsum.photos/seed/news2/100/100' },
    { id: 'n3', title: 'Is DeFi on BNB Chain Set for a Comeback?', source: 'Decrypt', time: '8h ago', imageUrl: 'https://picsum.photos/seed/news3/100/100' },
];
