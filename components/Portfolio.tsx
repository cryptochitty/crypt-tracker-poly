
import React, { useState, useMemo } from 'react';
import { Asset, Transaction } from '../types';
import { MOCK_ASSETS } from '../constants';

interface PortfolioProps {
  transactions: Transaction[];
}

const AssetRow: React.FC<{ asset: Asset }> = ({ asset }) => (
    <div className="flex items-center py-3">
        <img src={asset.logoUrl} alt={asset.name} className="h-10 w-10 rounded-full mr-4" />
        <div className="flex-grow">
            <p className="font-semibold text-bunker-800 dark:text-bunker-100">{asset.symbol}</p>
            <p className="text-sm text-bunker-500 dark:text-bunker-400">{asset.name}</p>
        </div>
        <div className="text-right">
            <p className="font-semibold text-bunker-800 dark:text-bunker-100">${asset.valueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-bunker-500 dark:text-bunker-400">{asset.balance} {asset.symbol}</p>
        </div>
    </div>
);

const TransactionRow: React.FC<{ tx: Transaction }> = ({ tx }) => {
    const typeColor = tx.type === 'Received' ? 'text-green-500' : tx.type === 'Sent' ? 'text-red-500' : 'text-blue-500';
    const sign = tx.type === 'Received' ? '+' : '-';
    return (
        <div className="flex items-center py-3">
            <div className="flex-grow">
                <p className={`font-semibold ${typeColor}`}>{tx.type}</p>
                <p className="text-sm text-bunker-500 dark:text-bunker-400">{tx.date}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-bunker-800 dark:text-bunker-100">{sign} {tx.amount} {tx.asset.split(' ')[0]}</p>
                <p className="text-sm text-bunker-500 dark:text-bunker-400">${tx.valueUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
        </div>
    );
};

const Portfolio: React.FC<PortfolioProps> = ({ transactions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'sent' | 'received' | 'swapped'>('all');

    const totalValue = useMemo(() => MOCK_ASSETS.reduce((sum, asset) => sum + asset.valueUSD, 0), []);

    const filteredTransactions = useMemo(() => {
        return transactions
            .filter(tx => {
                if (filter === 'all') return true;
                return tx.type.toLowerCase() === filter;
            })
            .filter(tx => 
                tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [transactions, filter, searchTerm]);

    return (
        <div className="p-4 space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-bunker-900 dark:text-white">Portfolio</h1>
                <p className="text-bunker-600 dark:text-bunker-400">BNB Chain Wallet</p>
            </header>

            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-xl shadow-lg text-white">
                <p className="text-sm opacity-80">Total Balance</p>
                <p className="text-4xl font-bold mt-1">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                 <div className="flex items-center text-sm mt-3 font-semibold bg-white/20 px-3 py-1 rounded-full w-fit">
                    <span className="text-green-300">▲</span>
                    <span className="ml-1.5">+$1,234.56 (7.8%) today</span>
                </div>
            </div>

            <section>
                <h2 className="text-lg font-semibold text-bunker-800 dark:text-bunker-200 mb-2">Assets</h2>
                <div className="divide-y divide-bunker-200 dark:divide-bunker-800">
                    {MOCK_ASSETS.map(asset => <AssetRow key={asset.symbol} asset={asset} />)}
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold text-bunker-800 dark:text-bunker-200 mb-3">Transaction History</h2>
                <div className="space-y-3">
                    <input 
                        type="text"
                        placeholder="Search by asset or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-bunker-100 dark:bg-bunker-800 border-transparent focus:ring-2 focus:ring-teal-500 focus:border-transparent rounded-lg px-4 py-2"
                    />
                    <div className="flex space-x-2">
                        {(['all', 'sent', 'received', 'swapped'] as const).map(f => (
                            <button 
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${filter === f ? 'bg-teal-500 text-white' : 'bg-bunker-200 dark:bg-bunker-800 text-bunker-700 dark:text-bunker-200'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-4 divide-y divide-bunker-200 dark:divide-bunker-800">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map(tx => <TransactionRow key={tx.id} tx={tx} />)
                    ) : (
                        <p className="text-center text-bunker-500 py-8">No transactions found.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
