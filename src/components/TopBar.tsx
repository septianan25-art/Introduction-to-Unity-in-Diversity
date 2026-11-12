import React from 'react';
import { Shield, BookOpen, Volume2, VolumeX, RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';
import { GameStats } from '../types/game';
import { sound } from '../utils/soundFx';

interface TopBarProps {
  stats: GameStats;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHandbook: () => void;
  onRestart: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  stats,
  soundEnabled,
  onToggleSound,
  onOpenHandbook,
  onRestart,
}) => {
  const getUnityColor = (score: number) => {
    if (score >= 70) return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
    if (score >= 40) return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
    return 'text-rose-400 bg-rose-950/60 border-rose-800/80 animate-pulse';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="font-display font-bold tracking-tight text-base sm:text-lg text-white whitespace-nowrap block leading-tight">
              INDONESIA: THE UNITY MISSION
            </span>
            <span className="text-[11px] text-slate-400 block -mt-0.5 whitespace-nowrap">
              Grade 9 Social Studies Task Force
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation & Handbook */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-300">
          <button
            onClick={() => {
              sound.playClick();
              onOpenHandbook();
            }}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors border border-slate-700/60 whitespace-nowrap shrink-0"
            title="Read Pancasila and Diversity Guide"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>IPS Handbook</span>
          </button>
        </nav>

        {/* Zone 3: HUD Metrics & Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Unity Score Indicator */}
          <div 
            className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-semibold tabular-nums ${getUnityColor(stats.unityScore)}`}
            title="National Unity Score (Must stay above 0)"
          >
            <span className="text-[11px] font-normal uppercase tracking-wider text-slate-400">Unity</span>
            <span className="text-sm font-bold font-mono">{stats.unityScore}/100</span>
          </div>

          {/* National Stability Indicator */}
          <div 
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-200 text-xs font-semibold tabular-nums"
            title="National Stability Level"
          >
            <span className="text-[11px] font-normal uppercase tracking-wider text-slate-400">Stability</span>
            <span className="text-sm font-bold font-mono text-cyan-400">{stats.stability}%</span>
          </div>

          {/* Knowledge Points */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-800/50 bg-amber-950/40 text-amber-300 text-xs font-semibold tabular-nums"
            title="Knowledge Points earned from critical thinking"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-sm font-bold font-mono">{stats.knowledgePoints}</span>
            <span className="text-[10px] text-amber-400/80 uppercase">KP</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className="p-1.5 rounded-lg border border-slate-700/80 bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Restart Button */}
          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="p-1.5 rounded-lg border border-slate-700/80 bg-slate-800/70 text-slate-300 hover:text-rose-400 hover:bg-slate-700 transition-colors"
            title="Restart Game"
            aria-label="Restart Mission"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
