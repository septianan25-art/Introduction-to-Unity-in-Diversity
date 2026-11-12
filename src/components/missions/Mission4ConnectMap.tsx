import React, { useState } from 'react';
import { Network, Check, ArrowRight, AlertTriangle, Sparkles, HelpCircle, Shield, Anchor, Radio, GraduationCap, Users2, Truck, Wheat } from 'lucide-react';
import { INFRASTRUCTURE_PROJECTS, ASSET_IMAGES } from '../../data/gameData';
import { InfrastructureProject, RegionKey } from '../../types/game';
import { sound } from '../../utils/soundFx';

interface Mission4ConnectMapProps {
  onProjectFunded: (unityBonus: number, stabilityBonus: number, knowledgeBonus: number) => void;
  onMissionFinish: () => void;
  onOpenHint: (text: string) => void;
}

interface IslandNode {
  id: RegionKey;
  name: string;
  x: number; // percentage on SVG
  y: number; // percentage on SVG
  connected: boolean;
}

export const Mission4ConnectMap: React.FC<Mission4ConnectMapProps> = ({
  onProjectFunded,
  onMissionFinish,
  onOpenHint,
}) => {
  const [budget, setBudget] = useState<number>(100);
  const [fundedProjectIds, setFundedProjectIds] = useState<string[]>([]);
  const [activeProjectModal, setActiveProjectModal] = useState<InfrastructureProject | null>(null);
  const [unexpectedEventFired, setUnexpectedEventFired] = useState<boolean>(false);
  const [unexpectedEventActive, setUnexpectedEventActive] = useState<boolean>(false);

  // Regional coordinates on strategic map canvas (scaled 0-100%)
  const islandNodes: Record<RegionKey, { name: string; x: number; y: number }> = {
    sumatra: { name: 'Sumatra', x: 18, y: 38 },
    java: { name: 'Java', x: 38, y: 76 },
    kalimantan: { name: 'Kalimantan', x: 44, y: 35 },
    sulawesi: { name: 'Sulawesi', x: 63, y: 46 },
    bali_nusa: { name: 'Bali & Nusa Tenggara', x: 55, y: 82 },
    maluku: { name: 'Maluku', x: 78, y: 48 },
    papua: { name: 'Papua', x: 92, y: 56 },
  };

  const getCategoryIcon = (category: InfrastructureProject['category']) => {
    switch (category) {
      case 'Transportation': return <Anchor className="w-4 h-4 text-cyan-400" />;
      case 'Communication': return <Radio className="w-4 h-4 text-amber-400" />;
      case 'Education': return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case 'Cultural Exchange': return <Users2 className="w-4 h-4 text-rose-400" />;
      case 'Economic Cooperation': return <Wheat className="w-4 h-4 text-yellow-400" />;
      default: return <Network className="w-4 h-4 text-cyan-400" />;
    }
  };

  const handleFundProject = (proj: InfrastructureProject) => {
    if (fundedProjectIds.includes(proj.id)) return;
    if (budget < proj.cost) {
      sound.playWarning();
      return;
    }

    sound.playSuccess();
    const newBudget = budget - proj.cost;
    const newFunded = [...fundedProjectIds, proj.id];
    setBudget(newBudget);
    setFundedProjectIds(newFunded);
    setActiveProjectModal(null);

    onProjectFunded(proj.unityBonus, proj.stabilityBonus, proj.knowledgeBonus);

    // Trigger unexpected event when 2 projects are funded
    if (!unexpectedEventFired && newFunded.length === 2) {
      setUnexpectedEventFired(true);
      setTimeout(() => {
        setUnexpectedEventActive(true);
      }, 400);
    }
  };

  const handleResolveUnexpectedEvent = (adaptation: 'subsidy' | 'reroute') => {
    sound.playSuccess();
    setUnexpectedEventActive(false);
    if (adaptation === 'subsidy') {
      // Award extra resilience bonus
      onProjectFunded(6, 5, 20);
    } else {
      onProjectFunded(4, 3, 15);
    }
  };

  // Check which connections are active
  const activeConnections = INFRASTRUCTURE_PROJECTS
    .filter(p => fundedProjectIds.includes(p.id))
    .map(p => ({
      from: islandNodes[p.regionsConnected[0]],
      to: islandNodes[p.regionsConnected[1]],
      category: p.category,
    }));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-cyan-400 font-mono font-semibold uppercase tracking-wider">
              <span>Mission 4 of 6</span>
              <span>·</span>
              <span>Strategic Infrastructure Grid</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
              Connect the Islands
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Bridge the Indonesian archipelago through transportation, high-speed fiber, education equity, and cultural camps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 px-4 rounded-xl bg-cyan-950/60 border border-cyan-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Integration Budget</span>
              <span className="text-base font-bold text-cyan-400">{budget} / 100 UP</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onOpenHint(
                  'Balancing transportation (Tol Laut), communication (Palapa Ring), and education (3T Teachers) creates the strongest inter-island synergy!'
                );
              }}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors"
              title="Advisor Hint"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">Archipelagic Topology Map (Sabang to Merauke)</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <Network className="w-4 h-4" />
            <span>{fundedProjectIds.length} / {INFRASTRUCTURE_PROJECTS.length} Corridors Active</span>
          </span>
        </div>

        {/* Map Canvas */}
        <div className="relative w-full aspect-[2.1/1] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Background Map Art */}
          <img 
            src={ASSET_IMAGES.map} 
            alt="Strategic Map of Indonesia" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

          {/* SVG Overlay for dynamic connection routes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {activeConnections.map((conn, idx) => (
              <line
                key={idx}
                x1={`${conn.from.x}%`}
                y1={`${conn.from.y}%`}
                x2={`${conn.to.x}%`}
                y2={`${conn.to.y}%`}
                stroke="url(#lineGrad)"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-[dash_15s_linear_infinite]"
              />
            ))}
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>

          {/* Island Interactive Nodes */}
          {Object.entries(islandNodes).map(([key, node]) => {
            const isConnected = INFRASTRUCTURE_PROJECTS.some(
              p => fundedProjectIds.includes(p.id) && p.regionsConnected.includes(key as RegionKey)
            );

            return (
              <div
                key={key}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group cursor-default"
              >
                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                  isConnected 
                    ? 'bg-emerald-400 border-white shadow-[0_0_12px_rgba(52,211,153,0.8)]' 
                    : 'bg-slate-600 border-slate-400'
                }`} />
                <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700/80 shadow">
                  {node.name}
                </span>
              </div>
            );
          })}

        </div>

        {/* Project Selection Grid */}
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Available National Integration Projects (Click to Inspect & Fund)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {INFRASTRUCTURE_PROJECTS.map((proj) => {
              const isFunded = fundedProjectIds.includes(proj.id);
              const canAfford = budget >= proj.cost;

              return (
                <div
                  key={proj.id}
                  className={`p-4 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                    isFunded
                      ? 'bg-emerald-950/20 border-emerald-800/60 text-slate-300'
                      : canAfford
                      ? 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                      : 'bg-slate-800/20 border-slate-800/60 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-semibold text-white">
                        {getCategoryIcon(proj.category)}
                        <span>{proj.title}</span>
                      </div>
                      <span className="font-mono text-cyan-400 font-bold shrink-0 ml-2">
                        {proj.cost} UP
                      </span>
                    </div>

                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-emerald-300">
                      <strong>National Impact: </strong>{proj.impactDescription}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-emerald-400 font-bold">+{proj.unityBonus} Unity</span>
                      <span className="text-amber-400 font-bold">+{proj.knowledgeBonus} KP</span>
                    </div>

                    {isFunded ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" />
                        <span>Funded & Active</span>
                      </span>
                    ) : (
                      <button
                        disabled={!canAfford}
                        onClick={() => handleFundProject(proj)}
                        className="py-1 px-3.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs transition-colors shadow-sm"
                      >
                        Fund Project
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Proceed to Mission 5 button */}
        {fundedProjectIds.length >= 3 && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Sufficient National Corridors Established! Ready for Mission 5.</span>
            </span>
            <button
              onClick={() => {
                sound.playFanfare();
                onMissionFinish();
              }}
              className="flex items-center gap-2 py-2 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-md"
            >
              <span>Proceed to National Negotiation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* Dynamic Unexpected Event Modal */}
      {unexpectedEventActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border-2 border-cyan-500 rounded-2xl p-6 shadow-2xl text-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">UNEXPECTED MARITIME LOGISTICS CONTINGENCY</h3>
                <p className="text-xs text-cyan-400 font-mono">Banda Sea Extreme Monsoon Swell</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-4">
              Severe 4-meter swells in the Banda Sea temporarily halt standard cargo vessels heading to Maluku and Papua. Outer islands risk running low on essential medical supplies and textbooks. How does the Task Force adapt?
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => handleResolveUnexpectedEvent('subsidy')}
                className="w-full text-left p-3.5 rounded-xl border border-cyan-800/80 bg-cyan-950/40 hover:bg-cyan-900/50 text-xs transition-colors space-y-1"
              >
                <span className="font-bold text-white block">Option A: Emergency Air Logistics Airlift (Jembatan Udara)</span>
                <p className="text-slate-300 text-[11px]">Deploy subsidized cargo aircraft to land in mountain airstrips, ensuring remote clinics receive medicines on time.</p>
              </button>

              <button
                onClick={() => handleResolveUnexpectedEvent('reroute')}
                className="w-full text-left p-3.5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-xs transition-colors space-y-1"
              >
                <span className="font-bold text-white block">Option B: Inter-Island Protected Channel Rerouting</span>
                <p className="text-slate-300 text-[11px]">Reroute ships through sheltered straits and mobilize local cooperative fishing fleets for coastal supply drops.</p>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
