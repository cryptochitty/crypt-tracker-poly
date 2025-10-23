
import React, { useState, useEffect, useCallback } from 'react';
import { Screen, Market, Transaction } from './types';
import { MOCK_MARKETS, MOCK_TRANSACTIONS } from './constants';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import MarketDetail from './components/MarketDetail';
import Portfolio from './components/Portfolio';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.Onboarding);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => setIsInitializing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleConnectWallet = useCallback(() => {
    setIsWalletConnected(true);
    setScreen(Screen.Dashboard);
  }, []);

  const handleDisconnectWallet = useCallback(() => {
    setIsWalletConnected(false);
    setSelectedMarket(null);
    setScreen(Screen.Onboarding);
  }, []);

  const handleSelectMarket = useCallback((market: Market) => {
    setSelectedMarket(market);
    setScreen(Screen.MarketDetail);
  }, []);

  const handleBack = useCallback(() => {
    if (screen === Screen.MarketDetail) {
      setScreen(Screen.Dashboard);
    }
  }, [screen]);

  const renderScreen = () => {
    if (!isWalletConnected) {
      return <Onboarding onConnect={handleConnectWallet} />;
    }

    switch (screen) {
      case Screen.Dashboard:
        return <Dashboard markets={MOCK_MARKETS} onSelectMarket={handleSelectMarket} />;
      case Screen.MarketDetail:
        return selectedMarket ? <MarketDetail market={selectedMarket} onBack={handleBack} /> : <Dashboard markets={MOCK_MARKETS} onSelectMarket={handleSelectMarket} />;
      case Screen.Portfolio:
        return <Portfolio transactions={MOCK_TRANSACTIONS} />;
      case Screen.Settings:
        return <Settings isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(prev => !prev)} onDisconnect={handleDisconnectWallet} />;
      default:
        return <Dashboard markets={MOCK_MARKETS} onSelectMarket={handleSelectMarket} />;
    }
  };

  if (isInitializing) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bunker-950 text-white">
        <LogoIcon className="h-20 w-20 text-teal-400 animate-pulse" />
        <h1 className="text-2xl font-bold mt-4">Crypto Insight</h1>
        <p className="text-bunker-400">Your window to the market</p>
      </div>
    );
  }

  return (
    <div className="font-sans bg-bunker-50 dark:bg-bunker-950 text-bunker-800 dark:text-bunker-200 min-h-screen">
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-2xl bg-white dark:bg-bunker-900">
        <main className="flex-grow pb-20">
          {renderScreen()}
        </main>
        {isWalletConnected && (
          <BottomNav activeScreen={screen} setScreen={setScreen} />
        )}
      </div>
    </div>
  );
};

export default App;
