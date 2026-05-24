// src/sections/Archive.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Archive as ArchiveIcon,
  Plus,
  Trash2,
  Edit3,
  X,
  Tag,
  Calendar,
  Lock,
  Unlock,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Sparkles,
  Heart,
  Star,
  Moon,
  Sun,
  Cloud,
  Zap,
} from 'lucide-react';

// Mood options with emojis
const moodOptions = [
  { value: 'peaceful', emoji: '🌿', label: 'Peaceful' },
  { value: 'inspired', emoji: '✨', label: 'Inspired' },
  { value: 'melancholic', emoji: '🌙', label: 'Melancholic' },
  { value: 'hopeful', emoji: '🌟', label: 'Hopeful' },
  { value: 'chaotic', emoji: '🌀', label: 'Chaotic' },
  { value: 'nostalgic', emoji: '📼', label: 'Nostalgic' },
];

// Category tags
const categoryTags = ['Vision', 'Memory', 'Dream', 'Idea', 'Lesson', 'Message'];

// Default entries (example)
const defaultEntries = [
  {
    id: '1',
    type: 'vision',
    title: 'The silent interface',
    content: 'A UI with no visible chrome – everything appears on hover, then disappears. Only content remains.',
    tags: ['Vision', 'Idea'],
    mood: 'inspired',
    date: new Date().toISOString(),
    isPrivate: false,
  },
  {
    id: '2',
    type: 'message',
    title: 'To my future self',
    content: 'Remember why you started: to design things that feel like poetry.',
    tags: ['Message', 'Memory'],
    mood: 'nostalgic',
    date: new Date(Date.now() - 86400000).toISOString(),
    isPrivate: true,
  },
  {
    id: '3',
    type: 'note',
    title: 'Observed today',
    content: 'The new Linear update uses negative space masterfully. Study their spacing system.',
    tags: ['Lesson', 'Idea'],
    mood: 'inspired',
    date: new Date(Date.now() - 172800000).toISOString(),
    isPrivate: false,
  },
];

