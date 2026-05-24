// src/sections/Identity.jsx
import { motion } from 'framer-motion';
import { Quote, Feather, Moon, Skull, Radio, Shirt, Heart } from 'lucide-react';

// Philosophy cards data
const philosophyCards = [
  {
    icon: Quote,
    title: 'Silence is luxury.',
    desc: 'Negative space gives every element room to breathe. What you leave out defines what remains.',
  },
  {
    icon: Feather,
    title: 'Negative space is power.',
    desc: 'The unmarked areas carry as much meaning as the marked. Emptiness is not absence – it is intention.',
  },
  {
    icon: Moon,
    title: 'Emotion lives in typography.',
    desc: 'Letters carry feeling, weight, and presence. A single font choice can change the entire mood of a room.',
  },
];

// Influences data
const influences = [
  {
    icon: Skull,
    title: 'Gothic',
    desc: 'Dark romanticism, cathedral architecture, Victorian mourning aesthetic.',
  },
  {
    icon: Radio,
    title: 'Y2K',
    desc: 'Futuristic optimism, translucent plastics, cyber-influenced minimalism.',
  },
  {
    icon: Shirt,
    title: 'Fashion',
    desc: 'Haute couture draping, raw hems, luxury streetwear silhouettes.',
  },
  {
    icon: Heart,
    title: 'Emotional Design',
    desc: 'Interfaces that feel like a memory – soft, warm, and deeply personal.',
  },
];

// Moodboard images (replace with her own URLs)
const moodboardImages = [
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=600&fit=crop',
];

export default function Identity() {
  return (
    <section className="py-20 px-6 pb-24 relative overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-anios-indigo/5 via-transparent to-transparent pointer-events-none" />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-anios-indigo">
          Creative Identity
        </span>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mt-4 leading-tight">
          Who you are
          <br />
          shapes what you make.
        </h1>
        <p className="text-anios-muted text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
          Gothic influence · Y2K nostalgia · Fashion intuition · Emotional design philosophy
        </p>
      </motion.div>

      {/* Philosophy pillars */}
      <div className="max-w-7xl mx-auto mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold tracking-tight">
            Core beliefs
          </h2>
          <p className="text-anios-muted mt-2">Three principles that guide every decision</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {philosophyCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 hover:bg-white/[0.07] transition-all duration-500"
            >
              <card.icon className="w-8 h-8 text-anios-indigo mb-5" />
              <h3 className="text-2xl font-playfair font-bold tracking-tight">
                {card.title}
              </h3>
              <p className="text-anios-muted text-sm leading-relaxed mt-3">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Influences grid */}
      <div className="max-w-7xl mx-auto mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold tracking-tight">
            Visual influences
          </h2>
          <p className="text-anios-muted mt-2">The worlds that shaped your eye</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {influences.map((inf, i) => (
            <motion.div
              key={inf.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <inf.icon className="w-8 h-8 text-anios-indigo mx-auto mb-3" />
              <h3 className="text-xl font-playfair font-bold">{inf.title}</h3>
              <p className="text-anios-muted text-sm mt-2 leading-relaxed">{inf.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visual moodboard */}
      <div className="max-w-7xl mx-auto mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold tracking-tight">
            Moodboard
          </h2>
          <p className="text-anios-muted mt-2">The atmosphere that inspires</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {moodboardImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/20"
            >
              <img
                src={src}
                alt={`Mood ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-anios-subtle text-xs mt-4 font-mono">
          * replace with your own references
        </p>
      </div>

      {/* Personal manifesto */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 text-center"
        >
          <Quote className="w-8 h-8 text-anios-indigo mx-auto mb-4 opacity-60" />
          <h3 className="text-2xl md:text-3xl font-playfair font-bold italic">
            “I design what has not yet been imagined.”
          </h3>
          <p className="text-anios-muted mt-4 text-sm leading-relaxed">
            My work is not about following trends. It is about creating a visual language
            that feels both timeless and futuristic. Silence is my tool. Negative space
            is my canvas. Emotion is my material.
          </p>
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-xs font-mono tracking-wider text-anios-subtle">
              — ANI.OS, Creative Identity
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}