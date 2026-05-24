// src/components/AudioPlayer.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Royalty-free ambient music URL (from Pixabay)
  // You can replace this with your own audio file:
  // 1. Add an MP3 file to /public/song.mp3
  // 2. It will automatically work with this URL
  const SONG_URL = '/song.mp3';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else if (isMuted) setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-28 md:right-6">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-12 right-0 mb-2 w-64 glass-card p-3 rounded-2xl"
          >
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="p-1 rounded-full hover:bg-white/10">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button onClick={toggleMute} className="p-1 rounded-full hover:bg-white/10">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 accent-anios-indigo"
              />
            </div>
            <p className="text-[10px] text-anios-muted text-center mt-2 truncate">
              {isPlaying ? '🎵 ambient soundtrack' : '⏸ paused'}
            </p>
            <p className="text-[8px] text-anios-subtle text-center mt-1">
            Poison tree - slowed + reverb
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all"
      >
        <Music className="w-4 h-4 text-anios-indigo" />
      </button>

      <audio ref={audioRef} src={SONG_URL} loop preload="auto" />
    </div>
  );
}