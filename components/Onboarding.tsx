
import React, { useState } from 'react';
import { LogoIcon, WalletIcon } from './Icons';

interface OnboardingProps {
  onConnect: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      onConnect();
    }, 1500); // Simulate connection delay
  };

  return (
    <div className="flex flex-col items-center justify-center text-center h-full p-8 bg-bunker-50 dark:bg-bunker-950">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="relative mb-6">
            <div className="absolute -inset-2 bg-teal-500/20 rounded-full blur-xl animate-pulse"></div>
            <LogoIcon className="h-24 w-24 text-teal-400 relative" />
        </div>
        <h1 className="text-3xl font-bold text-bunker-900 dark:text-white mb-2">Welcome to Crypto Insight</h1>
        <p className="text-bunker-600 dark:text-bunker-400 max-w-xs">
          Track assets, get Polymarket insights, and AI-powered predictions for the BNB Chain.
        </p>
      </div>
      <div className="w-full">
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300"
        >
          {isConnecting ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <WalletIcon className="h-5 w-5 mr-2" />
              Connect BNB Wallet
            </>
          )}
        </button>
        <p className="text-xs text-bunker-500 mt-3">Connect to view your portfolio and access market data.</p>
      </div>
    </div>
  );
};

export default Onboarding;
