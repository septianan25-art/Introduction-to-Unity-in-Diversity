import React, { useState } from 'react';
import { Users, Handshake, CheckCircle2, ArrowRight, Sparkles, Scale, MessageSquare, AlertCircle } from 'lucide-react';
import { REGIONAL_DELEGATES, NEGOTIATION_ISSUES } from '../../data/gameData';
import { NegotiationIssue } from '../../types/game';
import { sound } from '../../utils/soundFx';

interface Mission5NegotiationProps {
  onRoundComplete: (unityDelta: number, stabilityDelta: number, knowledgeDelta: number) => void;
  onMissionFinish: () => void;
  onOpenHint: (text: string) => void;
}

export const Mission5Negotiation: React.FC<Mission5NegotiationProps> = ({
  onRoundComplete,
  onMissionFinish,
  onOpenHint,
}) => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [selectedPropId, setSelectedPropId] = useState<string | null>(null);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<{
    chosenProp: NegotiationIssue['proposals'][0];
  } | null>(null);

  const issue = NEGOTIATION_ISSUES[currentRoundIndex];
  const totalRounds = NEGOTIATION_ISSUES.length;

  const handleSelectProposal = (propId: string) => {
    if (isVoted) return;
    sound.playClick();
    setSelectedPropId(propId);
  };

  const handleConfirmConsensus = () => {
    if (!selectedPropId || isVoted) return;
    const prop = issue.proposals.find(p => p.id === selectedPropId);
    if (!prop) return;

    setIsVoted(true);
    setOutcome({ chosenProp: prop });

    if (prop.isBalancedSolution) {
      sound.playSuccess();
      onRoundComplete(prop.unityDelta, prop.stabilityDelta, 30);
    } else {
      sound.playWarning();
      onRoundComplete(prop.unityDelta, prop.stabilityDelta, 10);
    }
  };

  const handleNextRound = () => {
    sound.playClick();
    setSelectedPropId(null);
    setIsVoted(false);
    setOutcome(null);

    if (currentRoundIndex < totalRounds - 1) {
      setCurrentRoundIndex(prev => prev + 1);
    } else {
      sound.playFanfare();
      onMissionFinish();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-amber-400 font-mono font-semibold uppercase tracking-wider">
              <span>Mission 5 of 6</span>
              <span>·</span>
              <span>Negotiation Round {currentRoundIndex + 1} of {totalRounds}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
              The National Negotiation
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Chair the National Integration Summit. Mediate between 5 regional leaders and forge balanced compromises that serve the entire Republic.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenHint(
                'Musyawarah Mufakat means finding a win-win that protects national sovereignty while addressing the legitimate grievances of outer islands.'
              );
            }}
            className="self-start sm:self-center flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-colors shrink-0"
          >
            <Handshake className="w-3.5 h-3.5" />
            <span>Mediator Guidance</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${((currentRoundIndex + 1) / totalRounds) * 100}%` }}
          />
        </div>
      </div>

      {/* Regional Delegates Table */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>The 5 Regional Delegates at the Table</span>
          </span>
          <span className="text-[11px] text-amber-400 font-medium">Deliberation Room A</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {REGIONAL_DELEGATES.map((del) => (
            <div 
              key={del.id}
              className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1 text-xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-[10px] text-amber-300">
                  {del.name[0]}
                </div>
                <span className="font-bold text-white truncate">{del.name}</span>
              </div>
              <span className="text-[10px] text-cyan-400 font-semibold block">{del.regionName}</span>
              <p className="text-[10px] text-slate-400 leading-tight">
                {del.demands}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Active National Debate Topic */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
            Round {issue.roundNumber} Issue
          </span>
          <h2 className="text-lg font-bold font-display text-white mt-0.5">
            {issue.topic}
          </h2>
          <div className="mt-2 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 leading-relaxed">
            <span className="font-bold text-white block mb-0.5">The Core Challenge:</span>
            {issue.nationalChallenge}
          </div>
        </div>

        {/* Proposals */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Review Competing National Proposals:
          </p>

          {issue.proposals.map((prop) => {
            const isSelected = selectedPropId === prop.id;
            let cardStyle = 'bg-slate-800/40 border-slate-700/60 text-slate-200 hover:bg-slate-800/80';

            if (isVoted) {
              if (prop.isBalancedSolution) {
                cardStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-100';
              } else if (isSelected) {
                cardStyle = 'bg-rose-950/40 border-rose-500 text-rose-100';
              } else {
                cardStyle = 'bg-slate-800/20 border-slate-800 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              cardStyle = 'bg-amber-500/20 border-amber-500 text-white shadow-md ring-1 ring-amber-500/40';
            }

            return (
              <button
                key={prop.id}
                disabled={isVoted}
                onClick={() => handleSelectProposal(prop.id)}
                className={`w-full text-left p-4 rounded-xl border text-xs transition-all space-y-1.5 ${cardStyle}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{prop.proposer}</span>
                  <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[11px] font-bold">
                    {isSelected ? '✓' : ''}
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{prop.summary}</p>
              </button>
            );
          })}
        </div>

        {!isVoted && (
          <div className="pt-2 flex justify-end">
            <button
              disabled={!selectedPropId}
              onClick={handleConfirmConsensus}
              className="py-2.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-semibold text-xs transition-colors shadow-md"
            >
              Sign National Compromise
            </button>
          </div>
        )}

        {/* Voting Consequence */}
        {outcome && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-3 animate-in fade-in ${
            outcome.chosenProp.isBalancedSolution
              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
              : 'bg-rose-950/40 border-rose-700/60 text-rose-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-1.5">
                {outcome.chosenProp.isBalancedSolution
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  : <AlertCircle className="w-4 h-4 text-rose-400" />}
                {outcome.chosenProp.isBalancedSolution ? 'Unanimous National Consensus' : 'Divided Resolution'}
              </span>
              <div className="flex items-center gap-3 font-mono font-bold">
                <span className={outcome.chosenProp.unityDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {outcome.chosenProp.unityDelta >= 0 ? `+${outcome.chosenProp.unityDelta}` : outcome.chosenProp.unityDelta} Unity
                </span>
                <span className={outcome.chosenProp.stabilityDelta >= 0 ? 'text-cyan-400' : 'text-rose-400'}>
                  {outcome.chosenProp.stabilityDelta >= 0 ? `+${outcome.chosenProp.stabilityDelta}%` : `${outcome.chosenProp.stabilityDelta}%`} Stability
                </span>
              </div>
            </div>

            <p className="text-slate-200 font-medium">
              {outcome.chosenProp.feedback}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextRound}
                className="flex items-center gap-1.5 py-1.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors border border-slate-700"
              >
                <span>{currentRoundIndex === totalRounds - 1 ? 'Complete Mission 5' : 'Next Negotiation Round'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
