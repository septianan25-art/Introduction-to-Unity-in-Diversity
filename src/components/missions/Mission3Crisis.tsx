import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, XCircle, ArrowRight, Sparkles, MapPin, Scale } from 'lucide-react';
import { MISSION_3_CRISES } from '../../data/gameData';
import { CrisisScenario } from '../../types/game';
import { sound } from '../../utils/soundFx';

interface Mission3CrisisProps {
  onCrisisResolved: (unityChange: number, stabilityChange: number, knowledgeGain: number) => void;
  onMissionFinish: () => void;
  onOpenHint: (text: string) => void;
}

export const Mission3Crisis: React.FC<Mission3CrisisProps> = ({
  onCrisisResolved,
  onMissionFinish,
  onOpenHint,
}) => {
  const [crisisIndex, setCrisisIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [resolutionResult, setResolutionResult] = useState<{
    chosenOption: CrisisScenario['options'][0];
  } | null>(null);

  const crisis = MISSION_3_CRISES[crisisIndex];
  const totalCrises = MISSION_3_CRISES.length;

  const handleSelectOption = (optId: string) => {
    if (isResolved) return;
    sound.playClick();
    setSelectedOptionId(optId);
  };

  const handleExecuteResolution = () => {
    if (!selectedOptionId || isResolved) return;
    const option = crisis.options.find(o => o.id === selectedOptionId);
    if (!option) return;

    setIsResolved(true);
    setResolutionResult({ chosenOption: option });

    if (option.isOptimal) {
      sound.playSuccess();
    } else {
      sound.playWarning();
    }

    onCrisisResolved(option.unityChange, option.stabilityChange, option.knowledgeGain);
  };

  const handleNextCrisis = () => {
    sound.playClick();
    setSelectedOptionId(null);
    setIsResolved(false);
    setResolutionResult(null);

    if (crisisIndex < totalCrises - 1) {
      setCrisisIndex(prev => prev + 1);
    } else {
      sound.playFanfare();
      onMissionFinish();
    }
  };

  const getUrgencyColor = (urgency: string) => {
    if (urgency === 'Severe') return 'text-rose-400 bg-rose-950/60 border-rose-800';
    if (urgency === 'Critical') return 'text-amber-400 bg-amber-950/60 border-amber-800';
    return 'text-yellow-400 bg-yellow-950/60 border-yellow-800';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-rose-400 font-mono font-semibold uppercase tracking-wider">
              <span>Mission 3 of 6</span>
              <span>·</span>
              <span>Crisis {crisisIndex + 1} of {totalCrises}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
              The Unity Crisis: Emergency Interventions
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Analyze threats to national integration and deploy wise policy solutions balancing law, dialogue, and fairness.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenHint(
                `Crisis Tip: Avoid unilateral force or discrimination. Look for solutions using Musyawarah Mufakat, constitutional rights (UUD 1945), and affirmative fairness.`
              );
            }}
            className="self-start sm:self-center flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors shrink-0"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Crisis Advisor</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-300"
            style={{ width: `${((crisisIndex + 1) / totalCrises) * 100}%` }}
          />
        </div>
      </div>

      {/* Active Crisis Situation Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        
        {/* Meta badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{crisis.location}</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">{crisis.threatCategory}</span>
          </div>

          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getUrgencyColor(crisis.urgency)}`}>
            {crisis.urgency} Threat
          </span>
        </div>

        <div>
          <h2 className="text-lg font-bold font-display text-white mb-2">
            {crisis.title}
          </h2>
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 leading-relaxed">
            <span className="font-bold text-white block mb-1">Intelligence Incident Report:</span>
            {crisis.description}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Select National Task Force Policy Resolution:
          </p>

          {crisis.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let optCardStyle = 'bg-slate-800/40 border-slate-700/60 text-slate-200 hover:bg-slate-800/80';

            if (isResolved) {
              if (opt.isOptimal) {
                optCardStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-100';
              } else if (isSelected) {
                optCardStyle = 'bg-rose-950/40 border-rose-500 text-rose-100';
              } else {
                optCardStyle = 'bg-slate-800/20 border-slate-800 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              optCardStyle = 'bg-amber-500/20 border-amber-500 text-white shadow-md ring-1 ring-amber-500/40';
            }

            return (
              <button
                key={opt.id}
                disabled={isResolved}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-xl border text-xs transition-all space-y-1.5 ${optCardStyle}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{opt.title}</span>
                  <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[11px] font-bold">
                    {isSelected ? '✓' : ''}
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{opt.action}</p>
                <span className="text-[11px] text-slate-400 block italic">
                  Rationale: {opt.rationale}
                </span>
              </button>
            );
          })}
        </div>

        {!isResolved && (
          <div className="pt-2 flex justify-end">
            <button
              disabled={!selectedOptionId}
              onClick={handleExecuteResolution}
              className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs transition-all shadow-md"
            >
              Enact Policy Solution
            </button>
          </div>
        )}

        {/* Consequence & Educational Feedback */}
        {resolutionResult && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-3 animate-in fade-in ${
            resolutionResult.chosenOption.isOptimal
              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
              : 'bg-rose-950/40 border-rose-700/60 text-rose-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-1.5">
                {resolutionResult.chosenOption.isOptimal 
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                {resolutionResult.chosenOption.isOptimal ? 'Optimal National Resolution' : 'Flawed Intervention with Adverse Repercussions'}
              </span>
              <div className="flex items-center gap-3 font-mono font-bold">
                <span className={resolutionResult.chosenOption.unityChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {resolutionResult.chosenOption.unityChange >= 0 ? `+${resolutionResult.chosenOption.unityChange}` : resolutionResult.chosenOption.unityChange} Unity
                </span>
                <span className={resolutionResult.chosenOption.stabilityChange >= 0 ? 'text-cyan-400' : 'text-rose-400'}>
                  {resolutionResult.chosenOption.stabilityChange >= 0 ? `+${resolutionResult.chosenOption.stabilityChange}%` : `${resolutionResult.chosenOption.stabilityChange}%`} Stability
                </span>
                <span className="text-amber-400">+{resolutionResult.chosenOption.knowledgeGain} KP</span>
              </div>
            </div>

            <p className="text-slate-200 font-medium">
              {resolutionResult.chosenOption.consequenceText}
            </p>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
              <strong className="text-white">IPS Curriculum Takeaway: </strong>
              {resolutionResult.chosenOption.educationalLesson}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextCrisis}
                className="flex items-center gap-1.5 py-1.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors border border-slate-700"
              >
                <span>{crisisIndex === totalCrises - 1 ? 'Complete Mission 3' : 'Next Crisis Scenario'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
