// src/sections/GhostMode.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Shield,
  Sparkles,
  PenTool,
  Plus,
  Trash2,
  Edit3,
  X,
  Search,
  Filter,
  Copy,
  CheckCircle,
  Mail,
  AlertTriangle,
  Presentation,
  DollarSign,
  Heart,
} from 'lucide-react';

// Default script templates
const defaultScripts = [
  {
    id: '1',
    title: 'Initial client email (discovery)',
    category: 'Emails',
    content: `Subject: Creative discovery for [Project Name]

Hi [Client Name],

Thank you for considering me for this project. To ensure we're aligned, I'd love to understand:

1. What feeling should the final design evoke?
2. Who is the primary audience?
3. Are there any references or brands you admire?
4. What is your ideal timeline and budget range?

Once I have these, I’ll share a tailored proposal.

Looking forward to creating something intentional.

[Your Name]`,
  },
  {
    id: '2',
    title: 'Revision boundaries script',
    category: 'Boundaries',
    content: `“I include two rounds of revisions in the estimate. Additional rounds are billed at $X per hour. This ensures we stay focused and finish on time.”`,
  },
  {
    id: '3',
    title: 'Pricing conversation (calm authority)',
    category: 'Pricing',
    content: `“My rate reflects not just execution, but years of taste refinement and strategic thinking. If budget is a constraint, we can reduce scope – I'm happy to suggest what to prioritize.”`,
  },
  {
    id: '4',
    title: 'Presentation opening script',
    category: 'Presentations',
    content: `“Before I walk you through the design, let me set context: I focused on [key goal]. The decisions you'll see are all intentional – from spacing to colour psychology. Feel free to pause me with questions.”`,
  },
  {
    id: '5',
    title: 'Declining a project (graceful)',
    category: 'Emails',
    content: `Thank you for reaching out. After reviewing the brief, I don't think I'm the right fit for this specific project. I want to recommend [Name/Studio] who specialises in this area. Wishing you the best.`,
  },
];

const categories = ['All', 'Emails', 'Boundaries', 'Presentations', 'Pricing'];

export default function GhostMode() {
  const [scripts, setScripts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingScript, setEditingScript] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Emails',
    content: '',
  });

  // Load scripts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('anios_ghost_scripts');
    if (stored) {
      setScripts(JSON.parse(stored));
    } else {
      setScripts(defaultScripts);
    }
  }, []);

  // Save to localStorage whenever scripts change
  useEffect(() => {
    localStorage.setItem('anios_ghost_scripts', JSON.stringify(scripts));
  }, [scripts]);

  const openAddModal = () => {
    setEditingScript(null);
    setFormData({ title: '', category: 'Emails', content: '' });
    setShowModal(true);
  };

  const openEditModal = (script) => {
    setEditingScript(script);
    setFormData({
      title: script.title,
      category: script.category,
      content: script.content,
    });
    setShowModal(true);
  };

  const saveScript = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;
    if (editingScript) {
      setScripts(scripts.map(s => s.id === editingScript.id ? { ...editingScript, ...formData } : s));
    } else {
      setScripts([{ ...formData, id: Date.now().toString() }, ...scripts]);
    }
    setShowModal(false);
  };

  const deleteScript = (id) => {
    setScripts(scripts.filter(s => s.id !== id));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const filteredScripts = scripts.filter(script => {
    if (activeCategory !== 'All' && script.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return script.title.toLowerCase().includes(q) || script.content.toLowerCase().includes(q);
    }
    return true;
  });

  // Tips data
  const tips = [
    { icon: Shield, title: 'Boundaries are kindness', text: 'Clear limits prevent resentment. Clients respect clarity.' },
    { icon: Sparkles, title: 'Present with conviction', text: 'Explain your decisions – don’t ask “What do you think?” Ask “What feeling does this evoke?”' },
    { icon: Heart, title: 'Silence is a tool', text: 'After presenting, pause. Let the work breathe. Don’t fill silence with nervous talk.' },
    { icon: AlertTriangle, title: 'Say no gracefully', text: '“I’m not the right fit” is professional. Refer elsewhere if possible.' },
  ];

  return (
    <section className="py-20 px-6 pb-24 relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-anios-indigo/5 via-transparent to-transparent pointer-events-none" />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-anios-indigo">
          Ghost Mode
        </span>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mt-4">
          Professional Confidence
        </h1>
        <p className="text-anios-muted text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Client scripts, boundary templates, and presentation tools – communicate with calm authority.
        </p>
      </motion.div>

      {/* Tips cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <tip.icon className="w-5 h-5 text-anios-indigo mb-2" />
            <h3 className="font-playfair font-bold text-sm">{tip.title}</h3>
            <p className="text-xs text-anios-muted mt-1">{tip.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Script Library header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-anios-indigo" />
            <h2 className="text-2xl font-playfair font-bold">Script Library</h2>
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New script
          </button>
        </div>
      </div>

      {/* Filters & search */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs transition ${
                  activeCategory === cat
                    ? 'bg-anios-indigo/30 border border-anios-indigo/50'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-anios-muted" />
            <input
              type="text"
              placeholder="Search scripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-black/30 border border-white/10 rounded-full text-sm w-64 focus:outline-none focus:border-anios-indigo"
            />
          </div>
        </div>
      </div>

      {/* Scripts grid */}
      <div className="max-w-7xl mx-auto">
        {filteredScripts.length === 0 ? (
          <div className="text-center py-20 text-anios-muted border border-dashed border-white/10 rounded-[30px]">
            <PenTool className="w-12 h-12 mx-auto opacity-30" />
            <p className="mt-3">No scripts found. Create your first script.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredScripts.map((script, idx) => (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-5 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-anios-indigo uppercase tracking-wider">
                      {script.category}
                    </span>
                    <h3 className="text-xl font-playfair font-bold mt-1">{script.title}</h3>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => openEditModal(script)} className="text-anios-muted hover:text-white">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteScript(script.id)} className="text-anios-muted hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-black/30 rounded-xl">
                  <pre className="text-sm text-anios-muted whitespace-pre-wrap font-sans leading-relaxed">
                    {script.content.length > 200 ? script.content.slice(0, 200) + '…' : script.content}
                  </pre>
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => copyToClipboard(script.content, script.id)}
                    className="text-xs flex items-center gap-1 text-anios-indigo hover:underline"
                  >
                    {copySuccess === script.id ? (
                      <><CheckCircle className="w-3 h-3" /> Copied!</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copy script</>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Extra: Confidence reminders */}
      <div className="max-w-7xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 text-center"
        >
          <Shield className="w-8 h-8 text-anios-indigo mx-auto mb-3" />
          <h3 className="text-xl font-playfair font-bold">You are not a “coder”.</h3>
          <p className="text-anios-muted text-sm max-w-2xl mx-auto mt-2">
            You are a visual architect who solves problems with intention.
            Your rates reflect years of taste development, not hours of typing.
            Own that.
          </p>
        </motion.div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-2xl w-full max-h-[85vh] overflow-y-auto glass-card p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-playfair font-bold">
                  {editingScript ? 'Edit script' : 'New script'}
                </h2>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-anios-indigo"
                    placeholder="e.g., Follow‑up after proposal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Script content</label>
                  <textarea
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-anios-indigo"
                    placeholder="Write your script here... Use [brackets] for placeholders like [Client Name]"
                  />
                </div>
                <button
                  onClick={saveScript}
                  className="w-full py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center justify-center gap-2"
                >
                  <PenTool className="w-4 h-4" /> Save script
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}