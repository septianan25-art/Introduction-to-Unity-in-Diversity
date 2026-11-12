/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameStats, VisionStrategy, RandomEvent } from './types/game';
import { RANDOM_EVENTS } from './data/gameData';
import { sound } from './utils/soundFx';

import { TopBar } from './components/TopBar';
import { IntroScreen } from './components/IntroScreen';
import { HandbookModal } from './components/HandbookModal';
import { HintModal } from './components/HintModal';
import { RandomEventModal } from './components/RandomEventModal';
import { EmergencyRescueModal } from './components/EmergencyRescueModal';
import { FinalReport } from './components/FinalReport';

import { Mission1Diversity } from './components/missions/Mission1Diversity';
import { Mission2Bhinneka } from './components/missions/Mission2Bhinneka';
import { Mission3Crisis } from './components/missions/Mission3Crisis';
import { Mission4ConnectMap } from './components/missions/Mission4ConnectMap';
import { Mission5Negotiation } from './components/missions/Mission5Negotiation';
import { Mission6Vision2045 } from './components/missions/Mission6Vision2045';

const INITIAL_STATS: GameStats = {
  unityScore: 70,
  stability: 70,
  knowledgePoints: 0,
  currentMissionIndex: 0,
  completedMissions: [],
  mistakesCount: 0,
};

