
import React from 'react';
import { Market, NewsArticle } from '../types';
import { MOCK_NEWS } from '../constants';

interface DashboardProps {
  markets: Market[];
  onSelectMarket: (market: Market) => void;
}

const MarketCard: React.FC<{ market: Market; onClick: () => void }> = ({ market, onClick }) => {
  const isPositive = market.change24h >= 0;
  return (
    <div onClick={onClick} className="bg-bunker-100 dark:bg-bunker-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start">
        <span className="text-xs bg-teal-500/20 text-teal-400 font-semibold px-2 py-1 rounded-full">{market.category}</span>
        <div className="text-right">
          <p className="text-lg font-bold text-bunker-900 dark:text-white">{(market.currentPrice * 100).toFixed(0)}¢</p>
          <p className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{(market.change24h * 100).toFixed(1)}%
          </p>
        </div>
      </div>
      <h3 className="text-md font-semibold text-bunker-900 dark:text-white mt-3 leading-tight">{market.name}</h3>
    </div>
  );
};

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
  <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-bunker-100 dark:hover:bg-bunker-800/50">
    <img src={article.imageUrl} alt={article.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
    <div className="flex-grow">
      <p className="text-sm font-semibold text-bunker-800 dark:text-bunker-100 leading-tight">{article.title}</p>
      <div className="flex items-center text-xs text-bunker-500 dark:text-bunker-400 mt-1">
        <span>{article.source}</span>
        <span className="mx-1.5">•</span>
        <span>{article.time}</span>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ markets, onSelectMarket }) => {
  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-bunker-900 dark:text-white">Market Insights</h1>
        <p className="text-bunker-600 dark:text-bunker-400">Polymarket prediction markets on BNB Chain.</p>
      </header>
      
      <section>
        <h2 className="text-lg font-semibold text-bunker-800 dark:text-bunker-200 mb-3">Trending Markets</h2>
        <div className="grid grid-cols-1 gap-4">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} onClick={() => onSelectMarket(market)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-bunker-800 dark:text-bunker-200 mb-3">Latest News</h2>
        <div className="space-y-2">
            {MOCK_NEWS.map(article => <NewsCard key={article.id} article={article} />)}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
