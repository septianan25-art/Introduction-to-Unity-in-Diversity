import React, { useState } from 'react';
import { Target, CheckCircle2, ArrowRight, Sparkles, HelpCircle, Layers, Award } from 'lucide-react';
import { VISION_STRATEGIES } from '../../data/gameData';
import { VisionStrategy } from '../../types/game';
import { sound } from '../../utils/soundFx';

interface Mission6Vision2045Props {
  onVisionComplete: (unityDelta: number, stabilityDelta: number, knowledgeDelta: number, selectedStrategies: VisionStrategy[], justifications: Record<string, string>) => void;
  onOpenHint: (text: string) => void;
}

export const Mission6Vision2045: React.FC<Mission6Vision2045Props> = ({
  onVisionComplete,
  onOpenHint,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [justifications, setJustifications] = useState<Record<string, string>>({});
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);

  const toggleSelect = (stratId: string) => {
    if (isEvaluated) return;
    sound.playClick();
    if (selectedIds.includes(stratId)) {
      setSelectedIds(prev => prev.filter(id => id !== stratId));
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds(prev => [...prev, stratId]);
      } else {
        sound.playWarning();
      }
    }
  };

  const handleJustificationChange = (stratId: string, text: string) => {
    setJustifications(prev => ({ ...prev, [stratId]: text }));
  };

  const handleEvaluate = () => {
    if (selectedIds.length !== 4) return;
    sound.playSuccess();
    setIsEvaluated(true);
  };

  const handleProceedToFinal = () => {
    sound.playFanfare();
    const chosenStrats = VISION_STRATEGIES.filter(s => selectedIds.includes(s.id));
    onVisionComplete(15, 12, 50, chosenStrats, justifications);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-amber-400 font-mono font-semibold uppercase tracking-wider">
              <span>Mission 6 of 6 · The Grand Finale</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
              Save Indonesia 2045: The Golden Archipelago
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              "Imagine Indonesia in 2045. Your task is to select 4 core national strategies to create a peaceful, fair, and united society."
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold ${
              selectedIds.length === 4 
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' 
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              {selectedIds.length} / 4 Selected
            </span>

            <button
              onClick={() => {
                sound.playClick();
                onOpenHint(
                  'A balanced national blueprint combines education, rule of law, economic equity, and cultural identity for sustainable harmony.'
                );
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Strategy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {VISION_STRATEGIES.map((strat) => {
          const isSelected = selectedIds.includes(strat.id);

          return (
            <div
              key={strat.id}
              onClick={() => toggleSelect(strat.id)}
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-all space-y-2 flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-950/30 border-amber-500 shadow-lg ring-1 ring-amber-500/50'
                  : selectedIds.length >= 4
                  ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-bold text-sm text-white">{strat.title}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-[11px] font-bold ${
                    isSelected ? 'bg-amber-500 text-slate-950 border-amber-500' : 'border-slate-600'
                  }`}>
                    {isSelected ? '✓' : ''}
                  </div>
                </div>

                <span className="text-[10px] text-cyan-400 font-semibold block mb-1">
                  Pillar: {strat.pillar}
                </span>

                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {strat.description}
                </p>
              </div>

              {/* Justification Box if selected */}
              {isSelected && !isEvaluated && (
                <div className="pt-2 border-t border-slate-800" onClick={(e) => e.stopPropagation()}>
                  <label className="text-[10px] text-amber-300 font-semibold block mb-1">
                    Why is this strategy essential for 2045? (Brief justification)
                  </label>
                  <input
                    type="text"
                    value={justifications[strat.id] || ''}
                    placeholder="e.g. Because equal education ends generational poverty across outer islands..."
                    onChange={(e) => handleJustificationChange(strat.id, e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Evaluation Action */}
      {!isEvaluated && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {selectedIds.length === 4 
              ? '4 Strategies Selected. Ready to evaluate your Indonesia 2045 Blueprint.' 
              : `Please select exactly 4 strategies (${4 - selectedIds.length} remaining).`}
          </span>

          <button
            disabled={selectedIds.length !== 4}
            onClick={handleEvaluate}
            className="py-2 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-semibold text-xs transition-colors shadow-md"
          >
            Synthesize Strategic Blueprint
          </button>
        </div>
      )}

      {/* Synthesis Evaluation Report */}
      {isEvaluated && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-600/60 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white font-display">
                Indonesia 2045 Strategic Blueprint: Evaluation Complete
              </h3>
            </div>
            <div className="font-mono text-xs font-bold text-emerald-400 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800">
              National Harmony Index: 98%
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            Your 4 selected national pillars form an extraordinary, balanced architecture for the Republic. By uniting human capital development, legal fairness, cultural identity, and sustainable connectivity, you guarantee that Indonesia in 2045 will stand strong, sovereign, and united.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {VISION_STRATEGIES.filter(s => selectedIds.includes(s.id)).map(s => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <span className="font-bold text-white block mb-0.5">{s.title}</span>
                <p className="text-slate-300 text-[11px]">{s.longTermImpact}</p>
                {justifications[s.id] && (
                  <p className="text-amber-400 text-[10px] mt-1 italic">
                    Student Justification: "{justifications[s.id]}"
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleProceedToFinal}
              className="flex items-center gap-2 py-2.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold text-xs transition-all shadow-lg"
            >
              <span>View Final Unity Guardian Ceremony</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
