import React, { useState } from 'react';
import { Shield, HelpCircle, CheckCircle2, ArrowRight, Sparkles, Scale } from 'lucide-react';
import { MISSION_2_SCENARIOS } from '../../data/gameData';
import { sound } from '../../utils/soundFx';

interface Mission2BhinnekaProps {
  onScenarioComplete: (unityDelta: number, stabilityDelta: number, knowledgeDelta: number) => void;
  onMissionFinish: () => void;
  onOpenHint: (text: string) => void;
}

export const Mission2Bhinneka: React.FC<Mission2BhinnekaProps> = ({
  onScenarioComplete,
  onMissionFinish,
  onOpenHint,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    isOptimal: boolean;
    feedbackText: string;
    explanation: string;
    unityChange: number;
    kp: number;
  } | null>(null);

  const scenario = MISSION_2_SCENARIOS[currentIndex];
  const totalScenarios = MISSION_2_SCENARIOS.length;

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOptId(optId);
  };

  const handleSubmit = () => {
    if (!selectedOptId || isAnswerSubmitted) return;
    const chosen = scenario.options.find(o => o.id === selectedOptId);
    if (!chosen) return;

    setIsAnswerSubmitted(true);
    if (chosen.isBest) {
      sound.playSuccess();
      setFeedback({
        isOptimal: true,
        feedbackText: chosen.feedback,
        explanation: scenario.explanation,
        unityChange: chosen.unityDelta,
        kp: scenario.points,
      });
      onScenarioComplete(chosen.unityDelta, chosen.stabilityDelta, scenario.points);
    } else {
      sound.playWarning();
      setFeedback({
        isOptimal: false,
        feedbackText: chosen.feedback,
        explanation: scenario.explanation,
        unityChange: chosen.unityDelta,
        kp: 5,
      });
      onScenarioComplete(chosen.unityDelta, chosen.stabilityDelta, 5);
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedOptId(null);
    setIsAnswerSubmitted(false);
    setFeedback(null);

    if (currentIndex < totalScenarios - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      sound.playFanfare();
      onMissionFinish();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Mission Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-amber-400 font-mono font-semibold uppercase tracking-wider">
              <span>Mission 2 of 6</span>
              <span>·</span>
              <span>Dilemma {currentIndex + 1} of {totalScenarios}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
              The Bhinneka Tunggal Ika Challenge
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Test your principles of tolerance, equality, and mutual respect in real-life school and community dilemmas.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenHint(scenario.hint);
            }}
            className="self-start sm:self-center flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-colors shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Task Force Hint</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalScenarios) * 100}%` }}
          />
        </div>
      </div>

      {/* Scenario Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-semibold mb-1">
            <span>Cognitive Level: {scenario.cognitiveLevel}</span>
            <span className="text-amber-400">Reward: {scenario.points} KP</span>
          </div>
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            {scenario.title}
          </h2>
        </div>

        {/* Real-Life Context Dilemma Box */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 leading-relaxed">
          <span className="font-bold text-white block mb-1">Real-Life Situation:</span>
          {scenario.context}
        </div>

        {/* Choices */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Choose the Best Action as a Unity Guardian:
          </p>

          {scenario.options.map((opt) => {
            const isSelected = selectedOptId === opt.id;
            let btnStyle = 'bg-slate-800/40 border-slate-700/60 text-slate-200 hover:bg-slate-800/80';

            if (isAnswerSubmitted) {
              if (opt.isBest) {
                btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
              } else {
                btnStyle = 'bg-slate-800/20 border-slate-800 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-amber-500/20 border-amber-500 text-white shadow-md ring-1 ring-amber-500/40';
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-start gap-3 ${btnStyle}`}
              >
                <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  {isSelected ? '✓' : ''}
                </div>
                <div className="flex-1 leading-relaxed">
                  {opt.text}
                </div>
              </button>
            );
          })}
        </div>

        {!isAnswerSubmitted && (
          <div className="pt-2 flex justify-end">
            <button
              disabled={!selectedOptId}
              onClick={handleSubmit}
              className="py-2 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-semibold text-xs transition-colors shadow-md"
            >
              Take Action
            </button>
          </div>
        )}

        {/* Feedback Section */}
        {feedback && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 animate-in fade-in ${
            feedback.isOptimal
              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
              : 'bg-amber-950/40 border-amber-700/60 text-amber-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-1.5">
                {feedback.isOptimal ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Shield className="w-4 h-4 text-amber-400" />}
                {feedback.isOptimal ? 'Principled Decision' : 'Ethical Reflection Required'}
              </span>
              <div className="flex items-center gap-3 font-mono font-bold">
                <span className={feedback.unityChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {feedback.unityChange >= 0 ? `+${feedback.unityChange}` : feedback.unityChange} Unity
                </span>
                <span className="text-amber-400">+{feedback.kp} KP</span>
              </div>
            </div>

            <p className="text-slate-200 font-medium">{feedback.feedbackText}</p>
            <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-700/40">
              <strong className="text-white">Civics Insight: </strong>
              {feedback.explanation}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 py-1.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors border border-slate-700"
              >
                <span>{currentIndex === totalScenarios - 1 ? 'Complete Mission 2' : 'Next Dilemma'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
