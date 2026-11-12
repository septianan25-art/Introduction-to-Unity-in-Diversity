import React, { useState } from 'react';
import { X, BookOpen, Compass, Shield, Users, Landmark, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/soundFx';

interface HandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HandbookModal: React.FC<HandbookModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'diversity' | 'bhinneka' | 'integration' | 'pancasila'>('diversity');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">National Unity Task Force Handbook</h2>
              <p className="text-xs text-slate-400">Grade 9 Social Studies (IPS) Core Reference Guide</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 gap-2 pt-2">
          <button
            onClick={() => { sound.playClick(); setActiveTab('diversity'); }}
            className={`py-2 px-3 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'diversity' 
                ? 'border-amber-400 text-amber-400 bg-slate-900' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Indonesian Diversity
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('bhinneka'); }}
            className={`py-2 px-3 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'bhinneka' 
                ? 'border-amber-400 text-amber-400 bg-slate-900' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Bhinneka Tunggal Ika
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('integration'); }}
            className={`py-2 px-3 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'integration' 
                ? 'border-amber-400 text-amber-400 bg-slate-900' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. National Integration
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('pancasila'); }}
            className={`py-2 px-3 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'pancasila' 
                ? 'border-amber-400 text-amber-400 bg-slate-900' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Pancasila Foundation
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm text-slate-300 leading-relaxed">
          {activeTab === 'diversity' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h3 className="text-white font-semibold flex items-center gap-2 mb-1.5">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  Why is Indonesia So Diverse?
                </h3>
                <p className="text-xs text-slate-300">
                  Indonesia spans over 17,000 islands and sits at the strategic maritime crossroads between the Indian and Pacific Oceans. Two key factors created our vast diversity:
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">Archipelagic Isolation:</strong> Separated by oceans and mountain ranges, ancestral communities developed specialized customs, architecture, and over 718 regional languages.</li>
                  <li><strong className="text-white">Strategic Crossroads:</strong> Ancient trading routes brought trade and cultural exchange with India, China, the Arab world, and Europe.</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/40">
                  <span className="font-bold text-amber-400 block mb-1">Ethnic Diversity (Suku Bangsa)</span>
                  <p>Over 1,340 ethnic groups (Javanese, Sundanese, Batak, Minang, Dayak, Bugis, Asmat, Dani, Balinese, and many more), each with rich customary wisdom (Adat).</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/40">
                  <span className="font-bold text-cyan-400 block mb-1">Religious Harmony (Agama)</span>
                  <p>Islam, Protestantism, Catholicism, Hinduism, Buddhism, Confucianism, and ancestral beliefs, protected under Article 29 of UUD 1945.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bhinneka' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h3 className="text-white font-semibold flex items-center gap-2 mb-1.5">
                  <Shield className="w-4 h-4 text-amber-400" />
                  Origin: Mpu Tantular & Kakawin Sutasoma
                </h3>
                <p className="text-xs text-slate-300">
                  In the 14th century, the sage poet <strong className="text-white">Mpu Tantular</strong> of the Majapahit Kingdom wrote in Kakawin Sutasoma:
                </p>
                <div className="my-2.5 p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 font-serif italic text-xs">
                  "Bhinneka Tunggal Ika, Tan Hana Dharma Mangrwa" — Different yet one, there is no duality in truth.
                </div>
                <p className="text-xs text-slate-300">
                  It taught that despite outward differences in religion (Shivaite Hindus and Mahayana Buddhists), all humans share one fundamental truth and must live in harmony. Today it is Indonesia’s official motto under Article 36A of the 1945 Constitution.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs">
                <span className="font-bold text-white block mb-1">Unity vs Uniformity</span>
                <p>
                  Bhinneka Tunggal Ika does NOT mean forcing everyone to become identical. It means celebrating distinct regional cultures while standing united under one sovereign nation and one flag.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'integration' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h3 className="text-white font-semibold flex items-center gap-2 mb-1.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  What is National Integration (Integrasi Nasional)?
                </h3>
                <p className="text-xs text-slate-300">
                  National integration is the continuous process of uniting diverse social, ethnic, regional, and religious groups into a single cohesive national entity with shared political and social harmony.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                  <span className="font-bold text-emerald-400 block mb-1">Supporting Factors (Faktor Pendorong)</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300">
                    <li>Shared historical struggle against colonialism.</li>
                    <li>The 1928 Sumpah Pemuda pledge.</li>
                    <li>Bahasa Indonesia as uniting lingua franca.</li>
                    <li>Pancasila and UUD 1945 legal anchor.</li>
                    <li>The cultural spirit of Gotong Royong.</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-800/40">
                  <span className="font-bold text-rose-400 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Threatening Factors (Faktor Penghambat)
                  </span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300">
                    <li><strong className="text-white">Ethnocentrism:</strong> Believing one’s group is superior.</li>
                    <li><strong className="text-white">Chauvinism:</strong> Blind, fanatical nationalism.</li>
                    <li><strong className="text-white">Hoaxes & SARA:</strong> Fake news sparking hate.</li>
                    <li><strong className="text-white">Regional Inequality:</strong> Unfair development.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pancasila' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h3 className="text-white font-semibold flex items-center gap-2 mb-2">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  Pancasila: The Five Pillars of Indonesian Unity
                </h3>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-amber-400">1. Ketuhanan Yang Maha Esa (Star)</span>
                    <p className="text-slate-300 mt-0.5">Guarantees religious freedom and mutual respect among different faiths.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-amber-400">2. Kemanusiaan yang Adil dan Beradab (Chain)</span>
                    <p className="text-slate-300 mt-0.5">Upholds human dignity, equality, and compassion without discrimination.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-amber-400">3. Persatuan Indonesia (Banyan Tree)</span>
                    <p className="text-slate-300 mt-0.5">Prioritizes national unity, sovereignty, and solidarity above narrow personal or regional interests.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-amber-400">4. Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan (Bull’s Head)</span>
                    <p className="text-slate-300 mt-0.5">Democratic decision-making through dialogue and deliberation for consensus (Musyawarah Mufakat).</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-amber-400">5. Keadilan Sosial bagi Seluruh Rakyat Indonesia (Rice & Cotton)</span>
                    <p className="text-slate-300 mt-0.5">Fair economic distribution, equal public services, and prosperity from Sabang to Merauke.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="py-1.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Close Handbook
          </button>
        </div>

      </div>
    </div>
  );
};
