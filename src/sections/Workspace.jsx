// src/sections/Workspace.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Image,
  PenTool,
  Link as LinkIcon,
  Plus,
  Trash2,
  Edit3,
  X,
  Tag,
  Save,
  ExternalLink,
  Grid,
  List,
  Heart,
  Sparkles,
} from 'lucide-react';

// Tag options
const tagOptions = ['Typography', 'Colour', 'Layout', 'Motion', 'Branding', 'UI', 'Experimental'];

// Initial example images (replace with your own or remove)
const defaultMoodboard = [
  {
    id: 'ex1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&fit=crop',
    title: 'Abstract gradients',
    tags: ['Colour', 'Experimental'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ex2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=400&fit=crop',
    title: 'Editorial layout',
    tags: ['Layout', 'Typography'],
    createdAt: new Date().toISOString(),
  },
];

const defaultNotes = [
  {
    id: 'note1',
    type: 'note',
    title: 'Idea for spacing system',
    content: 'Use 8px grid, double for sections, half for micro spacing.',
    tags: ['Layout'],
    createdAt: new Date().toISOString(),
  },
];

const defaultLinks = [
  {
    id: 'link1',
    type: 'link',
    title: 'Cosmos – inspiration archive',
    url: 'https://cosmos.so',
    tags: ['Inspiration'],
    createdAt: new Date().toISOString(),
  },
];

export default function Workspace() {
  const [activeTab, setActiveTab] = useState('moodboard'); // moodboard, notes, links
  const [moodboardItems, setMoodboardItems] = useState([]);
  const [notes, setNotes] = useState([]);
  const [links, setLinks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // New item form state
  const [newItem, setNewItem] = useState({
    type: 'image',
    title: '',
    url: '',
    content: '',
    tags: [],
  });

  // Load data from localStorage
  useEffect(() => {
    const storedMoodboard = localStorage.getItem('anios_moodboard');
    if (storedMoodboard) setMoodboardItems(JSON.parse(storedMoodboard));
    else setMoodboardItems(defaultMoodboard);

    const storedNotes = localStorage.getItem('anios_notes');
    if (storedNotes) setNotes(JSON.parse(storedNotes));
    else setNotes(defaultNotes);

    const storedLinks = localStorage.getItem('anios_links');
    if (storedLinks) setLinks(JSON.parse(storedLinks));
    else setLinks(defaultLinks);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('anios_moodboard', JSON.stringify(moodboardItems));
  }, [moodboardItems]);
  useEffect(() => {
    localStorage.setItem('anios_notes', JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem('anios_links', JSON.stringify(links));
  }, [links]);

  // Add new item
  const addItem = () => {
    if (newItem.type === 'image' && !newItem.url) return;
    if (newItem.type === 'link' && !newItem.url) return;
    if (newItem.type === 'note' && !newItem.content) return;
    if (!newItem.title.trim()) return;

    const item = {
      id: Date.now().toString(),
      type: newItem.type,
      title: newItem.title,
      createdAt: new Date().toISOString(),
      tags: newItem.tags,
      ...(newItem.type === 'image' && { url: newItem.url }),
      ...(newItem.type === 'link' && { url: newItem.url }),
      ...(newItem.type === 'note' && { content: newItem.content }),
    };

    if (newItem.type === 'image') setMoodboardItems([item, ...moodboardItems]);
    else if (newItem.type === 'note') setNotes([item, ...notes]);
    else if (newItem.type === 'link') setLinks([item, ...links]);

    setShowAddModal(false);
    setNewItem({ type: 'image', title: '', url: '', content: '', tags: [] });
  };

  // Delete item
  const deleteItem = (id, type) => {
    if (type === 'image') setMoodboardItems(moodboardItems.filter(i => i.id !== id));
    else if (type === 'note') setNotes(notes.filter(i => i.id !== id));
    else if (type === 'link') setLinks(links.filter(i => i.id !== id));
  };

  // Update tags for an item
  const updateTags = (id, type, newTags) => {
    const updater = (item) => item.id === id ? { ...item, tags: newTags } : item;
    if (type === 'image') setMoodboardItems(moodboardItems.map(updater));
    else if (type === 'note') setNotes(notes.map(updater));
    else if (type === 'link') setLinks(links.map(updater));
  };

  // Toggle tag on item (simple add/remove)
  const toggleTag = (item, type, tag) => {
    const currentTags = item.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    updateTags(item.id, type, newTags);
  };

  const renderItems = () => {
    let items = [];
    if (activeTab === 'moodboard') items = moodboardItems;
    else if (activeTab === 'notes') items = notes;
    else items = links;

    if (items.length === 0) {
      return (
        <div className="text-center py-20 text-anios-muted border border-dashed border-white/10 rounded-[30px]">
          <Image className="w-12 h-12 mx-auto opacity-30" />
          <p className="mt-3">Your {activeTab} is empty. Click + to add something.</p>
        </div>
      );
    }

    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.03 }}
              className="glass-card p-4 hover:bg-white/[0.07] transition-all duration-300 group"
            >
              {item.type === 'image' && (
                <div className="aspect-video rounded-xl overflow-hidden bg-black/40 mb-3">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              {item.type === 'link' && (
                <div className="aspect-video rounded-xl bg-anios-indigo/10 flex items-center justify-center mb-3">
                  <LinkIcon className="w-8 h-8 text-anios-indigo" />
                </div>
              )}
              {item.type === 'note' && (
                <div className="aspect-video rounded-xl bg-black/40 flex items-center justify-center mb-3">
                  <PenTool className="w-8 h-8 text-anios-muted" />
                </div>
              )}
              <h3 className="text-lg font-playfair font-bold">{item.title}</h3>
              {item.type === 'note' && (
                <p className="text-anios-muted text-sm mt-1 line-clamp-2">{item.content}</p>
              )}
              {item.type === 'link' && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-anios-indigo text-sm flex items-center gap-1 mt-1 hover:underline"
                >
                  {item.url.length > 40 ? item.url.slice(0, 40) + '…' : item.url}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {tagOptions.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(item, activeTab === 'moodboard' ? 'image' : activeTab === 'notes' ? 'note' : 'link', tag)}
                    className={`text-[10px] px-2 py-0.5 rounded-full transition ${
                      (item.tags || []).includes(tag)
                        ? 'bg-anios-indigo/40 text-white'
                        : 'bg-white/5 text-anios-subtle hover:bg-white/10'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/10">
                <span className="text-[10px] text-anios-subtle font-mono">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => deleteItem(item.id, activeTab === 'moodboard' ? 'image' : activeTab === 'notes' ? 'note' : 'link')}
                  className="text-anios-muted hover:text-red-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      );
    } else {
      // List view
      return (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="glass-card p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair font-bold">{item.title}</h3>
                {item.type === 'note' && <p className="text-sm text-anios-muted truncate">{item.content}</p>}
                {item.type === 'link' && (
                  <a href={item.url} target="_blank" className="text-xs text-anios-indigo truncate block">{item.url}</a>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                  {(item.tags || []).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-anios-indigo/20">{tag}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => deleteItem(item.id, activeTab === 'moodboard' ? 'image' : activeTab === 'notes' ? 'note' : 'link')}
                className="text-anios-muted hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <section className="py-20 px-6 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-anios-indigo/5 via-transparent to-transparent pointer-events-none" />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-anios-indigo">
          Creative Workspace
        </span>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mt-4">
          Your studio
        </h1>
        <p className="text-anios-muted text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Collect inspirations, save notes, organise links – all in one calm space.
        </p>
      </motion.div>

      {/* Tabs and controls */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 border border-white/10 rounded-full p-1 bg-black/20">
            {[
              { id: 'moodboard', label: 'Moodboard', icon: Image },
              { id: 'notes', label: 'Notes', icon: PenTool },
              { id: 'links', label: 'Links', icon: LinkIcon },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                    activeTab === tab.id
                      ? 'bg-anios-indigo/20 text-white'
                      : 'text-anios-muted hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-anios-indigo/20' : 'text-anios-muted'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-anios-indigo/20' : 'text-anios-muted'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add new
            </button>
          </div>
        </div>
      </div>

      {/* Items grid/list */}
      <div className="max-w-7xl mx-auto">
        {renderItems()}
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-md w-full glass-card p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-playfair font-bold">Add to {activeTab}</h2>
                <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm"
                  >
                    <option value="image">Image</option>
                    <option value="note">Note</option>
                    <option value="link">Link</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Title</label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm"
                    placeholder="e.g., Gradient inspiration"
                  />
                </div>
                {(newItem.type === 'image' || newItem.type === 'link') && (
                  <div>
                    <label className="block text-sm font-mono text-anios-muted mb-1">URL</label>
                    <input
                      type="text"
                      value={newItem.url}
                      onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm"
                      placeholder="https://..."
                    />
                  </div>
                )}
                {newItem.type === 'note' && (
                  <div>
                    <label className="block text-sm font-mono text-anios-muted mb-1">Content</label>
                    <textarea
                      rows={3}
                      value={newItem.content}
                      onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm"
                      placeholder="Write your idea..."
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-mono text-anios-muted mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          const current = newItem.tags;
                          const updated = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
                          setNewItem({ ...newItem, tags: updated });
                        }}
                        className={`text-xs px-2 py-1 rounded-full transition ${
                          newItem.tags.includes(tag) ? 'bg-anios-indigo/40' : 'bg-white/10'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={addItem}
                  className="w-full py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save to {activeTab}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extra: Creative Quote */}
      <div className="max-w-7xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 text-center"
        >
          <Heart className="w-6 h-6 text-anios-indigo mx-auto mb-3" />
          <h3 className="text-xl font-playfair font-bold">Build your visual library</h3>
          <p className="text-anios-muted text-sm max-w-2xl mx-auto mt-2">
            Every great designer has a curated collection of references. Save what moves you.
            Over time, your taste will become undeniable.
          </p>
        </motion.div>
      </div>
    </section>
  );
}