import React from 'react';
import { Newspaper, ArrowRight, TrendingUp, Sparkles, Award } from 'lucide-react';
import { RandomEvent } from '../types/game';
import { sound } from '../utils/soundFx';

interface RandomEventModalProps {
  event: RandomEvent | null;
  onContinue: () => void;
}

export const RandomEventModal: React.FC<RandomEventModalProps> = ({ event, onContinue }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/60 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Newspaper className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase font-mono tracking-widest text-red-400 font-semibold">
            Breaking National News Flash
          </span>
        </div>

        <h3 className="text-xl font-bold font-display text-white mb-2 leading-snug">
          {event.headline}
        </h3>

        <div className="text-xs text-amber-400/90 font-medium mb-4 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" />
          <span>Category: {event.badge}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-4">
          {event.description}
        </p>

        {/* Impact stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-4 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Unity Score</span>
            <span className="text-emerald-400 font-bold text-sm">+{event.unityChange}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Stability</span>
            <span className="text-cyan-400 font-bold text-sm">+{event.stabilityChange}%</span>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Knowledge</span>
            <span className="text-amber-400 font-bold text-sm">+{event.knowledgeGain} KP</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/40 text-[11px] text-slate-300 mb-5 italic">
          <strong className="text-white not-italic">Civics Takeaway: </strong>
          {event.lesson}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              sound.playSuccess();
              onContinue();
            }}
            className="flex items-center gap-2 py-2 px-5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold text-xs transition-all shadow-md"
          >
            <span>Acknowledge & Proceed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
