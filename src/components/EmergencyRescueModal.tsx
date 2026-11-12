import React from 'react';
import { AlertOctagon, RotateCcw, ShieldAlert, HeartHandshake } from 'lucide-react';
import { sound } from '../utils/soundFx';

interface EmergencyRescueModalProps {
  isOpen: boolean;
  onMediate: () => void;
  onRestartCurrentMission: () => void;
}

export const EmergencyRescueModal: React.FC<EmergencyRescueModalProps> = ({
  isOpen,
  onMediate,
  onRestartCurrentMission,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-rose-600 rounded-2xl p-6 shadow-2xl text-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-500 flex items-center justify-center text-rose-500 animate-pulse">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">NATIONAL INTEGRATION ALERT</h3>
            <p className="text-xs text-rose-400 font-mono">UNITY SCORE HAS DROPPED TO 0</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-200 leading-relaxed mb-4">
          <p className="font-semibold text-rose-300 mb-1">Why Did the Mission Collapse?</p>
          Severe social polarization, discrimination, or unilateral force has broken community trust. In Social Studies (IPS), without equality, mutual respect, and legal justice, national integration dissolves into conflict.
        </div>

        <p className="text-xs text-slate-300 mb-6">
          As a leader of the National Unity Task Force, you must choose how to salvage the Republic:
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              sound.playSuccess();
              onMediate();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-lg"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Emergency Musyawarah (+35 Unity)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onRestartCurrentMission();
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Mission</span>
          </button>
        </div>
      </div>
    </div>
  );
};
