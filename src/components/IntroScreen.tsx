import React from 'react';
import { Shield, ArrowRight, BookOpen, Compass, Users, Sparkles, Scale, AlertOctagon } from 'lucide-react';
import { ASSET_IMAGES } from '../data/gameData';
import { sound } from '../utils/soundFx';

interface IntroScreenProps {
  onStartGame: () => void;
  onOpenHandbook: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStartGame, onOpenHandbook }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Visual Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="relative w-full aspect-[16/8.5] sm:aspect-[16/7] overflow-hidden">
          <img 
            src={ASSET_IMAGES.hero} 
            alt="Diverse Indonesian Students Standing Proudly Together" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 -mt-20 relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-bold tracking-wider uppercase">
              Grade 9 Social Studies (IPS)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold">
              Bhinneka Tunggal Ika & National Integration
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
            INDONESIA: THE UNITY MISSION
            <span className="block text-amber-400 text-lg sm:text-2xl font-semibold mt-1">
              Can You Keep a Nation United?
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Welcome, Officer. You have been appointed to lead the <strong className="text-white">National Unity Task Force</strong>. Indonesia is an archipelagic wonder of 17,000+ islands, 1,340+ ethnic groups, and 718 regional languages. But rising misunderstandings, fake news, and regional inequalities threaten to tear the nation apart.
          </p>

          {/* Core HUD Indicators Explanation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-sans">Starting Unity</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400">70 / 100</span>
              <span className="text-[10px] text-slate-500 block">Fails if hits 0</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-sans">Stability</span>
              <span className="text-base sm:text-lg font-bold text-cyan-400">70%</span>
              <span className="text-[10px] text-slate-500 block">Peace Index</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-sans">Knowledge Points</span>
              <span className="text-base sm:text-lg font-bold text-amber-400">0 KP</span>
              <span className="text-[10px] text-slate-500 block">Critical Thinking</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-sans">Campaign Length</span>
              <span className="text-base sm:text-lg font-bold text-white">6 Missions</span>
              <span className="text-[10px] text-slate-500 block">Strategic Arc</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
            <button
              onClick={() => {
                sound.playSuccess();
                onStartGame();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm transition-all shadow-xl shadow-red-950/50"
            >
              <Shield className="w-4 h-4" />
              <span>Accept Task Force Oath & Begin</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenHandbook();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Review Grade 9 IPS Handbook</span>
            </button>
          </div>
        </div>
      </div>

      {/* The 6 Strategic Missions Briefing Overview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
            Task Force Strategic Roadmap
          </span>
          <h2 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
            Six Critical Operations to Protect the Republic
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <Compass className="w-3.5 h-3.5" />
              <span>01. Discover Indonesian Diversity</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Match cultural elements, analyze geographical crossroads, and uncover why diversity is our greatest national asset.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400">
              <Scale className="w-3.5 h-3.5" />
              <span>02. The Bhinneka Tunggal Ika Challenge</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Resolve real-life school dilemmas, combat accent bullying, and apply Pancasila Sila 3 to promote tolerance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-400">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>03. The Unity Crisis</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Defuse 5 realistic national emergencies: viral social media hoaxes, religious discrimination, and resource disputes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04. Connect the Islands</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Manage a 100-point budget to build maritime Tol Laut, Palapa Ring fiber, and 3T remote school equalization.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-purple-400">
              <Users className="w-3.5 h-3.5" />
              <span>05. The National Negotiation</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Mediate between 5 regional leaders (Sumatra to Papua) and reach fair compromises through Musyawarah Mufakat.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Shield className="w-3.5 h-3.5" />
              <span>06. Save Indonesia 2045</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Synthesize 4 national pillars for Golden Indonesia 2045 and make your personal pledge to keep the nation united.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