export default function Archive() {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, vision, message, note
  const [filterTag, setFilterTag] = useState('all');
  const [filterMood, setFilterMood] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: 'vision',
    title: '',
    content: '',
    tags: [],
    mood: 'inspired',
    isPrivate: false,
  });

  // Load entries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('anios_future_archive');
    if (stored) {
      setEntries(JSON.parse(stored));
    } else {
      setEntries(defaultEntries);
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('anios_future_archive', JSON.stringify(entries));
  }, [entries]);

  const openAddModal = () => {
    setEditingEntry(null);
    setFormData({
      type: 'vision',
      title: '',
      content: '',
      tags: [],
      mood: 'inspired',
      isPrivate: false,
    });
    setShowModal(true);
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setFormData({
      type: entry.type,
      title: entry.title,
      content: entry.content,
      tags: entry.tags || [],
      mood: entry.mood || 'inspired',
      isPrivate: entry.isPrivate || false,
    });
    setShowModal(true);
  };

  const saveEntry = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    const newEntry = {
      id: editingEntry ? editingEntry.id : Date.now().toString(),
      type: formData.type,
      title: formData.title,
      content: formData.content,
      tags: formData.tags,
      mood: formData.mood,
      date: editingEntry ? editingEntry.date : new Date().toISOString(),
      isPrivate: formData.isPrivate,
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

  const toggleTag = (tag) => {
    const current = formData.tags;
    const updated = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
    setFormData({ ...formData, tags: updated });
  };

  // Filtering logic
  const filteredEntries = entries.filter(entry => {
    // Type filter
    if (filterType !== 'all' && entry.type !== filterType) return false;
    // Tag filter
    if (filterTag !== 'all' && !(entry.tags || []).includes(filterTag)) return false;
    // Mood filter
    if (filterMood !== 'all' && entry.mood !== filterMood) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return entry.title.toLowerCase().includes(q) || entry.content.toLowerCase().includes(q);
    }
    return true;
  });

  // Get unique tags from all entries for filter dropdown
  const allTags = [...new Set(entries.flatMap(e => e.tags || []))];
  const allMoods = [...new Set(entries.map(e => e.mood).filter(Boolean))];

  const getMoodEmoji = (moodValue) => {
    const mood = moodOptions.find(m => m.value === moodValue);
    return mood ? mood.emoji : '📝';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'vision': return <Eye className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <ArchiveIcon className="w-4 h-4" />;
    }
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
          Future Archive
        </span>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mt-4">
          Log your visions
        </h1>
        <p className="text-anios-muted text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Hidden messages, emotional notes, future memories – a private space for your creative soul.
        </p>
      </motion.div>

      {/* Controls bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New entry
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-2xl border text-sm flex items-center gap-2 ${
                showFilters ? 'bg-anios-indigo/20 border-anios-indigo' : 'border-white/10'
              }`}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-anios-muted" />
            <input
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-black/30 border border-white/10 rounded-2xl text-sm w-64 focus:outline-none focus:border-anios-indigo"
            />
          </div>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="glass-card p-4 flex flex-wrap gap-4">
                <div>
                  <label className="text-xs font-mono text-anios-muted block mb-1">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-sm"
                  >
                    <option value="all">All types</option>
                    <option value="vision">Visions</option>
                    <option value="message">Messages</option>
                    <option value="note">Notes</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-anios-muted block mb-1">Tag</label>
                  <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-sm"
                  >
                    <option value="all">All tags</option>
                    {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-anios-muted block mb-1">Mood</label>
                  <select
                    value={filterMood}
                    onChange={(e) => setFilterMood(e.target.value)}
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-sm"
                  >
                    <option value="all">All moods</option>
                    {allMoods.map(mood => {
                      const m = moodOptions.find(o => o.value === mood);
                      return <option key={mood} value={mood}>{m ? m.emoji : ''} {mood}</option>;
                    })}
                  </select>
                </div>
                {(filterType !== 'all' || filterTag !== 'all' || filterMood !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setFilterType('all');
                      setFilterTag('all');
                      setFilterMood('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-anios-indigo mt-auto mb-1"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Archive entries */}
      <div className="max-w-4xl mx-auto">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-20 text-anios-muted border border-dashed border-white/10 rounded-[30px]">
            <ArchiveIcon className="w-12 h-12 mx-auto opacity-30" />
            <p className="mt-3">No entries found. Create your first future memory.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`glass-card p-5 hover:bg-white/[0.07] transition-all duration-300 ${
                  entry.isPrivate ? 'border-anios-indigo/30' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(entry.type)}
                    <span className="text-xs font-mono text-anios-muted uppercase tracking-wider">
                      {entry.type}
                    </span>
                    {entry.isPrivate && <Lock className="w-3 h-3 text-anios-subtle" />}
                    <span className="text-xs text-anios-subtle">{getMoodEmoji(entry.mood)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(entry)} className="text-anios-muted hover:text-white">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteEntry(entry.id)} className="text-anios-muted hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-playfair font-bold mt-2">{entry.title}</h3>
                <p className="text-anios-muted text-sm leading-relaxed mt-2 whitespace-pre-wrap">
                  {entry.content}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {(entry.tags || []).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/10">
                  <span className="text-[10px] text-anios-subtle font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(entry.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  {entry.isPrivate && (
                    <span className="text-[10px] text-anios-subtle flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Private
                    </span>
                  )}
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
                  {editingEntry ? 'Edit entry' : 'New archive entry'}
                </h2>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-4">
                {/* Type selection */}
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Type</label>
                  <div className="flex gap-3">
                    {['vision', 'message', 'note'].map(type => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, type })}
                        className={`px-4 py-2 rounded-full border text-sm capitalize ${
                          formData.type === type
                            ? 'bg-anios-indigo/20 border-anios-indigo'
                            : 'border-white/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-anios-indigo"
                    placeholder="A title for this memory"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Content</label>
                  <textarea
                    rows={5}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-anios-indigo"
                    placeholder="Write your vision, note, or hidden message..."
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {categoryTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-3 py-1 rounded-full transition ${
                          formData.tags.includes(tag)
                            ? 'bg-anios-indigo/40 text-white'
                            : 'bg-white/10 text-anios-muted'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Mood</label>
                  <div className="flex flex-wrap gap-2">
                    {moodOptions.map(mood => (
                      <button
                        key={mood.value}
                        onClick={() => setFormData({ ...formData, mood: mood.value })}
                        className={`px-3 py-1.5 rounded-full border text-sm flex items-center gap-1 ${
                          formData.mood === mood.value
                            ? 'bg-anios-indigo/20 border-anios-indigo'
                            : 'border-white/10'
                        }`}
                      >
                        <span>{mood.emoji}</span> {mood.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Private toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFormData({ ...formData, isPrivate: !formData.isPrivate })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${
                      formData.isPrivate ? 'bg-anios-indigo/20 border-anios-indigo' : 'border-white/10'
                    }`}
                  >
                    {formData.isPrivate ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    {formData.isPrivate ? 'Private' : 'Public'}
                  </button>
                  <span className="text-xs text-anios-muted">Private entries are only visible to you</span>
                </div>

                {/* Save button */}
                <button
                  onClick={saveEntry}
                  className="w-full py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center justify-center gap-2 mt-4"
                >
                  <ArchiveIcon className="w-4 h-4" /> Save to archive
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inspirational footer */}
      <div className="max-w-7xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 text-center"
        >
          <Sparkles className="w-6 h-6 text-anios-indigo mx-auto mb-3" />
          <h3 className="text-xl font-playfair font-bold">Your future self will thank you</h3>
          <p className="text-anios-muted text-sm max-w-2xl mx-auto mt-2">
            Every note, every vision, every hidden message becomes a compass.
            Fill this archive with the thoughts you don’t share anywhere else.
          </p>
        </motion.div>
      </div>
      {/* What's Next */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="max-w-3xl mx-auto mt-20"
>
  <div className="glass-card p-8 text-center border-anios-indigo/30">
    <Sparkles className="w-8 h-8 text-anios-indigo mx-auto mb-4" />
    <h2 className="text-3xl font-playfair font-bold">Your journey continues</h2>
    <p className="text-anios-muted mt-2 max-w-xl mx-auto">
      You’ve built the foundation. Now take it into the world.
    </p>
    <div className="grid md:grid-cols-2 gap-4 mt-6 text-left">
      <div className="p-3 bg-black/30 rounded-xl">
        <h3 className="font-bold text-sm">📁 Build a portfolio</h3>
        <p className="text-xs text-anios-muted mt-1">Showcase your best reconstruction and original work.</p>
      </div>
      <div className="p-3 bg-black/30 rounded-xl">
        <h3 className="font-bold text-sm">🤝 Offer a free redesign</h3>
        <p className="text-xs text-anios-muted mt-1">Local shop, nonprofit, or friend – real constraints teach fast.</p>
      </div>
      <div className="p-3 bg-black/30 rounded-xl">
        <h3 className="font-bold text-sm">📓 Continue visual diary</h3>
        <p className="text-xs text-anios-muted mt-1">One interface analysis per day. Taste compounds.</p>
      </div>
      <div className="p-3 bg-black/30 rounded-xl">
        <h3 className="font-bold text-sm">🔄 Revisit this archive</h3>
        <p className="text-xs text-anios-muted mt-1">Your future self will thank you for the notes you leave today.</p>
      </div>
    </div>
    <p className="text-xs text-anios-subtle mt-6 italic">
      — The only way out is through. Keep building.
    </p>
  </div>
</motion.div>
    </section>
  );
}