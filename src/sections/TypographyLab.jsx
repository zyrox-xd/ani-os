// src/sections/TypographyLab.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Sparkles,
  Eye,
} from 'lucide-react';

// Preset styles
const presets = {
  'Berlin Editorial': {
    font: 'Playfair Display',
    size: 2.5,
    weight: 500,
    spacing: 0.05,
    height: 1.4,
    align: 'left',
  },
  'Gothic Archive': {
    font: 'IBM Plex Mono',
    size: 2,
    weight: 400,
    spacing: 0.1,
    height: 1.6,
    align: 'center',
  },
  'Tokyo Magazine': {
    font: 'Inter',
    size: 2.2,
    weight: 600,
    spacing: -0.02,
    height: 1.3,
    align: 'left',
  },
  'Luxury Minimal': {
    font: 'Playfair Display',
    size: 3,
    weight: 700,
    spacing: 0.12,
    height: 1.2,
    align: 'center',
  },
  'Cinematic Poster': {
    font: 'IBM Plex Mono',
    size: 3.5,
    weight: 600,
    spacing: 0.25,
    height: 1.1,
    align: 'center',
  },
};

// Typography tip generator
const getTip = (settings) => {
  if (settings.spacing > 0.15) return 'Wide letter spacing creates elegance – use for headlines only.';
  if (settings.spacing < -0.02) return 'Tight spacing feels modern but reduces readability. Use sparingly.';
  if (settings.height > 1.6) return 'High line height improves readability for long text.';
  if (settings.height < 1.2) return 'Low line height creates density – good for impactful headlines.';
  if (settings.weight > 600) return 'Bold weights demand attention. Pair with lighter body text.';
  if (settings.font === 'Playfair Display') return 'Serif fonts feel classic and luxurious.';
  if (settings.font === 'IBM Plex Mono') return 'Monospace adds a technical, editorial edge.';
  return 'Experiment with contrast – large vs. small, bold vs. light.';
};

