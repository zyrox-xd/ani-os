// src/sections/Reconstruction.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Eye,
  RefreshCw,
  X,
  CheckCircle2,
  PenTool,
  Image,
  MessageSquare,
  Sparkles,
  Layout,
  Type,
  Briefcase,
  Trophy,
  Send,
  AlertCircle,
} from 'lucide-react';

// Mission data
const missions = [
  {
    id: 'poster',
    title: 'Poster Remake',
    category: 'Layout',
    description:
      'Recreate a classic film poster using only typography and spacing. Focus on hierarchy, alignment, and emotional contrast.',
    difficulty: 'Intermediate',
    reference: 'French New Wave minimal',
    referenceImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&fit=crop',
    analysisQuestions: [
      'What is the first element your eye lands on?',
      'How does the poster guide your attention from top to bottom?',
      'What typographic contrasts (size, weight, spacing) create the mood?',
      'What would you change to make it more modern?',
    ],
    workspacePrompt:
      'Describe your recreation approach. What spacing system (8px grid, modular scale) will you use? Which typefaces? Paste your HTML/CSS code or write a detailed plan.',
    tips: 'Try recreating it first in Figma, then in code. Pay attention to the invisible grid.',
  },
  {
    id: 'manga',
    title: 'Manga Typography Redesign',
    category: 'Typography',
    description:
      'Replace original Japanese sound effect lettering with your own expressive type. Match the energy and emotion of the scene.',
    difficulty: 'Advanced',
    reference: 'Akira / Ghost in the Shell',
    referenceImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&fit=crop',
    analysisQuestions: [
      'What emotions do the original sound effects convey (anger, surprise, intensity)?',
      'How do letterforms, weight, and angle affect the impact?',
      'What colour would intensify the mood? Would it be black, red, or something else?',
      'How does the original integrate with the background art?',
    ],
    workspacePrompt:
      'Sketch your lettering ideas or describe the type treatment you would apply. Consider angle, distortion, texture, and layering.',
    tips: 'Look at manga panels online – note how sound effects become part of the composition.',
  },
  {
    id: 'streetwear',
    title: 'Streetwear Campaign',
    category: 'Branding',
    description:
      'Design a lookbook layout with raw, edgy composition and monospace labels. Use asymmetry and aggressive spacing.',
    difficulty: 'Beginner',
    reference: 'YEEZY Season / Acoldwall',
    referenceImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&fit=crop',
    analysisQuestions: [
      'How does the layout break traditional grid systems?',
      'What role does negative space play in the composition?',
      'Why are monospace fonts used for labels?',
      'How does the colour palette (or lack thereof) affect the brand perception?',
    ],
    workspacePrompt:
      'Create a simple HTML/CSS mockup or describe your layout. Focus on margins, overlapping elements, and rugged typography. Provide a colour palette.',
    tips: 'Use a minimal colour palette (black, white, grey) and experiment with large, cropped images.',
  },
];

const categoryIcons = {
  Layout: Layout,
  Typography: Type,
  Branding: Briefcase,
};

