import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Sparkles, MapPin, Compass } from 'lucide-react';
import { MISSION_1_DATA, ASSET_IMAGES } from '../../data/gameData';
import { MatchingPair, MultipleChoiceQuestion, TrueFalseQuestion } from '../../types/game';
import { sound } from '../../utils/soundFx';

interface Mission1DiversityProps {
  onChallengeComplete: (unityDelta: number, stabilityDelta: number, knowledgeDelta: number) => void;
  onMissionFinish: () => void;
  onOpenHint: (text: string) => void;
}

export const Mission1Diversity: React.FC<Mission1DiversityProps> = ({
  onChallengeComplete,
  onMissionFinish,
  onOpenHint,
}) => {
  // Step 0: Matching activity; Steps 1..5: Questions from MISSION_1_DATA.questions
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Matching Activity State
  const [selectedItem, setSelectedItem] = useState<MatchingPair | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchingFeedback, setMatchingFeedback] = useState<string | null>(null);

  // Question States for Steps 1..5
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean | null>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<{ isSuccess: boolean; title: string; explanation: string; unity: number; kp: number } | null>(null);

  // Total steps in Mission 1: 1 matching + 5 questions = 6 challenges
  const totalSteps = 6;

  // Handle item selection in matching activity
  const handleSelectItem = (pair: MatchingPair) => {
    sound.playClick();
    if (matchedIds.includes(pair.id)) return;
    setSelectedItem(pair);
    setMatchingFeedback(null);
  };

  // Handle region target click in matching activity
  const handleSelectRegion = (targetPair: MatchingPair) => {
    if (!selectedItem) {
      sound.playWarning();
      setMatchingFeedback('Select a cultural element on the left first!');
      return;
    }

    if (selectedItem.id === targetPair.id) {
      sound.playSuccess();
      const updated = [...matchedIds, selectedItem.id];
      setMatchedIds(updated);
      setSelectedItem(null);
      setMatchingFeedback(`Correct! ${targetPair.item} belongs to ${targetPair.region}.`);

      if (updated.length === MISSION_1_DATA.matching.pairs.length) {
        onChallengeComplete(MISSION_1_DATA.matching.unityImpact, 4, MISSION_1_DATA.matching.points);
      }
    } else {
      sound.playWarning();
      setMatchingFeedback(`Not quite! ${selectedItem.item} is not native to ${targetPair.region}. Try another island.`);
    }
  };

  // Handle Multiple Choice or Situation Analysis choice
  const handleOptionSelect = (q: MultipleChoiceQuestion, optId: string) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOptionId(optId);
  };

  // Submit Answer for Multiple Choice
  const handleSubmitMC = (q: MultipleChoiceQuestion) => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    const chosen = q.options.find(o => o.id === selectedOptionId);
    if (!chosen) return;

    setIsAnswerSubmitted(true);
    if (chosen.isBest) {
      sound.playSuccess();
      setFeedbackText({
        isSuccess: true,
        title: 'Outstanding Analysis!',
        explanation: chosen.feedback + ' ' + q.explanation,
        unity: chosen.unityDelta,
        kp: q.points,
      });
      onChallengeComplete(chosen.unityDelta, chosen.stabilityDelta, q.points);
    } else {
      sound.playWarning();
      setFeedbackText({
        isSuccess: false,
        title: 'Critical Thinking Opportunity',
        explanation: chosen.feedback + ' ' + q.explanation,
        unity: chosen.unityDelta,
        kp: 5,
      });
      onChallengeComplete(chosen.unityDelta, chosen.stabilityDelta, 5);
    }
  };

  // Submit True / False answers
  const handleSubmitTF = (q: TrueFalseQuestion) => {
    if (isAnswerSubmitted) return;
    // Check all answered
    if (Object.keys(tfAnswers).length < q.statements.length) {
      sound.playWarning();
      return;
    }

    setIsAnswerSubmitted(true);
    let allCorrect = true;
    q.statements.forEach((st, idx) => {
      if (tfAnswers[idx] !== st.isTrue) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      sound.playSuccess();
      setFeedbackText({
        isSuccess: true,
        title: 'All Statements Evaluated Correctly!',
        explanation: q.explanation,
        unity: q.unityImpact,
        kp: q.points,
      });
      onChallengeComplete(q.unityImpact, 4, q.points);
    } else {
      sound.playWarning();
      setFeedbackText({
        isSuccess: false,
        title: 'Review the Principles of Diversity',
        explanation: 'Some evaluations were mistaken. Remember: Diversity is protected under Bhinneka Tunggal Ika and equality is guaranteed in UUD 1945.',
        unity: -2,
        kp: 5,
      });
      onChallengeComplete(-2, -1, 5);
    }
  };

  // Proceed to next challenge within Mission 1
  const handleNextStep = () => {
    sound.playClick();
    setSelectedItem(null);
    setSelectedOptionId(null);
    setTfAnswers({});
    setIsAnswerSubmitted(false);
    setFeedbackText(null);
    setMatchingFeedback(null);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      sound.playFanfare();
      onMissionFinish();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Mission Banner & Progress */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-amber-400 font-mono font-semibold uppercase tracking-wider">
              <span>Mission 1 of 6</span>
              <span>·</span>
              <span>Challenge {currentStep + 1} of {totalSteps}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
              Discover Indonesian Diversity
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Explore ethnic groups, traditions, architecture, and the geographic foundations of our archipelago.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              const hint = currentStep === 0 
                ? MISSION_1_DATA.matching.hint 
                : MISSION_1_DATA.questions[currentStep - 1].hint;
              onOpenHint(hint);
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
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* CHALLENGE 0: Cultural Elements Matching */}
      {currentStep === 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              {MISSION_1_DATA.matching.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {MISSION_1_DATA.matching.context} (Click an element, then click its home region!)
            </p>
          </div>

          {matchingFeedback && (
            <div className={`p-3 rounded-xl text-xs font-medium ${
              matchedIds.length === MISSION_1_DATA.matching.pairs.length 
                ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-300'
                : 'bg-slate-800/80 border border-slate-700 text-amber-300'
            }`}>
              {matchingFeedback}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Column A: Cultural Elements */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Traditional Cultural Elements
              </h3>
              {MISSION_1_DATA.matching.pairs.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);
                const isSelected = selectedItem?.id === pair.id;
                return (
                  <button
                    key={pair.id}
                    disabled={isMatched}
                    onClick={() => handleSelectItem(pair)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through opacity-70 cursor-not-allowed'
                        : isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                        : 'bg-slate-800/50 border-slate-700/60 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">{pair.item}</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{pair.detail}</span>
                    </div>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Column B: Indonesian Regions */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Native Island / Region
              </h3>
              {MISSION_1_DATA.matching.pairs.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);
                return (
                  <button
                    key={pair.id + '_region'}
                    disabled={isMatched}
                    onClick={() => handleSelectRegion(pair)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300 cursor-not-allowed'
                        : 'bg-slate-800/50 border-slate-700/60 text-slate-200 hover:bg-amber-950/30 hover:border-amber-600/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="font-semibold">{pair.region}</span>
                    </div>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

          </div>

          {matchedIds.length === MISSION_1_DATA.matching.pairs.length && (
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>All 6 Cultural Elements Successfully Identified! (+20 KP)</span>
              </div>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
              >
                <span>Continue to Next Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* CHALLENGES 1..5: Multiple Choice / True-False / Situations */}
      {currentStep > 0 && (() => {
        const question = MISSION_1_DATA.questions[currentStep - 1];

        return (
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                <span>Cognitive Level: {question.cognitiveLevel}</span>
                <span>·</span>
                <span>{question.points} KP</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                {question.title}
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {question.context}
              </p>
            </div>

            {/* If Multiple Choice / Situation */}
            {'options' in question && (
              <div className="space-y-2.5">
                {question.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let optStyle = 'bg-slate-800/50 border-slate-700/60 text-slate-200 hover:bg-slate-800';

                  if (isAnswerSubmitted) {
                    if (opt.isBest) {
                      optStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                    } else if (isSelected) {
                      optStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    } else {
                      optStyle = 'bg-slate-800/20 border-slate-800 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-amber-500/20 border-amber-500 text-white shadow-md';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleOptionSelect(question, opt.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 ${optStyle}`}
                    >
                      <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                        {isSelected ? '✓' : ''}
                      </div>
                      <span className="leading-relaxed flex-1">{opt.text}</span>
                    </button>
                  );
                })}

                {!isAnswerSubmitted && (
                  <div className="pt-2 flex justify-end">
                    <button
                      disabled={!selectedOptionId}
                      onClick={() => handleSubmitMC(question)}
                      className="py-2 px-5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-semibold text-xs transition-colors"
                    >
                      Confirm Decision
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* If True / False */}
            {'statements' in question && (
              <div className="space-y-3">
                {question.statements.map((st, idx) => {
                  const userVal = tfAnswers[idx];
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2 text-xs">
                      <p className="text-slate-200 font-medium leading-relaxed">{st.statement}</p>
                      <div className="flex items-center gap-3">
                        <button
                          disabled={isAnswerSubmitted}
                          onClick={() => {
                            sound.playClick();
                            setTfAnswers(prev => ({ ...prev, [idx]: true }));
                          }}
                          className={`py-1 px-4 rounded-lg border font-semibold transition-all ${
                            userVal === true 
                              ? 'bg-amber-500 text-slate-950 border-amber-500' 
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          TRUE
                        </button>
                        <button
                          disabled={isAnswerSubmitted}
                          onClick={() => {
                            sound.playClick();
                            setTfAnswers(prev => ({ ...prev, [idx]: false }));
                          }}
                          className={`py-1 px-4 rounded-lg border font-semibold transition-all ${
                            userVal === false 
                              ? 'bg-amber-500 text-slate-950 border-amber-500' 
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          FALSE
                        </button>
                        {isAnswerSubmitted && (
                          <span className={`text-[11px] font-semibold flex items-center gap-1 ${
                            userVal === st.isTrue ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            {userVal === st.isTrue ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {st.reason}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {!isAnswerSubmitted && (
                  <div className="pt-2 flex justify-end">
                    <button
                      disabled={Object.keys(tfAnswers).length < question.statements.length}
                      onClick={() => handleSubmitTF(question)}
                      className="py-2 px-5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-semibold text-xs transition-colors"
                    >
                      Evaluate Statements
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Feedback Banner after submission */}
            {feedbackText && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                feedbackText.isSuccess 
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200' 
                  : 'bg-amber-950/40 border-amber-700/60 text-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center gap-1.5">
                    {feedbackText.isSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
                    {feedbackText.title}
                  </span>
                  <div className="flex items-center gap-3 font-mono font-bold">
                    <span className={feedbackText.unity >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {feedbackText.unity >= 0 ? `+${feedbackText.unity}` : feedbackText.unity} Unity
                    </span>
                    <span className="text-amber-400">+{feedbackText.kp} KP</span>
                  </div>
                </div>
                <p className="text-slate-300">{feedbackText.explanation}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 py-1.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors border border-slate-700"
                  >
                    <span>{currentStep === totalSteps - 1 ? 'Complete Mission 1' : 'Next Challenge'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        );
      })()}

    </div>
  );
};
