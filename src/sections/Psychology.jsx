// src/sections/Psychology.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Zap,
  Target,
  Heart,
  Sparkles,
  BookOpen,
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  X,
  Calendar,
  Smile,
  Meh,
  Frown,
  Wind,
} from 'lucide-react';

// Topic definitions
const topics = [
  {
    icon: Target,
    title: 'Perfectionism',
    insight: 'Done is better than perfect. Ship, then refine. Imperfect work teaches more than a flawless draft you never share.',
    practice: 'Set a timer for 25 minutes. Create something intentionally imperfect. Share it with one person.',
  },
  {
    icon: Zap,
    title: 'Burnout prevention',
    insight: 'Creative energy is renewable – but only if you rest intentionally. Burnout is not a badge of honour.',
    practice: 'Schedule two “creative silence” hours per week. No screens, no input. Let your mind wander.',
  },
  {
    icon: Brain,
    title: 'Taste vs. Skill gap',
    insight: 'The gap shrinks only by making. Not by watching. Your taste will always lead – that is a gift, not a curse.',
    practice: 'Recreate one design you admire. Then modify it. Your skill will catch up.',
  },
  {
    icon: Heart,
    title: 'Fear of collaboration',
    insight: 'Great work is rarely solo. Share early, share often. Vulnerability is strength, not weakness.',
    practice: 'Ask one peer for feedback on a current project. Give specific permission: “Please be honest.”',
  },
  {
    icon: Wind,
    title: 'Overthinking',
    insight: 'Analysis paralysis is fear disguised as preparation. Set a decision deadline and honour it.',
    practice: 'For your next decision, flip a coin. Notice your emotional reaction before it lands – that is your real answer.',
  },
];

// Prompts for journaling
const prompts = [
  'What is one creative fear you have right now?',
  'Describe a moment when you felt truly in flow. What made it possible?',
  'What would you create if you knew nobody would judge it?',
  'Write a short letter to your future creative self.',
  'What does “enough” look like for today’s work?',
  'Name one small win from this week.',
  'What boundary do you need to set to protect your energy?',
];

// Mood options
const moods = [
  { value: 'calm', emoji: '😌', label: 'Calm' },
  { value: 'inspired', emoji: '✨', label: 'Inspired' },
  { value: 'anxious', emoji: '😰', label: 'Anxious' },
  { value: 'tired', emoji: '😴', label: 'Tired' },
  { value: 'hopeful', emoji: '🌟', label: 'Hopeful' },
];

