import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Shield, CheckCircle2, RotateCcw, Send, Sparkles, Printer, HeartHandshake, BookOpen } from 'lucide-react';
import { GameStats, VisionStrategy } from '../types/game';
import { ASSET_IMAGES } from '../data/gameData';
import { sound } from '../utils/soundFx';

interface FinalReportProps {
  stats: GameStats;
  selectedStrategies: VisionStrategy[];
  onRestart: () => void;
}

export const FinalReport: React.FC<FinalReportProps> = ({
  stats,
  selectedStrategies,
  onRestart,
}) => {
  const [reflectionText, setReflectionText] = useState<string>('');
  const [isPledgeCommitted, setIsPledgeCommitted] = useState<boolean>(false);

  useEffect(() => {
    // Launch celebratory confetti
    sound.playFanfare();
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#ffffff', '#fbbf24', '#06b6d4'],
      });
    } catch {
      // Ignore if canvas is not ready
    }
  }, []);

  const totalCalculatedScore = Math.min(100, Math.round((stats.unityScore * 0.4) + (stats.stability * 0.3) + Math.min(30, stats.knowledgePoints / 6)));

  const handleCommitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    sound.playSuccess();
    setIsPledgeCommitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Hero Victory Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/70 shadow-2xl text-center relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge Avatar */}
        <div className="relative inline-block mx-auto mb-4">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl mx-auto bg-slate-900">
            <img 
              src={ASSET_IMAGES.badge} 
              alt="Grand Guardian of Bhinneka Tunggal Ika Badge" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-1.5 rounded-lg shadow-md border border-red-400">
            <Shield className="w-4 h-4" />
          </div>
        </div>

        <div className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold mb-1">
          National Unity Task Force Decree
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
          CONGRATULATIONS, UNITY GUARDIAN!
        </h1>
        
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto">
          You have successfully completed the Indonesia Unity Mission. Through wisdom, dialogue, and fairness, you have preserved the integrity of our archipelagic nation.
        </p>

        {/* Big Score Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-6 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-sans block">Overall Grade</span>
            <span className="text-xl sm:text-2xl font-bold text-amber-400">{totalCalculatedScore}/100</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-sans block">Final Unity</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400">{stats.unityScore}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-sans block">National Stability</span>
            <span className="text-xl sm:text-2xl font-bold text-cyan-400">{stats.stability}%</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-sans block">Knowledge Points</span>
            <span className="text-xl sm:text-2xl font-bold text-amber-300">{stats.knowledgePoints} KP</span>
          </div>
        </div>

      </div>

      {/* Performance Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Strongest Performance */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-display text-white">
              Strongest Performance Dimension
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-300 block mb-1 text-sm font-display">
              Democratic Consensus & Cross-Cultural Empathy
            </strong>
            You consistently prioritized Musyawarah Mufakat, rejected hate speech and prejudice, and championed fair infrastructure for outer islands from Sumatra to Papua.
          </p>
        </div>

        {/* Growth & Continuous Learning Area */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-display text-white">
              Areas to Deepen in Social Studies (IPS)
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-cyan-300 block mb-1 text-sm font-display">
              Endangered Languages & Customary Law (Hutan Adat)
            </strong>
            Continue studying how local wisdom (kearifan lokal) safeguards biodiversity and promotes peaceful community governance in modern Indonesia.
          </p>
        </div>

      </div>

      {/* Selected 2045 Strategies Summary */}
      {selectedStrategies.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Your Indonesia 2045 Strategic Pillars
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {selectedStrategies.map(s => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <span className="font-bold text-white block">{s.title}</span>
                <span className="text-[10px] text-cyan-400 block mb-1">{s.pillar}</span>
                <p className="text-slate-300 text-[11px]">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 9 Required Reflection Prompt */}
      <div className="p-8 rounded-2xl bg-slate-900 border-2 border-red-600/50 shadow-2xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider font-semibold">
              Final Personal Reflection
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              "Indonesia has many differences. What can YOU do to keep Indonesia united?"
            </h2>
          </div>
        </div>

        {!isPledgeCommitted ? (
          <form onSubmit={handleCommitPledge} className="space-y-3">
            <p className="text-xs text-slate-300">
              Write your personal action pledge as a Grade 9 student (in school, at home, or on social media) to maintain tolerance and national unity:
            </p>

            <textarea
              rows={4}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="e.g. In my daily life, I will stand up against bullying or mockery of classmates with different accents. On social media, I will always verify news before sharing and never spread hate speech. I will make friends with peers from all cultural and religious backgrounds..."
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 leading-relaxed"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!reflectionText.trim()}
                className="flex items-center gap-2 py-2 px-6 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit My Guardian Pledge</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-800/60 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Personal Guardian Pledge Recorded</span>
            </div>
            <p className="text-xs text-white italic font-serif leading-relaxed">
              "{reflectionText}"
            </p>
            <span className="text-[10px] text-slate-400 block pt-1">
              Officially sealed in the National Integration Civic Registry.
            </span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Unity Certificate</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-semibold transition-all shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again / Try Different Strategies</span>
        </button>
      </div>

    </div>
  );
};
