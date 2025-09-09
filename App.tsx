
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CorruptionMethod } from './types';
import { ALL_METHODS } from './constants';
import { corruptText } from './utils/corruption';
import { Header } from './components/Header';
import { IconButton } from './components/IconButton';
import { ClipboardIcon, RefreshIcon } from './components/icons';

const Panel: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-lg ${className}`}>
        <h2 className="text-xl font-bold text-emerald-400 mb-4 font-mono uppercase tracking-wider">{title}</h2>
        {children}
    </div>
);

const App: React.FC = () => {
    const [originalText, setOriginalText] = useState<string>('The quick brown fox jumps over the lazy dog.');
    const [corruptedText, setCorruptedText] = useState<string>('');
    const [corruptionLevel, setCorruptionLevel] = useState<number>(30); // Max budget starts at 30%
    const [methodWeights, setMethodWeights] = useState<{ [key: string]: number }>(() => {
        const initialWeights: { [key: string]: number } = {};
        ALL_METHODS.forEach(m => initialWeights[m] = 0);
        initialWeights[CorruptionMethod.BLOCK] = 30; // Start with Block Out at 30%
        return initialWeights;
    });
    const [enabledMethods, setEnabledMethods] = useState<Record<string, boolean>>(() => {
        const enabled: Record<string, boolean> = {};
        ALL_METHODS.forEach(m => { enabled[m] = true; });
        return enabled;
    });
    const [copySuccess, setCopySuccess] = useState<string>('');
    const [seed, setSeed] = useState<number>(0);

    const activeWeights = useMemo(() => {
        return Object.entries(methodWeights).reduce((acc, [method, weight]) => {
            if (enabledMethods[method] && weight > 0) {
                acc[method as CorruptionMethod] = weight;
            }
            return acc;
        }, {} as { [key in CorruptionMethod]?: number });
    }, [methodWeights, enabledMethods]);

    const totalWeight = useMemo(() => {
        return Object.values(activeWeights).reduce((sum, weight) => sum + (weight || 0), 0);
    }, [activeWeights]);
    
    // Create a stable, stringified representation of the active weights.
    // This will only change if the *content* of activeWeights changes. Toggling
    // a method with 0 weight will not change this string, preventing side effects.
    const activeWeightsString = useMemo(() => JSON.stringify(activeWeights), [activeWeights]);

    useEffect(() => {
        // This effect now correctly depends on changes to the original text,
        // the seed, or the actual active corruption methods (via activeWeightsString).
        // It no longer runs unnecessarily when a disabled method is toggled.
        
        // FIX: Explicitly typing `currentWeights` after JSON.parse resolves errors on lines 57 and 59.
        // It ensures TypeScript knows the values are numbers, not `unknown`.
        const currentWeights: Record<string, number> = JSON.parse(activeWeightsString);
        const currentTotalWeight = Object.values(currentWeights).reduce((sum, weight) => sum + (weight || 0), 0);
        
        const result = corruptText(originalText, currentTotalWeight, currentWeights);
        setCorruptedText(result);
    }, [originalText, activeWeightsString, seed]);


    const handleCopy = () => {
        if (corruptedText) {
            navigator.clipboard.writeText(corruptedText);
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }
    };
    
    const handleRefresh = () => {
        setSeed(s => s + 1);
    };

    const handleToggleMethod = (method: CorruptionMethod) => {
        setEnabledMethods(prev => ({ ...prev, [method]: !prev[method] }));
    };

    const handleMasterSlider = (level: number) => {
        setCorruptionLevel(level);
        if (totalWeight > level) {
            const ratio = level / totalWeight;
            const newWeights = { ...methodWeights };
            Object.keys(newWeights).forEach(m => {
                if (enabledMethods[m]) {
                    newWeights[m] *= ratio;
                }
            });
            setMethodWeights(newWeights);
        }
    };

    const handleMethodSlider = (changedMethod: CorruptionMethod, value: number) => {
        const oldValue = methodWeights[changedMethod] || 0;
        const isIncreasing = value > oldValue;
        
        if (value === oldValue) return; // Prevent re-renders if value is unchanged

        const newWeights = { ...methodWeights };

        if (isIncreasing && totalWeight >= corruptionLevel) {
            // "Spillover" logic
            let requestedIncrease = value - oldValue;
            const donors = Object.entries(newWeights).filter(([m, w]) => 
                m !== changedMethod && enabledMethods[m] && w > 1
            );

            if (donors.length === 0) return; // Cannot increase, no one to steal from.

            const donorTotalWeight = donors.reduce((sum, [, w]) => sum + w, 0);
            
            let actualReduction = 0;
            for (const [method, weight] of donors) {
                const proportion = weight / donorTotalWeight;
                const reduction = requestedIncrease * proportion;
                const newWeight = Math.max(0, weight - reduction);
                actualReduction += (weight - newWeight);
                newWeights[method] = newWeight;
            }
            newWeights[changedMethod] = oldValue + actualReduction;
        } else {
            // Standard budget logic
            const otherTotal = Object.entries(newWeights).reduce((sum, [m, w]) => {
                return (m !== changedMethod && enabledMethods[m]) ? sum + w : sum;
            }, 0);

            const cappedValue = Math.max(0, Math.min(value, corruptionLevel - otherTotal));
            newWeights[changedMethod] = cappedValue;
        }
        
        setMethodWeights(newWeights);
    };

    return (
        <div className="min-h-screen font-mono p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header />
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Input & Controls */}
                    <div className="flex flex-col gap-8">
                        <Panel title="Input">
                            <textarea
                                value={originalText}
                                onChange={(e) => setOriginalText(e.target.value)}
                                placeholder="Enter text to corrupt..."
                                className="w-full h-48 p-4 bg-slate-900 border-2 border-slate-700 rounded-md focus:border-emerald-400 focus:ring-emerald-400 focus:outline-none transition-colors duration-200 resize-y"
                                aria-label="Original text input"
                            />
                        </Panel>

                        <Panel title="Controls">
                             <div className="space-y-6">
                                <div>
                                    <label htmlFor="corruptionLevel" className="block mb-3 font-semibold text-slate-400">
                                        Master Corruption: <span className="text-emerald-400 font-bold text-lg">{Math.round(totalWeight)}% / {corruptionLevel}%</span>
                                    </label>
                                    <input
                                        id="corruptionLevel"
                                        type="range" min="0" max="100" step="1"
                                        value={corruptionLevel}
                                        onChange={(e) => handleMasterSlider(parseInt(e.target.value, 10))}
                                        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                                    />
                                </div>
                                <div className="border-t border-slate-700 pt-6 space-y-4">
                                    {ALL_METHODS.map(method => (
                                        <div key={method}>
                                            <div className="flex items-center justify-between mb-2">
                                                <label htmlFor={`${method}-toggle`} className="flex items-center text-sm font-medium text-slate-300 select-none cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        id={`${method}-toggle`}
                                                        checked={enabledMethods[method]}
                                                        onChange={() => handleToggleMethod(method)}
                                                        className="h-4 w-4 bg-slate-700 border-slate-500 rounded text-blue-500 focus:ring-blue-600 mr-3 cursor-pointer"
                                                    />
                                                    {method}
                                                </label>
                                                <span className="text-sm font-bold text-slate-400 w-12 text-right">
                                                    {Math.round(methodWeights[method] || 0)}%
                                                </span>
                                            </div>
                                             <input
                                                id={method}
                                                type="range" min="0" max={100} step="0.1"
                                                value={methodWeights[method] || 0}
                                                onChange={(e) => handleMethodSlider(method, parseFloat(e.target.value))}
                                                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!enabledMethods[method]}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Panel>
                    </div>

                    {/* Right Column: Output */}
                    <Panel title="Output" className="relative">
                         <textarea
                            value={corruptedText}
                            readOnly
                            placeholder="Corrupted text will appear here..."
                            className="w-full h-full min-h-[400px] p-4 bg-slate-900 border-2 border-slate-700 rounded-md focus:outline-none transition-colors duration-200 resize-y"
                            aria-label="Corrupted text output"
                        />
                        <div className="absolute top-7 right-7 flex items-center">
                            {copySuccess && <span className="text-emerald-400 text-sm mr-2 transition-opacity duration-300">{copySuccess}</span>}
                            <IconButton onClick={handleRefresh} aria-label="Regenerate seed">
                                <RefreshIcon />
                            </IconButton>
                            <IconButton onClick={handleCopy} aria-label="Copy to clipboard">
                                <ClipboardIcon />
                            </IconButton>
                        </div>
                    </Panel>
                </main>
            </div>
        </div>
    );
};

export default App;