export default function TypographyLab() {
  const [settings, setSettings] = useState(presets['Berlin Editorial']);
  const [customText, setCustomText] = useState(
    "In the silence of negative space, letters find their voice."
  );

  const applyPreset = (presetName) => {
    setSettings(presets[presetName]);
  };

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const currentTip = getTip(settings);

  const alignIcons = {
    left: AlignLeft,
    center: AlignCenter,
    right: AlignRight,
    justify: AlignJustify,
  };
  const AlignIcon = alignIcons[settings.align] || AlignLeft;

  return (
    <section className="py-20 px-6 pb-24 relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-anios-indigo/5 via-transparent to-transparent pointer-events-none" />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-anios-indigo">
          Interactive Lab
        </span>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mt-4">
          Typography Lab
        </h1>
        <p className="text-anios-muted text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Train hierarchy, spacing, and instinct. Adjust, observe, learn.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Live preview + controls */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Preview pane */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]"
          >
            <div className="w-full">
              <p
                style={{
                  fontFamily: settings.font,
                  fontSize: `${settings.size}rem`,
                  fontWeight: settings.weight,
                  letterSpacing: `${settings.spacing}em`,
                  lineHeight: settings.height,
                  textAlign: settings.align,
                }}
                className="text-anios-text transition-all duration-300"
              >
                {customText}
              </p>
            </div>
            <div className="mt-6 w-full pt-4 border-t border-white/10">
              <label className="block text-xs font-mono text-anios-muted mb-2">
                Edit sample text
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-anios-indigo"
              />
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Font family */}
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-anios-muted mb-2">
                Font Family
              </label>
              <div className="flex gap-3 flex-wrap">
                {['Playfair Display', 'Inter', 'IBM Plex Mono'].map((font) => (
                  <button
                    key={font}
                    onClick={() => updateSetting('font', font)}
                    className={`px-4 py-2 rounded-full border transition-all ${
                      settings.font === font
                        ? 'bg-anios-indigo/20 border-anios-indigo text-white'
                        : 'border-white/10 text-anios-muted hover:bg-white/5'
                    }`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            {/* Font size */}
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-anios-muted mb-2">
                Font Size: {settings.size}rem
              </label>
              <input
                type="range"
                min={0.8}
                max={5}
                step={0.05}
                value={settings.size}
                onChange={(e) => updateSetting('size', parseFloat(e.target.value))}
                className="w-full accent-anios-indigo"
              />
            </div>

            {/* Font weight */}
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-anios-muted mb-2">
                Font Weight: {settings.weight}
              </label>
              <input
                type="range"
                min={300}
                max={900}
                step={100}
                value={settings.weight}
                onChange={(e) => updateSetting('weight', parseInt(e.target.value))}
                className="w-full accent-anios-indigo"
              />
              <div className="flex justify-between text-xs text-anios-subtle mt-1">
                <span>Light (300)</span>
                <span>Regular (400)</span>
                <span>Bold (700)</span>
                <span>Black (900)</span>
              </div>
            </div>

            {/* Letter spacing */}
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-anios-muted mb-2">
                Letter Spacing: {settings.spacing}em
              </label>
              <input
                type="range"
                min={-0.1}
                max={0.4}
                step={0.01}
                value={settings.spacing}
                onChange={(e) => updateSetting('spacing', parseFloat(e.target.value))}
                className="w-full accent-anios-indigo"
              />
            </div>

            {/* Line height */}
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-anios-muted mb-2">
                Line Height: {settings.height}
              </label>
              <input
                type="range"
                min={0.8}
                max={2.5}
                step={0.05}
                value={settings.height}
                onChange={(e) => updateSetting('height', parseFloat(e.target.value))}
                className="w-full accent-anios-indigo"
              />
            </div>

            {/* Alignment */}
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-anios-muted mb-2">
                Alignment
              </label>
              <div className="flex gap-2">
                {['left', 'center', 'right', 'justify'].map((align) => {
                  const Icon = alignIcons[align];
                  return (
                    <button
                      key={align}
                      onClick={() => updateSetting('align', align)}
                      className={`p-2 rounded-xl border transition-all ${
                        settings.align === align
                          ? 'bg-anios-indigo/20 border-anios-indigo text-anios-indigo'
                          : 'border-white/10 text-anios-muted hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Presets */}
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-anios-muted mb-2">
                Presets
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(presets).map((name) => (
                  <button
                    key={name}
                    onClick={() => applyPreset(name)}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono hover:bg-anios-indigo/20 transition"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Typography tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-5 mb-16 flex items-start gap-3"
        >
          <Sparkles className="w-5 h-5 text-anios-indigo shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-mono text-anios-muted uppercase tracking-wider">
              Typography Insight
            </p>
            <p className="text-anios-text text-sm mt-1">{currentTip}</p>
          </div>
        </motion.div>

        {/* Before / After hierarchy examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-playfair font-bold tracking-tight">
              Hierarchy in action
            </h2>
            <p className="text-anios-muted mt-2">See the difference contrast makes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <p className="text-xs text-anios-muted mb-3 flex items-center gap-2">
                <Eye className="w-3 h-3" /> BEFORE (flat hierarchy)
              </p>
              <div className="bg-black/40 p-5 rounded-2xl space-y-2">
                <p className="text-lg font-bold">Headline</p>
                <p className="text-base">Subtitle goes here</p>
                <p className="text-sm">
                  Body text without any clear visual order. Everything looks the same weight,
                  same size, same spacing. The eye doesn't know where to start.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <p className="text-xs text-anios-muted mb-3 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-anios-indigo" /> AFTER (clear hierarchy)
              </p>
              <div className="bg-black/40 p-5 rounded-2xl space-y-1">
                <p className="text-3xl font-bold tracking-tight">Headline</p>
                <p className="text-md text-anios-indigo font-mono tracking-wide">
                  Subtitle with contrast
                </p>
                <p className="text-sm text-anios-muted leading-relaxed mt-3">
                  Body text uses smaller size, muted colour, comfortable line height, and
                  sufficient spacing to create a calm reading experience.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Extra learning resource */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 text-center"
        >
          <Type className="w-6 h-6 text-anios-indigo mx-auto mb-3" />
          <h3 className="text-xl font-playfair font-bold">Master typography</h3>
          <p className="text-anios-muted text-sm max-w-2xl mx-auto mt-2">
            Great typography is invisible. It guides the reader without them noticing.
            Train your eye daily – analyze apps, posters, and editorial layouts.
          </p>
        </motion.div>
      </div>
    </section>
  );
}