export default function App() {
  const [gamePhase, setGamePhase] = useState<'intro' | 'mission' | 'report'>('intro');
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals
  const [isHandbookOpen, setIsHandbookOpen] = useState<boolean>(false);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [activeRandomEvent, setActiveRandomEvent] = useState<RandomEvent | null>(null);
  const [isRescueModalOpen, setIsRescueModalOpen] = useState<boolean>(false);
  const [isRestartConfirmOpen, setIsRestartConfirmOpen] = useState<boolean>(false);

  // Mission 6 Data for Final Report
  const [finalStrategies, setFinalStrategies] = useState<VisionStrategy[]>([]);

  // Sound toggle
  const handleToggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  // Stat mutator with boundary clamping and zero detection
  const updateStats = (unityDelta: number, stabilityDelta: number, knowledgeDelta: number) => {
    setStats((prev) => {
      const newUnity = Math.max(0, Math.min(100, prev.unityScore + unityDelta));
      const newStability = Math.max(0, Math.min(100, prev.stability + stabilityDelta));
      const newKP = prev.knowledgePoints + knowledgeDelta;
      const mistakes = unityDelta < 0 ? prev.mistakesCount + 1 : prev.mistakesCount;

      if (newUnity === 0) {
        sound.playWarning();
        setIsRescueModalOpen(true);
      }

      return {
        ...prev,
        unityScore: newUnity,
        stability: newStability,
        knowledgePoints: newKP,
        mistakesCount: mistakes,
      };
    });
  };

  // Start game from Intro
  const handleStartGame = () => {
    setGamePhase('mission');
  };

  // Generic Mission Finisher
  const handleMissionFinish = (completedIndex: number) => {
    setStats((prev) => {
      const completed = prev.completedMissions.includes(completedIndex)
        ? prev.completedMissions
        : [...prev.completedMissions, completedIndex];
      return { ...prev, completedMissions: completed };
    });

    // Check for Random Event triggers
    if (completedIndex === 1) {
      // After Mission 2 (Bhinneka) -> Trigger Event 1
      setActiveRandomEvent(RANDOM_EVENTS[0]);
    } else if (completedIndex === 2) {
      // After Mission 3 (Crisis) -> Trigger Event 2
      setActiveRandomEvent(RANDOM_EVENTS[1]);
    } else if (completedIndex === 3) {
      // After Mission 4 (Connect Map) -> Trigger Event 3
      setActiveRandomEvent(RANDOM_EVENTS[2]);
    } else if (completedIndex === 5) {
      // Mission 6 Complete -> Final Report
      setGamePhase('report');
      return;
    } else {
      // Move directly to next mission
      setStats((prev) => ({
        ...prev,
        currentMissionIndex: prev.currentMissionIndex + 1,
      }));
    }
  };

  // Dismiss Random Event and advance mission index
  const handleAcknowledgeRandomEvent = () => {
    if (activeRandomEvent) {
      updateStats(
        activeRandomEvent.unityChange,
        activeRandomEvent.stabilityChange,
        activeRandomEvent.knowledgeGain
      );
      setActiveRandomEvent(null);
      setStats((prev) => ({
        ...prev,
        currentMissionIndex: prev.currentMissionIndex + 1,
      }));
    }
  };

  // Emergency Mediation when Unity hits 0
  const handleEmergencyMediate = () => {
    setIsRescueModalOpen(false);
    setStats((prev) => ({
      ...prev,
      unityScore: 35,
      stability: Math.max(30, prev.stability),
    }));
  };

  // Restart current mission from checkpoint
  const handleRestartCurrentMission = () => {
    setIsRescueModalOpen(false);
    setStats((prev) => ({
      ...prev,
      unityScore: 70,
      stability: 70,
    }));
  };

  // Full Game Reset
  const handleFullRestart = () => {
    setIsRestartConfirmOpen(false);
    setStats(INITIAL_STATS);
    setGamePhase('intro');
    setFinalStrategies([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Universal Top Bar */}
      <TopBar
        stats={stats}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenHandbook={() => setIsHandbookOpen(true)}
        onRestart={() => setIsRestartConfirmOpen(true)}
      />

      {/* Main Game Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Intro Phase */}
        {gamePhase === 'intro' && (
          <IntroScreen 
            onStartGame={handleStartGame} 
            onOpenHandbook={() => setIsHandbookOpen(true)} 
          />
        )}

        {/* Mission Play Phase */}
        {gamePhase === 'mission' && (
          <div>
            {stats.currentMissionIndex === 0 && (
              <Mission1Diversity
                onChallengeComplete={updateStats}
                onMissionFinish={() => handleMissionFinish(0)}
                onOpenHint={(hint) => setActiveHint(hint)}
              />
            )}

            {stats.currentMissionIndex === 1 && (
              <Mission2Bhinneka
                onScenarioComplete={updateStats}
                onMissionFinish={() => handleMissionFinish(1)}
                onOpenHint={(hint) => setActiveHint(hint)}
              />
            )}

            {stats.currentMissionIndex === 2 && (
              <Mission3Crisis
                onCrisisResolved={updateStats}
                onMissionFinish={() => handleMissionFinish(2)}
                onOpenHint={(hint) => setActiveHint(hint)}
              />
            )}

            {stats.currentMissionIndex === 3 && (
              <Mission4ConnectMap
                onProjectFunded={updateStats}
                onMissionFinish={() => handleMissionFinish(3)}
                onOpenHint={(hint) => setActiveHint(hint)}
              />
            )}

            {stats.currentMissionIndex === 4 && (
              <Mission5Negotiation
                onRoundComplete={updateStats}
                onMissionFinish={() => handleMissionFinish(4)}
                onOpenHint={(hint) => setActiveHint(hint)}
              />
            )}

            {stats.currentMissionIndex === 5 && (
              <Mission6Vision2045
                onVisionComplete={(u, s, kp, strats) => {
                  updateStats(u, s, kp);
                  setFinalStrategies(strats);
                  handleMissionFinish(5);
                }}
                onOpenHint={(hint) => setActiveHint(hint)}
              />
            )}
          </div>
        )}

        {/* Final Screen & Report Phase */}
        {gamePhase === 'report' && (
          <FinalReport
            stats={stats}
            selectedStrategies={finalStrategies}
            onRestart={handleFullRestart}
          />
        )}

      </main>

      {/* Modals & Dialogs */}
      <HandbookModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />

      <HintModal
        isOpen={!!activeHint}
        hintText={activeHint || ''}
        onClose={() => setActiveHint(null)}
      />

      <RandomEventModal
        event={activeRandomEvent}
        onContinue={handleAcknowledgeRandomEvent}
      />

      <EmergencyRescueModal
        isOpen={isRescueModalOpen}
        onMediate={handleEmergencyMediate}
        onRestartCurrentMission={handleRestartCurrentMission}
      />

      {/* Restart Confirmation Dialog */}
      {isRestartConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl text-slate-100 space-y-4">
            <h3 className="text-base font-bold text-white font-display">Restart Mission Campaign?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to restart? Your current Unity Score ({stats.unityScore}) and Knowledge Points ({stats.knowledgePoints} KP) will be reset.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsRestartConfirmOpen(false)}
                className="py-1.5 px-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFullRestart}
                className="py-1.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
              >
                Confirm Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Educational Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/90 py-4 text-center text-[11px] text-slate-500">
        <p>
          Republic of Indonesia · National Unity Task Force · Grade 9 Social Studies (IPS) Interactive Learning Applet
        </p>
      </footer>

    </div>
  );
}
