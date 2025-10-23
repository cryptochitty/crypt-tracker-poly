
import React, { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Market } from '../types';
import { getMarketPrediction } from '../services/geminiService';
import { ArrowLeftIcon, BellIcon } from './Icons';

interface MarketDetailProps {
  market: Market;
  onBack: () => void;
}

const AIPrediction: React.FC<{ prediction: string }> = ({ prediction }) => {
    const sections = prediction.split(/\n\s*\n/);
    return (
        <div className="mt-4 space-y-4 text-sm text-bunker-300">
            {sections.map((section, index) => {
                const titleMatch = section.match(/\*\*(.*?):\*\*/);
                const title = titleMatch ? titleMatch[1] : `Part ${index + 1}`;
                const content = section.replace(/\*\*(.*?):\*\*/, '').trim();
                return (
                    <div key={index}>
                        <h4 className="font-semibold text-bunker-100 mb-1">{title}</h4>
                        <p className="whitespace-pre-wrap">{content}</p>
                    </div>
                );
            })}
        </div>
    );
};

const MarketDetail: React.FC<MarketDetailProps> = ({ market, onBack }) => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isPositive = market.change24h >= 0;

  const handleGetPrediction = useCallback(async () => {
    setIsLoading(true);
    setPrediction(null);
    const result = await getMarketPrediction(market.name, market.description);
    setPrediction(result);
    setIsLoading(false);
  }, [market.name, market.description]);

  return (
    <div>
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-white/80 dark:bg-bunker-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-bunker-200 dark:hover:bg-bunker-800">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-bunker-900 dark:text-white truncate">{market.category} Market</h1>
      </header>

      <div className="p-4">
        <h2 className="text-lg font-semibold leading-tight text-bunker-900 dark:text-white mb-2">{market.name}</h2>
        <p className="text-sm text-bunker-600 dark:text-bunker-400">{market.description}</p>
        
        <div className="flex items-baseline space-x-4 my-4">
            <p className="text-4xl font-bold text-bunker-900 dark:text-white">{(market.currentPrice * 100).toFixed(0)}¢</p>
             <p className={`text-lg font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '▲' : '▼'} {(market.change24h * 100).toFixed(1)}%
            </p>
        </div>

        <div className="h-48 my-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={market.predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" tick={{ fill: '#a7b1c9' }} />
              <YAxis tick={{ fill: '#a7b1c9' }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1f2331', 
                  border: '1px solid #32394e',
                  color: '#e6e8ef'
                }}
                itemStyle={{ color: '#06b6d4' }}
                labelStyle={{ color: '#a7b1c9' }}
              />
              <Line type="monotone" dataKey="price" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4, fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <button className="w-full flex items-center justify-center text-center p-3 mb-4 rounded-lg bg-bunker-100 dark:bg-bunker-800 text-bunker-700 dark:text-bunker-200 font-semibold hover:bg-bunker-200 dark:hover:bg-bunker-700 transition-colors">
            <BellIcon className="w-5 h-5 mr-2" />
            Set Price Alert
        </button>

        <div className="bg-gradient-to-br from-bunker-800 to-bunker-900 p-4 rounded-lg">
           <h3 className="text-lg font-bold text-white">Gemini AI Prediction</h3>
            {!prediction && !isLoading && (
                <p className="text-sm text-bunker-400 mt-2">Get an AI-powered analysis and prediction for this market.</p>
            )}
            
            {isLoading && (
                <div className="flex items-center space-x-2 mt-4">
                    <svg className="animate-spin h-5 w-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-bunker-300">Generating analysis...</span>
                </div>
            )}
            {prediction && <AIPrediction prediction={prediction} />}
            
            {!isLoading && (
                <button onClick={handleGetPrediction} className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    {prediction ? 'Regenerate Prediction' : 'Get Prediction'}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;
