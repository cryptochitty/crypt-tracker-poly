
import React from 'react';
import { SunIcon, MoonIcon, ChevronRightIcon } from './Icons';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onDisconnect: () => void;
}

const SettingsItem: React.FC<{ children: React.ReactNode, onClick?: () => void, hasToggle?: boolean }> = ({ children, onClick, hasToggle = false }) => (
    <div 
        onClick={onClick}
        className={`flex items-center justify-between p-4 bg-bunker-100 dark:bg-bunker-800 rounded-lg ${onClick ? 'cursor-pointer' : ''}`}
    >
        {children}
        {!hasToggle && onClick && <ChevronRightIcon className="h-5 w-5 text-bunker-400" />}
    </div>
);

const Settings: React.FC<SettingsProps> = ({ isDarkMode, onToggleDarkMode, onDisconnect }) => {
  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-bunker-900 dark:text-white">Settings</h1>
        <p className="text-bunker-600 dark:text-bunker-400">Manage your app and wallet preferences.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-bunker-800 dark:text-bunker-200 ml-1">General</h2>
        <SettingsItem hasToggle>
            <div className="flex items-center">
                {isDarkMode ? <MoonIcon className="h-5 w-5 mr-3 text-bunker-300"/> : <SunIcon className="h-5 w-5 mr-3 text-bunker-600" />}
                <span className="font-semibold">Dark Mode</span>
            </div>
            <label htmlFor="dark-mode-toggle" className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="dark-mode-toggle" className="sr-only peer" checked={isDarkMode} onChange={onToggleDarkMode} />
              <div className="w-11 h-6 bg-bunker-200 dark:bg-bunker-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
            </label>
        </SettingsItem>
        <SettingsItem onClick={() => alert('Notifications settings clicked!')}>
             <span className="font-semibold">Notifications</span>
        </SettingsItem>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-bunker-800 dark:text-bunker-200 ml-1">Support</h2>
        <SettingsItem onClick={() => alert('FAQ clicked!')}>
            <span className="font-semibold">Frequently Asked Questions</span>
        </SettingsItem>
        <SettingsItem onClick={() => alert('Support clicked!')}>
            <span className="font-semibold">Contact Support</span>
        </SettingsItem>
      </section>
      
      <div className="pt-4">
        <button
          onClick={onDisconnect}
          className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
};

export default Settings;