export default function Psychology() {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '',
  });
  const [moodCheckin, setMoodCheckin] = useState(null);

  // Load journal entries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('anios_psych_entries');
    if (stored) setEntries(JSON.parse(stored));
    const storedMood = localStorage.getItem('anios_last_mood');
    if (storedMood) setMoodCheckin(JSON.parse(storedMood));
  }, []);

  useEffect(() => {
    localStorage.setItem('anios_psych_entries', JSON.stringify(entries));
  }, [entries]);

  // Random prompt every few seconds? Not auto – just manual refresh.
  const randomPrompt = () => {
    const newIndex = Math.floor(Math.random() * prompts.length);
    setCurrentPromptIndex(newIndex);
  };

  const openAddModal = (promptText = null) => {
    setEditingEntry(null);
    setFormData({
      title: promptText ? promptText.slice(0, 60) : 'Reflection',
      content: '',
      mood: '',
    });
    setShowModal(true);
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      content: entry.content,
      mood: entry.mood || '',
    });
    setShowModal(true);
  };

  const saveEntry = () => {
    if (!formData.content.trim()) return;
    const newEntry = {
      id: editingEntry ? editingEntry.id : Date.now().toString(),
      title: formData.title || 'Untitled reflection',
      content: formData.content,
      mood: formData.mood,
      date: editingEntry ? editingEntry.date : new Date().toISOString(),
    };
    if (editingEntry) {
      setEntries(entries.map(e => e.id === editingEntry.id ? newEntry : e));
    } else {
      setEntries([newEntry, ...entries]);
    }
    setShowModal(false);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const saveMood = (moodValue) => {
    const moodData = {
      mood: moodValue,
      date: new Date().toISOString(),
    };
    setMoodCheckin(moodData);
    localStorage.setItem('anios_last_mood', JSON.stringify(moodData));
  };

  const getMoodEmoji = (moodValue) => {
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.emoji : '📝';
  };

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
          Creative Psychology
        </span>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mt-4">
          Understand your mind
        </h1>
        <p className="text-anios-muted text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Tools for perfectionism, burnout, taste vs skill, and creative confidence.
        </p>
      </motion.div>

      {/* Topic cards grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 hover:bg-white/[0.07] transition"
          >
            <topic.icon className="w-6 h-6 text-anios-indigo mb-3" />
            <h3 className="text-xl font-playfair font-bold">{topic.title}</h3>
            <p className="text-anios-muted text-sm mt-2 leading-relaxed">{topic.insight}</p>
            <div className="mt-3 p-3 bg-black/30 rounded-xl">
              <p className="text-xs text-anios-subtle font-mono">Practice</p>
              <p className="text-sm text-anios-text mt-1">{topic.practice}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mood check-in & Prompt generator */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        {/* Mood check-in */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Smile className="w-5 h-5 text-anios-indigo" />
            <h3 className="text-xl font-playfair font-bold">Mood check-in</h3>
          </div>
          <p className="text-sm text-anios-muted mb-3">How are you feeling right now?</p>
          <div className="flex gap-3 flex-wrap">
            {moods.map(mood => (
              <button
                key={mood.value}
                onClick={() => saveMood(mood.value)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition ${
                  moodCheckin?.mood === mood.value
                    ? 'bg-anios-indigo/20 border-anios-indigo'
                    : 'border-white/10 hover:bg-white/5'
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </button>
            ))}
          </div>
          {moodCheckin && (
            <p className="text-xs text-anios-subtle mt-3 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Last check-in: {new Date(moodCheckin.date).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Prompt generator */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-anios-indigo" />
              <h3 className="text-xl font-playfair font-bold">Journal prompt</h3>
            </div>
            <button onClick={randomPrompt} className="p-1 rounded-full hover:bg-white/10">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <p className="text-lg font-playfair italic text-anios-text leading-relaxed">
            “{prompts[currentPromptIndex]}”
          </p>
          <button
            onClick={() => openAddModal(prompts[currentPromptIndex])}
            className="mt-4 px-4 py-2 rounded-xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Write reflection
          </button>
        </div>
      </div>

      {/* Journal entries log */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-anios-indigo" />
            <h2 className="text-2xl font-playfair font-bold">Reflection log</h2>
          </div>
          <button
            onClick={() => openAddModal()}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> New
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-16 text-anios-muted border border-dashed border-white/10 rounded-[30px]">
            <Brain className="w-12 h-12 mx-auto opacity-30" />
            <p className="mt-3">Your reflection log is empty. Start with a prompt above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map(entry => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-5 group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-playfair font-bold">{entry.title}</h3>
                      {entry.mood && (
                        <span className="text-sm">{getMoodEmoji(entry.mood)}</span>
                      )}
                    </div>
                    <p className="text-xs text-anios-subtle font-mono mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(entry.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => openEditModal(entry)} className="text-anios-muted hover:text-white">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteEntry(entry.id)} className="text-anios-muted hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-black/30 rounded-xl">
                  <p className="text-sm text-anios-muted whitespace-pre-wrap leading-relaxed">
                    {entry.content.length > 300 ? entry.content.slice(0, 300) + '…' : entry.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
                  {editingEntry ? 'Edit reflection' : 'New reflection'}
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
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm"
                    placeholder="Reflection title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Mood (optional)</label>
                  <div className="flex gap-2">
                    {moods.map(mood => (
                      <button
                        key={mood.value}
                        onClick={() => setFormData({ ...formData, mood: mood.value })}
                        className={`flex flex-col items-center p-2 rounded-xl border ${
                          formData.mood === mood.value
                            ? 'bg-anios-indigo/20 border-anios-indigo'
                            : 'border-white/10'
                        }`}
                      >
                        <span className="text-xl">{mood.emoji}</span>
                        <span className="text-[10px]">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Content</label>
                  <textarea
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-anios-indigo"
                    placeholder="Write your thoughts freely..."
                  />
                </div>
                <button
                  onClick={saveEntry}
                  className="w-full py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" /> Save reflection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer resource suggestion */}
      <div className="max-w-7xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 text-center"
        >
          <BookOpen className="w-6 h-6 text-anios-indigo mx-auto mb-3" />
          <h3 className="text-xl font-playfair font-bold">Recommended reading</h3>
          <p className="text-anios-muted text-sm mt-2">
            “The War of Art” by Steven Pressfield · “Big Magic” by Elizabeth Gilbert · “Creativity, Inc.” by Ed Catmull
          </p>
          <p className="text-xs text-anios-subtle mt-3 italic">
            The creative mind is a garden. Tend it daily.
          </p>
        </motion.div>
      </div>
    </section>
  );
}