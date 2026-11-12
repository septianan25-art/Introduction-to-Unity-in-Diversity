import React from 'react';
import { HelpCircle, X, Lightbulb } from 'lucide-react';
import { sound } from '../utils/soundFx';

interface HintModalProps {
  isOpen: boolean;
  hintText: string;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({ isOpen, hintText, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-600/50 rounded-2xl p-6 shadow-2xl text-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">Task Force Advisor Hint</h3>
              <p className="text-[11px] text-amber-400/90">IPS Strategic Guidance</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 leading-relaxed">
          {hintText}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="py-1.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors"
          >
            Understood, Return to Mission
          </button>
        </div>
      </div>
    </div>
  );
};
