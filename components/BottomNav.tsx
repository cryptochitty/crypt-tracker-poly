
import React from 'react';
import { Screen } from '../types';
import { ChartIcon, PortfolioIcon, SettingsIcon } from './Icons';

interface BottomNavProps {
  activeScreen: Screen;
  setScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => {
  const activeClass = 'text-teal-400';
  const inactiveClass = 'text-bunker-400 group-hover:text-bunker-200';
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full group focus:outline-none"
    >
      <Icon className={`h-6 w-6 mb-1 transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`} />
      <span className={`text-xs font-medium transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}>
        {label}
      </span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setScreen }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-bunker-950/80 backdrop-blur-sm border-t border-bunker-800 shadow-lg">
      <div className="flex justify-around items-center h-full px-2">
        <NavItem
          icon={ChartIcon}
          label="Markets"
          isActive={activeScreen === Screen.Dashboard || activeScreen === Screen.MarketDetail}
          onClick={() => setScreen(Screen.Dashboard)}
        />
        <NavItem
          icon={PortfolioIcon}
          label="Portfolio"
          isActive={activeScreen === Screen.Portfolio}
          onClick={() => setScreen(Screen.Portfolio)}
        />
        <NavItem
          icon={SettingsIcon}
          label="Settings"
          isActive={activeScreen === Screen.Settings}
          onClick={() => setScreen(Screen.Settings)}
        />
      </div>
    </footer>
  );
};

export default BottomNav;