export default function Reconstruction() {
  const [activeMission, setActiveMission] = useState(null);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [missionData, setMissionData] = useState({});
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // Load all mission progress from localStorage
  useEffect(() => {
    const storedCompleted = localStorage.getItem('anios_completed_missions');
    if (storedCompleted) setCompletedMissions(JSON.parse(storedCompleted));

    const storedData = localStorage.getItem('anios_mission_data');
    if (storedData) setMissionData(JSON.parse(storedData));
  }, []);

  // Save mission progress when changed
  const saveMissionData = (missionId, field, value) => {
    const updated = {
      ...missionData,
      [missionId]: {
        ...(missionData[missionId] || {}),
        [field]: value,
      },
    };
    setMissionData(updated);
    localStorage.setItem('anios_mission_data', JSON.stringify(updated));
  };

  const completeMission = (missionId) => {
    if (!completedMissions.includes(missionId)) {
      const updated = [...completedMissions, missionId];
      setCompletedMissions(updated);
      localStorage.setItem('anios_completed_missions', JSON.stringify(updated));
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);
    }
    setActiveMission(null);
  };

  const openMission = (mission) => {
    setActiveMission(mission);
  };

  const isMissionComplete = (missionId) => completedMissions.includes(missionId);

  const filteredMissions =
    activeCategory === 'All'
      ? missions
      : missions.filter((m) => m.category === activeCategory);

  const completionCount = completedMissions.length;
  const totalMissions = missions.length;
  const completionPercentage = (completionCount / totalMissions) * 100;

  const handleSubmitForReview = () => {
    setShowSubmitAlert(true);
    setTimeout(() => setShowSubmitAlert(false), 3000);
  };

  return (
    <section className="py-20 px-6 pb-24 relative overflow-hidden">
      {/* Confetti effect placeholder (simple celebration) */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-4xl animate-bounce">🎉✨</div>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-anios-indigo/5 via-transparent to-transparent pointer-events-none" />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-anios-indigo">
          Reconstruction Missions
        </span>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mt-4">
          Train your eye
        </h1>
        <p className="text-anios-muted text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Reference → Analyze → Recreate → Learn why it works
        </p>
      </motion.div>

      {/* Progress overview */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="glass-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-anios-indigo" />
            <span className="text-sm font-mono">
              {completionCount} / {totalMissions} missions completed
            </span>
          </div>
          <div className="flex-1 w-full sm:max-w-xs">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                className="h-full bg-anios-indigo rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {['All', 'Layout', 'Typography', 'Branding'].map((cat) => {
            const Icon = categoryIcons[cat] || Target;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 text-sm ${
                  activeCategory === cat
                    ? 'bg-anios-indigo/20 border-anios-indigo text-white'
                    : 'border-white/10 text-anios-muted hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mission grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {filteredMissions.map((mission, i) => {
            const CategoryIcon = categoryIcons[mission.category] || Target;
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`glass-card p-6 hover:scale-[1.02] transition-transform duration-500 ${
                  isMissionComplete(mission.id) ? 'border-anios-indigo/50 ring-1 ring-anios-indigo/30' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-anios-indigo/10">
                    <CategoryIcon className="w-5 h-5 text-anios-indigo" />
                  </div>
                  {isMissionComplete(mission.id) && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <h3 className="text-2xl font-playfair font-bold mt-3">{mission.title}</h3>
                <p className="text-anios-muted text-sm mt-2">{mission.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
                    {mission.category}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
                    {mission.difficulty}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <span className="text-xs text-anios-subtle font-mono">
                    Ref: {mission.reference}
                  </span>
                  <button
                    onClick={() => openMission(mission)}
                    className="text-sm flex items-center gap-1 text-anios-indigo hover:underline"
                  >
                    {isMissionComplete(mission.id) ? 'Review' : 'Start Mission'}
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Methodology reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-anios-indigo" />
            <span className="text-sm font-mono tracking-wider">The method</span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-anios-muted">
            <span>① Observe deeply</span>
            <span>→ ② Deconstruct decisions</span>
            <span>→ ③ Recreate faithfully</span>
            <span>→ ④ Understand why it works</span>
          </div>
        </motion.div>
      </div>

      {/* Mission Modal with Tabs */}
      <AnimatePresence>
        {activeMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveMission(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-card p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-playfair font-bold">{activeMission.title}</h2>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">
                      {activeMission.category}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">
                      {activeMission.difficulty}
                    </span>
                  </div>
                </div>
                <button onClick={() => setActiveMission(null)} className="p-1 rounded-full hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-white/10 mb-6">
                <div className="flex gap-4">
                  {['Analysis', 'Workspace', 'Reference'].map((tab) => (
                    <button
                      key={tab}
                      className="pb-2 text-sm font-mono text-anios-muted hover:text-anios-indigo transition-colors"
                      onClick={() => {
                        const el = document.getElementById(`modal-${tab.toLowerCase()}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Analysis section */}
              <div id="modal-analysis" className="space-y-6 mb-8">
                <div>
                  <p className="text-sm font-mono text-anios-muted mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Analysis Questions
                  </p>
                  <div className="space-y-4">
                    {activeMission.analysisQuestions.map((q, idx) => {
                      const savedAnswer = missionData[activeMission.id]?.analysis?.[idx] || '';
                      return (
                        <div key={idx}>
                          <p className="text-sm text-anios-text mb-1">{q}</p>
                          <textarea
                            rows={2}
                            value={savedAnswer}
                            onChange={(e) => {
                              const newAnalysis = {
                                ...(missionData[activeMission.id]?.analysis || {}),
                                [idx]: e.target.value,
                              };
                              saveMissionData(activeMission.id, 'analysis', newAnalysis);
                            }}
                            placeholder="Write your observations..."
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-anios-indigo"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Workspace section */}
              <div id="modal-workspace" className="space-y-6 mb-8">
                <div>
                  <p className="text-sm font-mono text-anios-muted mb-2 flex items-center gap-2">
                    <PenTool className="w-4 h-4" /> Recreation workspace
                  </p>
                  <textarea
                    rows={6}
                    value={missionData[activeMission.id]?.workspace || ''}
                    onChange={(e) => saveMissionData(activeMission.id, 'workspace', e.target.value)}
                    placeholder={activeMission.workspacePrompt}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-anios-indigo"
                  />
                  <p className="text-xs text-anios-subtle mt-2 italic">{activeMission.tips}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSubmitForReview}
                    className="px-4 py-2 rounded-xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center gap-2 hover:bg-anios-indigo/30 transition"
                  >
                    <Send className="w-4 h-4" />
                    Submit for review (simulated)
                  </button>
                </div>
                {showSubmitAlert && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Your work has been logged (demo).
                  </div>
                )}
              </div>

              {/* Reference section */}
              <div id="modal-reference" className="space-y-6 mb-8">
                <div>
                  <p className="text-sm font-mono text-anios-muted mb-2 flex items-center gap-2">
                    <Image className="w-4 h-4" /> Reference material
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30">
                    <img
                      src={activeMission.referenceImage}
                      alt={activeMission.reference}
                      className="w-full h-auto max-h-64 object-cover"
                    />
                  </div>
                  <p className="text-xs text-anios-subtle mt-2">
                    {activeMission.reference}
                  </p>
                </div>
              </div>

              {/* Completion checklist */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-anios-muted" />
                    <span className="text-xs text-anios-muted">
                      Complete all analysis and workspace to mark as done.
                    </span>
                  </div>
                  <button
                    onClick={() => completeMission(activeMission.id)}
                    className="px-6 py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center gap-2 hover:bg-anios-indigo/30 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isMissionComplete(activeMission.id) ? 'Completed ✓' : 'Mark Mission Complete'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extra inspiration */}
      <div className="max-w-7xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 text-center"
        >
          <Sparkles className="w-6 h-6 text-anios-indigo mx-auto mb-3" />
          <h3 className="text-xl font-playfair font-bold">Keep a visual diary</h3>
          <p className="text-anios-muted text-sm max-w-2xl mx-auto mt-2">
            The best designers are obsessive observers. Every day, analyse one interface,
            poster, or piece of architecture. Write down why it works. Your taste will
            compound.
          </p>
        </motion.div>
      </div>
    </section>
  );
}