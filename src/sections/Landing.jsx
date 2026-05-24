// src/sections/Landing.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  User,
  Eye,
  Target,
  Layers,
  Ruler,
  Shield,
  Brain,
  Archive,
} from 'lucide-react';

// Portal data (matching bottom navigation + Fabric, Ghost, Psychology)
const portals = [
  { title: 'Identity', path: '/identity', icon: User, desc: 'Your creative signature' },
  { title: 'Typography', path: '/typography', icon: Eye, desc: 'Hierarchy & spacing' },
  { title: 'Missions', path: '/reconstruction', icon: Target, desc: 'Observe & rebuild' },
  { title: 'Workspace', path: '/workspace', icon: Layers, desc: 'Moodboard sanctuary' },
  { title: 'Fabric', path: '/fabric', icon: Ruler, desc: 'Material intelligence' },
  { title: 'Ghost Mode', path: '/ghost', icon: Shield, desc: 'Professional confidence' },
  { title: 'Psychology', path: '/psychology', icon: Brain, desc: 'Creative mind' },
  { title: 'Archive', path: '/archive', icon: Archive, desc: 'Future visions' },
];

// Rotating quotes from the Future Archive
const quotes = [
  'The best interfaces feel like silence.',
  'Negative space is never empty – it breathes.',
  'Your taste will always exceed your ability. That is not a flaw.',
  'Done is better than perfect. Ship, then refine.',
  'Creative energy is renewable – but only if you rest intentionally.',
];

export default function Landing() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate quote every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pb-24 relative overflow-hidden">
      {/* Subtle animated gradient orbs */}
      <div className="absolute top-[-30%] left-[-20%] w-[600px] h-[600px] rounded-full bg-anios-indigo/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-30%] right-[-20%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] animate-pulse delay-1000" />

      {/* Hero section */}
      <div className="min-h-screen flex items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="max-w-5xl relative z-10 text-center"
        >
          <p className="uppercase tracking-[0.3em] text-anios-indigo text-xs mb-6 font-mono">
            ANI.OS
          </p>
          <h1 className="text-6xl md:text-8xl font-playfair font-bold tracking-tight leading-none">
            Archive of
            <br />
            Unreal Design.
          </h1>
          <p className="text-anios-muted max-w-xl mx-auto mt-8 text-lg leading-relaxed">
            A private creative sanctuary built for experimentation,
            visual intelligence, and emotionally driven design.
          </p>
          <div className="mt-12 w-8 h-12 mx-auto border border-anios-muted/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-anios-indigo rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </div>

      {/* Creative Pulse – rotating quote */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto my-20 px-6 text-center"
      >
        <div className="glass-card p-6 md:p-8">
          <Sparkles className="w-5 h-5 text-anios-indigo mx-auto mb-3" />
          <p className="text-anios-muted text-sm font-mono tracking-wide uppercase">
            Creative Pulse
          </p>
          <p className="text-xl md:text-2xl font-playfair italic mt-3 leading-relaxed">
            “{quotes[quoteIndex]}”
          </p>
        </div>
      </motion.div>

      {/* Portal Grid – 8 core sections */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold tracking-tight">
            Enter the system
          </h2>
          <p className="text-anios-muted mt-2">Explore each dimension of creative intelligence</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {portals.map((portal, i) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  to={portal.path}
                  className="block glass-card p-5 hover:bg-white/[0.07] transition-all duration-300 group"
                >
                  <Icon className="w-8 h-8 text-anios-indigo mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-playfair font-bold tracking-tight">
                    {portal.title}
                  </h3>
                  <p className="text-anios-muted text-sm mt-1 leading-relaxed">
                    {portal.desc}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quiet footer */}
      <footer className="mt-24 text-center px-6">
        <div className="max-w-xl mx-auto border-t border-white/10 pt-8">
          <p className="text-anios-subtle text-xs font-mono tracking-wider uppercase">
            ANI.OS — silence is luxury
          </p>
        </div>
      </footer>
    </section>
  );
}