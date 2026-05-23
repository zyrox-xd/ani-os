import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Shield, Layers, Box, Compass, Cpu, 
  Brain, Folder, Play, Volume2, VolumeX, AlertCircle, 
  ChevronRight, ArrowRight, Clipboard, Check, RefreshCw, 
  Eye, HelpCircle, FileText, Send, Lock, Star, Sparkles,
  Sliders, X, Info, Gauge, LockOpen, Award, BookOpen, Target, 
  Settings, SlidersHorizontal, Activity, Layers3, Hash
} from 'lucide-react';

const injectGlobalStyles = () => {
  if (typeof document === 'undefined') return;
  const styleId = 'anios-ultra-advanced-styles';
  if (document.getElementById(styleId)) return;

  const styleSheet = document.createElement('style');
  styleSheet.id = styleId;
  styleSheet.innerText = `
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    .scanlines::before {
      content: " ";
      display: block;
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05));
      z-index: 40;
      background-size: 100% 4px, 6px 100%;
      pointer-events: none;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(8, 8, 16, 0.3);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: currentColor;
    }
    .chrome-glow {
      box-shadow: 0 0 35px rgba(255, 255, 255, 0.015);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .grain-overlay {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    }
    .gothic-text {
      text-shadow: 0 0 16px currentColor;
    }
    .grid-lines {
      background-size: 32px 32px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    }
    .cyber-card {
      background: rgba(4, 4, 8, 0.75);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .cyber-card:hover {
      border-color: rgba(255, 255, 255, 0.15);
    }
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 32px;
      background: transparent;
    }
    input[type="range"]:focus {
      outline: none;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 1px;
    }
    input[type="range"]::-webkit-slider-thumb {
      height: 14px;
      width: 14px;
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid #000000;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -6px;
      box-shadow: 0 0 8px currentColor;
    }
  `;
  document.head.appendChild(styleSheet);
};

export default function App() {
  console.log("App component is mounting...");
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootLogs, setBootLogs] = useState([]);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  
  const [activePalette, setActivePalette] = useState('chrome-midnight');

  const [synthFreq, setSynthFreq] = useState(55); 
  const [staticVolume, setStaticVolume] = useState(0.04);
  const [synthType, setSynthType] = useState('sawtooth');
  const [lfoSpeed, setLfoSpeed] = useState(0.5);

  const typographyFormulas = {
    tokyo: {
      name: "Tokyo Cyber-Serialism",
      text: "NEO-PARADIGM",
      fontSize: 44,
      letterSpacing: 24,
      fontStyle: "serif",
      align: "center",
      blendMode: "difference",
      lesson: "Asymmetrical alignment combined with ultra-wide letter spacing (above 20px) establishes high-fashion tension. This is widely used in Tokyo boutique art books to enforce visual scale."
    },
    berlin: {
      name: "Berlin Brutalist Mono",
      text: "SYS_RECONSTRUCT",
      fontSize: 48,
      letterSpacing: 6,
      fontStyle: "mono",
      align: "left",
      blendMode: "screen",
      lesson: "Strict structural alignment on a tech-grid. Using a monospace typeface with tight tracking represents highly functional engineering. Best complemented with 75% negative void."
    },
    gothic: {
      name: "Gothic Noir Minimalist",
      text: "SACRAMENT",
      fontSize: 64,
      letterSpacing: 16,
      fontStyle: "serif",
      align: "right",
      blendMode: "normal",
      lesson: "Massive serif characters pinned to the hard-right margin. This density acts as a massive optical anchor, commanding immediate reader eye-travel from across the room."
    }
  };

  const [customTypos, setCustomTypos] = useState({
    text: "NEO-PARADIGM",
    fontSize: 44,
    letterSpacing: 24,
    lineHeight: 1.1,
    fontStyle: "serif",
    align: "center",
    blendMode: "difference"
  });
  
  const [selectedFormulaId, setSelectedFormulaId] = useState('tokyo');
  const [activeOverlayGrid, setActiveOverlayGrid] = useState('none'); 
  const [kerningOffsets, setKerningOffsets] = useState({ pair1: 0, pair2: 0, pair3: 0 });

  const reconstructionMissions = [
    {
      id: 'tokyo-jacket',
      title: "Tokyo Avant-Garde Cover Campaign",
      difficulty: "LEVEL 1 // MEDIUM",
      objective: "Match wide optical tracking and absolute vertical center position coordinates.",
      target: { x: 35, y: 75, tracking: 20 },
      text: "MORTAL",
      teardown: "Perfect centering creates high-fashion tranquility. Balance wide serif tracks relative to negative space thresholds."
    },
    {
      id: 'berlin-flyer',
      title: "Berlin Brutalist Warehouse Blueprint",
      difficulty: "LEVEL 2 // HARD",
      objective: "Match asymmetrical monospace structure aligned close to the lower-bound canvas limits.",
      target: { x: 14, y: 120, tracking: 8 },
      text: "SYS_CORRUPT",
      teardown: "Brutalist posters intentionally break visual comfort by forcing massive blocks of information into raw terminal boundaries."
    },
    {
      id: 'gothic-ep',
      title: "Gothic Noir EP Identification Plate",
      difficulty: "LEVEL 3 // EXTREME",
      objective: "Recreate extreme letter-spacing offset values in the upper-right corner limits.",
      target: { x: 60, y: 18, tracking: 26 },
      text: "TEMPLAR",
      teardown: "Uncompromising tracking. Widening serif characters beyond normal limits forces each glyph to be studied as a unique sculpture."
    }
  ];

  const [activeMissionIndex, setActiveMissionIndex] = useState(0);
  const currentMission = reconstructionMissions[activeMissionIndex];
  const [challengeOffsets, setChallengeOffsets] = useState({ x: 20, y: 35, tracking: 10 });
  const [challengeScore, setChallengeScore] = useState(0);

  const [activeGsm, setActiveGsm] = useState(500);
  const [selectedBrief, setSelectedBrief] = useState(0);
  const [selectedTechHotspot, setSelectedTechHotspot] = useState('hood');
  
  const [techPackConfig, setTechPackConfig] = useState({
    silhouette: 'Oversized Boxy Hoodie',
    fabric: '100% Cotton French Terry',
    weight: '500 GSM',
    stitch: 'Twin-needle 1/4" Coverstitch',
    wash: 'Heavy Acid Sulfur Wash',
    print: '3D High-Density Puff Print'
  });

  const techHotspots = {
    hood: {
      title: "Double-Layered Sculptural Crossover Hood",
      spec: "Dual-layered premium heavy shell. Patterned with an overlapping face guard collar and double-needle center seam. Avoids typical collapse to maintain rigid framing.",
      measurement: "Overlap height: 4.5cm. Center hood length: 41cm. Stiffened internally."
    },
    shoulder: {
      title: "Drop Shoulder Forward Shift",
      spec: "Dropped shoulder seam moved forward by 3.5cm. Eliminates standard outer bulging to maintain a clean vertical drape line from collarbone to waist.",
      measurement: "Drop offset: 14cm below anatomical clavicle junction point."
    },
    pocket: {
      title: "Seamless Integrated Kangaroo Pocket",
      spec: "Integrated internal side-welt pockets, entirely omitting standard outer pouch seams to eliminate stomach bulge and keep print graphics totally flat.",
      measurement: "Opening height: 19cm. Bar-tacked with reinforced industrial nylon v-46 thread."
    },
    rib: {
      title: "Lycra-Reinforced 2x2 Heavy ribbing",
      spec: "Double-knit 2x2 heavy-duty rib construction containing 5% Lycra elastane threads. Prevents standard sleeve stretch or hem flare after washing cycles.",
      measurement: "Rib panel width: 9cm flat, chain-stitched with double tension."
    }
  };

  const gsmSpecs = {
    240: {
      title: "240 GSM // Single Jersey Fine Combed Cotton",
      usage: "Luxury Summer collection streetwear tees.",
      drape: "Highly fluid, high-speed drape. Swings smoothly with motion.",
      stiffness: "Low visual resistance. Conforms completely to the torso outline.",
      technical: "Yarn count: 21S compact spun. Ideal for organic water-based pigment printing.",
      simRigidity: 0.15 
    },
    350: {
      title: "350 GSM // Premium Midweight French Terry",
      usage: "Daily transitional streetwear crewnecks and trackpants.",
      drape: "Medium structural bounce. Keeps a semi-rigid silhouette while active.",
      stiffness: "Medium stiffness. Drapes away from the body curves to hide posture flaws.",
      technical: "Yarn count: 32S/1 + 10S heavy loopback pile structure.",
      simRigidity: 0.55
    },
    500: {
      title: "500 GSM // Heavyweight Industrial Loopback Cotton",
      usage: "Outerwear armor pieces, massive custom heavy structured hoodies.",
      drape: "Sculptural silhouette. High physical resistance; drapes heavily and maintains boxiness.",
      stiffness: "Maximum structural stiffness. Hoodie stands independently when placed down.",
      technical: "Yarn count: 16S/1 + 8S extreme high-density loopback fabric.",
      simRigidity: 0.95
    }
  };

  const mockBriefs = [
    {
      title: "Berlin Winter Cybernetic Drop",
      target: "Underground techno and electronic design community (Age 18-24)",
      demands: "Establish 500 GSM heavy black hoodies featuring clean monochrome typography along spine margins. Enforce architectural shapes.",
      aesthetic: "Industrial raw structure, deep ash charcoal wash, severe asymmetry."
    },
    {
      title: "Tokyo Avant-Garde Comic Redesign",
      target: "High-fashion collectors and typography purists",
      demands: "Create a limited-run publication sleeve design featuring 28px ultra-wide tracking title fonts with 70% negative canvas void.",
      aesthetic: "Neo-classical black-plate, high contrast serif grids."
    },
    {
      title: "ECHO Industrial Perfume Core",
      target: "Luxury minimalist design audience",
      demands: "Construct physical outer box styling featuring extreme fine-line coordinates and minimalist brand stampings.",
      aesthetic: "Brutal silver foil stamped onto raw charcoal grey packaging board."
    }
  ];

  const [selectedScenario, setSelectedScenario] = useState('creep');
  const [assertivenessLevel, setAssertivenessLevel] = useState(2); 

  const [activeBurnoutTopic, setActiveBurnoutTopic] = useState('perfectionism');
  const [quizScore, setQuizScore] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const clinicalPsychologyQuiz = [
    {
      id: "q1",
      question: "Your client wants to add 'just one small circle' to your asymmetric layout, breaking your typography system. How do you respond?",
      options: [
        { text: "Accede immediately to prevent friction, planning to silently crop it out for your own visual portfolio later.", feedback: "Ineffective. This creates deep artistic resentment and dilutes the integrity of your professional outputs.", points: 0 },
        { text: "Send a clinical structural diagnostic explaining how the modification breaks visual focus and balance, paired with a price quote.", feedback: "Excellent. Framing design decisions as functional engineering rules establishes supreme technical authority.", points: 10 }
      ]
    },
    {
      id: "q2",
      question: "You feel intense creative block because you fear your current layout is not matching your internal vision. What is the diagnosis?",
      options: [
        { text: "You have lost your creative edge or chose the wrong professional path.", feedback: "False. This is highly self-destructive thinking. Do not trust these internal critical voices.", points: 0 },
        { text: "You are experiencing a Taste-Execution gap. Your design intelligence is highly evolved while muscle memory is still catching up. Accept friction as calibration.", feedback: "Highly Accurate! Reframing friction as mathematical calibration eliminates guilt, allowing rapid, zero-stake practice.", points: 10 }
      ]
    },
    {
      id: "q3",
      question: "An agency demands a complete layout package redesign in 12 hours. How do you construct your response boundaries?",
      options: [
        { text: "Work all through the night without sleep, delivering the files on time but feeling physically and mentally exhausted.", feedback: "Destructive. This conditions clients to expect free premium emergency labor at the cost of your health.", points: 0 },
        { text: "Inform them that high-level visual systems require structural testing, and that your studio operates on a standard 48-hour testing phase.", feedback: "Perfect. Safeguarding your physical energy with structural process limits projects high-tier luxury prestige.", points: 10 }
      ]
    }
  ];

  const [cryptoInput, setCryptoInput] = useState('');
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretError, setSecretError] = useState(false);

  const futureLogs = [
    {
      date: "2028.11.12 // TOKYO COUTURE SHOW",
      message: "The asymmetry of your canvas typography was praised on the main catwalk screens. Your refusal to fill negative space with generic noise is now your absolute visual signature."
    },
    {
      date: "2030.05.04 // BERLIN SPREEWERK",
      message: "Your heavyweight 500 GSM loopback garments successfully passed industrial drop-tests. The seamless welt-pocket integration has officially been patented for production."
    },
    {
      date: "2032.08.19 // PARIS HEADQUARTERS",
      message: "The Ghost Mode communications matrix protected your studio from an aggressive contract takeover. You maintained your 50% down-payment protocols. The brand is now fully self-funded."
    }
  ];

  const scripts = {
    creep: {
      title: "Handling Scope Creep / Unplanned Revisions",
      levels: {
        1: "I would be glad to implement these design changes. Let me prepare a small supplemental quote detailing the extra production hours needed to integrate these steps.",
        2: "To ensure we preserve layout balance, these revisions require separate visual testing. I will draft an adjusted scope estimation for these creative hours.",
        3: "These parameters fall outside our primary agreement. To avoid delaying production, I will halt further files until a secondary invoice covers the expanded scope."
      }
    },
    late: {
      title: "Handling Late Payments & Blocked Installments",
      levels: {
        1: "Just following up on invoice #204. Please let me know when your accounts department processes this so I can calendar the final delivery slot.",
        2: "Our agreement requires invoice clearance before the release of final system files. Design assets remain on hold pending confirmation of the current installment.",
        3: "All export file links remain locked on our private server. Once accounts processes the outstanding balance, the system will automatically dispatch the decrypted vector packages."
      }
    },
    rejection: {
      title: "Rejecting Aesthetic Advice that Spoils Layout Integrity",
      levels: {
        1: "I see your thought process here. However, using that color choice weakens the readability contrast. Let's stick with the high-contrast configuration.",
        2: "Integrating secondary text blocks here breaks the negative space balance we established. The layout relies on this void to direct consumer attention.",
        3: "My visual system is engineered around asymmetric contrast guidelines. Adding these design elements compromises the premium brand positioning. I cannot sign off on this compromise."
      }
    }
  };

  const audioContextRef = useRef(null);
  const mainGainRef = useRef(null);
  const oscRef = useRef(null);
  const noiseGainRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    injectGlobalStyles();
    runBootSequence();
  }, []);

  useEffect(() => {
    const target = currentMission.target;
    const xDiff = Math.abs(challengeOffsets.x - target.x);
    const yDiff = Math.abs(challengeOffsets.y - target.y);
    const trackDiff = Math.abs(challengeOffsets.tracking - target.tracking);
    
    const avgDiff = (xDiff + yDiff + trackDiff) / 3;
    const computedScore = Math.max(0, Math.min(100, Math.round(100 - avgDiff * 2.8)));
    setChallengeScore(computedScore);
  }, [challengeOffsets, currentMission]);

  const applyPresetFormula = (formulaId) => {
    setSelectedFormulaId(formulaId);
    const f = typographyFormulas[formulaId];
    setCustomTypos({
      text: f.text,
      fontSize: f.fontSize,
      letterSpacing: f.letterSpacing,
      lineHeight: 1.1,
      fontStyle: f.fontStyle,
      align: f.align,
      blendMode: f.blendMode
    });
  };

  useEffect(() => {
    if (oscRef.current && isPlayingAudio) {
      oscRef.current.frequency.setValueAtTime(synthFreq, audioContextRef.current.currentTime);
    }
  }, [synthFreq, isPlayingAudio]);

  useEffect(() => {
    if (oscRef.current && isPlayingAudio) {
      oscRef.current.type = synthType;
    }
  }, [synthType, isPlayingAudio]);

  useEffect(() => {
    if (noiseGainRef.current && isPlayingAudio) {
      noiseGainRef.current.gain.setValueAtTime(staticVolume, audioContextRef.current.currentTime);
    }
  }, [staticVolume, isPlayingAudio]);

  useEffect(() => {
    let lfoInterval;
    if (isPlayingAudio && filterRef.current) {
      let angle = 0;
      lfoInterval = setInterval(() => {
        angle += lfoSpeed * 0.1;
        const sweepFreq = 120 + Math.sin(angle) * 45;
        if (filterRef.current && audioContextRef.current) {
          filterRef.current.frequency.setValueAtTime(sweepFreq, audioContextRef.current.currentTime);
        }
      }, 100);
    }
    return () => clearInterval(lfoInterval);
  }, [isPlayingAudio, lfoSpeed]);

  const runBootSequence = () => {
    const logs = [
      "SYSTEM: Booting ANI.OS Core (V12.4.9)...",
      "DECRYPT: Unlocking cognitive security layers...",
      "USER PROFILE: Visionary Designer [ANIQA] matched.",
      "AESTHETICS: Loading Y2K Gothic asset modules...",
      "SYNTH: Bootstrapping real-time Web Audio sound generators...",
      "FACTORY: Heavy textile loopback drape profiles loaded...",
      "PSYCHOLOGY: Protective emotional boundaries calibrated.",
      "SECURE: Direct connection link verified.",
      "STATUS: Ready to calibrate the future."
    ];

    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < logs.length) {
        setBootLogs(prev => [...prev, logs[logIdx]]);
        setBootProgress(Math.floor((logIdx / logs.length) * 100));
        logIdx++;
      } else {
        setBootProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setBooting(false);
        }, 1200);
      }
    }, 180);
  };

  const toggleAmbientSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        const masterGain = audioContextRef.current.createGain();
        masterGain.gain.setValueAtTime(0.25, audioContextRef.current.currentTime);
        masterGain.connect(audioContextRef.current.destination);
        mainGainRef.current = masterGain;

        const osc = audioContextRef.current.createOscillator();
        const lowpass = audioContextRef.current.createBiquadFilter();

        osc.type = synthType;
        osc.frequency.setValueAtTime(synthFreq, audioContextRef.current.currentTime);
        
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(130, audioContextRef.current.currentTime);
        lowpass.Q.setValueAtTime(4, audioContextRef.current.currentTime);

        osc.connect(lowpass);
        lowpass.connect(masterGain);
        osc.start();
        oscRef.current = osc;
        filterRef.current = lowpass;

        const bufferSize = audioContextRef.current.sampleRate * 2;
        const noiseBuffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioContextRef.current.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const noiseFilter = audioContextRef.current.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(420, audioContextRef.current.currentTime);
        noiseFilter.Q.setValueAtTime(0.3, audioContextRef.current.currentTime);

        const noiseGain = audioContextRef.current.createGain();
        noiseGain.gain.setValueAtTime(staticVolume, audioContextRef.current.currentTime);

        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        whiteNoise.start();
        noiseGainRef.current = noiseGain;

        setIsPlayingAudio(true);
      } else {
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
          setIsPlayingAudio(true);
        } else {
          audioContextRef.current.suspend();
          setIsPlayingAudio(false);
        }
      }
    } catch (e) {
      console.warn("Audio Synthesizer is blocked or unsupported on this device.", e);
    }
  };

  const handleCopyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const palettes = {
    'chrome-midnight': {
      name: "Chrome Midnight",
      primary: "text-indigo-400",
      accent: "bg-indigo-500",
      border: "border-indigo-950/80",
      accentBorder: "border-indigo-500",
      glow: "rgba(99, 102, 241, 0.15)",
      bgGradient: "from-[#050410] to-black",
      previewColors: ["#020205", "#131033", "#6366f1", "#fafafa"],
      description: "Severe deep-space blue and chrome light."
    },
    'gothic-ash': {
      name: "Gothic Ash",
      primary: "text-zinc-400",
      accent: "bg-zinc-400",
      border: "border-zinc-800/80",
      accentBorder: "border-zinc-400",
      glow: "rgba(161, 161, 170, 0.1)",
      bgGradient: "from-[#08080a] to-[#010102]",
      previewColors: ["#040404", "#27272a", "#a1a1aa", "#ffffff"],
      description: "Severe industrial monochrome inspired by Berlin architecture."
    },
    'blood-seal': {
      name: "Blood Seal",
      primary: "text-rose-500",
      accent: "bg-rose-500",
      border: "border-rose-950/80",
      accentBorder: "border-rose-500",
      glow: "rgba(244, 63, 94, 0.12)",
      bgGradient: "from-[#0f0305] to-black",
      previewColors: ["#050102", "#4c0519", "#f43f5e", "#ffe4e6"],
      description: "Deep, theatrical crimson matching underground anime aesthetics."
    },
    'cyber-lavender': {
      name: "Cyber Lavender",
      primary: "text-purple-400",
      accent: "bg-purple-500",
      border: "border-purple-950/80",
      accentBorder: "border-purple-500",
      glow: "rgba(168, 85, 247, 0.15)",
      bgGradient: "from-[#0a0312] to-black",
      previewColors: ["#030108", "#3b0764", "#a855f7", "#fae8ff"],
      description: "Avant-garde editorial fashion tones. High-contrast royalty."
    }
  };

  const theme = palettes[activePalette];

  const handleKeypadPress = (num) => {
    if (cryptoInput.length < 4) {
      const updated = cryptoInput + num;
      setCryptoInput(updated);
      if (updated === '2032') {
        setSecretUnlocked(true);
        setSecretError(false);
      } else if (updated.length === 4) {
        setSecretError(true);
        setTimeout(() => {
          setCryptoInput('');
          setSecretError(false);
        }, 1200);
      }
    }
  };

  const selectAnswer = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    clinicalPsychologyQuiz.forEach((q) => {
      const selectedIndex = selectedAnswers[q.id];
      if (selectedIndex !== undefined) {
        score += q.options[selectedIndex].points;
      }
    });
    setQuizScore(score);
  };

  if (booting) {
    return (
      <div className="relative min-h-screen bg-[#020204] text-slate-200 flex flex-col justify-between p-6 md:p-12 overflow-hidden font-mono scanlines grain-overlay">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vh] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <h1 className="tracking-[0.4em] font-semibold text-xs text-indigo-400">ANI.OS // IDENTITY BOOT MATRIX</h1>
          </div>
          <span className="text-[10px] text-slate-500">YEAR // 2026.05.18</span>
        </div>

        <div className="flex flex-col items-center justify-center py-16 z-10 text-center max-w-xl mx-auto w-full">
          <div className="mb-10 relative">
            <div className="w-24 h-24 rounded-full border border-indigo-500/10 flex items-center justify-center animate-spin" style={{ animationDuration: '16s' }}>
              <div className="w-18 h-18 rounded-full border border-dashed border-indigo-500/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-serif text-white tracking-[0.2em] font-bold">A</span>
            </div>
          </div>

          <div className="w-full bg-slate-950 border border-slate-900 rounded-sm h-1 overflow-hidden mb-8">
            <div 
              className="h-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-all duration-300" 
              style={{ width: `${bootProgress}%` }}
            />
          </div>

          <div className="space-y-1.5 text-left w-full h-40 overflow-y-auto custom-scrollbar bg-black/60 border border-indigo-950/40 p-5 rounded text-[10px] text-indigo-400/80">
            {bootLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-1">
                <span className="text-indigo-600 font-bold">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-900 pt-6 text-[10px] text-slate-500 z-10 w-full">
          <span>PRIVATE HEAVY-DUTY ARCHIVE ENGINE // V12</span>
          <span className="mt-2 sm:mt-0">SECURE SYSTEM COMPILE: {bootProgress}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen bg-[#020204] text-slate-100 flex flex-col font-sans scanlines grain-overlay overflow-x-hidden transition-all duration-500`}>
      
      {/* Background radial soft glow matching active theme accent */}
      <div 
        className="absolute top-0 right-0 w-[50vw] h-[50vh] rounded-full blur-[220px] pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: theme.glow }}
      />
      <div 
        className="absolute bottom-10 left-10 w-[40vw] h-[40vh] rounded-full blur-[180px] pointer-events-none transition-all duration-1000" 
        style={{ backgroundColor: `${theme.glow}0.4` }}
      />

      {/* SYSTEM HEADER BAR */}
      <header className="border-b border-slate-900 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className={`w-9 h-9 rounded bg-gradient-to-br ${theme.bgGradient} border ${theme.border} flex items-center justify-center transition-all duration-500`}>
              <span className={`font-serif ${theme.primary} font-bold text-base tracking-wider`}>A</span>
            </div>
            <div>
              <span className="font-serif text-sm font-bold tracking-[0.25em] text-white">ANI.OS</span>
              <span className={`block text-[8px] ${theme.primary} font-mono tracking-widest uppercase`}>PRIVATE COGNITIVE INTERFACE</span>
            </div>
          </div>
          
          <div className={`hidden lg:flex items-center gap-2 bg-black/40 border ${theme.border} rounded px-3 py-1 text-[9px] text-slate-400 font-mono`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>FABRIC ACCENT: <span className="text-white font-bold">{theme.name.toUpperCase()}</span></span>
          </div>
        </div>

        {/* Real-time Synth Control Dials */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {isPlayingAudio && (
            <div className="hidden xl:flex items-center gap-4 bg-black/50 border border-slate-900 rounded p-1.5 px-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[9px] font-mono text-slate-500">PITCH:</span>
                <span className="text-[9px] font-mono text-indigo-400 w-8">{synthFreq}Hz</span>
                <input 
                  type="range" 
                  min="55" 
                  max="110" 
                  value={synthFreq}
                  onChange={(e) => setSynthFreq(Number(e.target.value))}
                  className="w-16 accent-indigo-500"
                />
              </div>
              <div className="h-4 w-[1px] bg-slate-900" />
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[9px] font-mono text-slate-500">LFO:</span>
                <span className="text-[9px] font-mono text-indigo-400 w-8">{lfoSpeed}s</span>
                <input 
                  type="range" 
                  min="0.1" 
                  max="2.0" 
                  step="0.1"
                  value={lfoSpeed}
                  onChange={(e) => setLfoSpeed(Number(e.target.value))}
                  className="w-16 accent-indigo-500"
                />
              </div>
            </div>
          )}

          <button 
            onClick={toggleAmbientSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono transition-all duration-300 ${
              isPlayingAudio 
                ? `bg-black/90 ${theme.accentBorder} ${theme.primary} shadow-[0_0_12px_rgba(255,255,255,0.04)]` 
                : 'bg-black/20 border-slate-900 text-slate-400 hover:border-slate-800'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span>SOUNDSCAPE ACTIVE</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>SOUNDSCAPE SILENT</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* SYSTEM BODY NAVIGATION */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* SIDE BAR NAVIGATION */}
        <nav className="w-full md:w-64 border-r border-slate-900 bg-black/30 p-5 space-y-2 md:sticky md:top-[73px] md:h-[calc(100vh-73px)] flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto custom-scrollbar shrink-0">
          {[
            { id: 'dashboard', label: 'Dashboard Panel', icon: Terminal },
            { id: 'design-lab', label: 'Typography Lab', icon: Compass },
            { id: 'reconstruction', label: 'Reconstruct Matrix', icon: Layers },
            { id: 'factory', label: 'Fabric Factory', icon: Box },
            { id: 'ghost-mode', label: 'Ghost Comm Mode', icon: Shield },
            { id: 'psychology', label: 'Creative Psychology', icon: Brain },
            { id: 'archive', label: 'Future Archives', icon: Folder },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`w-auto md:w-full flex items-center gap-3 px-4 py-3 rounded transition-all text-left text-xs font-mono shrink-0 ${
                  isActive 
                    ? `bg-gradient-to-r ${theme.bgGradient} border-l-2 ${theme.accentBorder} ${theme.primary}` 
                    : 'text-slate-400 hover:text-white hover:bg-slate-950/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? theme.primary : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="hidden md:block pt-8 mt-auto text-[9px] font-mono text-slate-600 text-center uppercase tracking-widest leading-loose border-t border-slate-900/60">
            <p>© ARCHIVE CHRONICLES</p>
            <p className={theme.primary}>PRESERVE THE VISION</p>
          </div>
        </nav>

        {/* WORKSPACE AREA */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full custom-scrollbar">
          
          {/* DASHBOARD MODULE */}
          {currentTab === 'dashboard' && (
            <div className="space-y-8">
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
                <div>
                  <h2 className="text-3xl font-serif tracking-wider font-bold text-white uppercase gothic-text">
                    COMMAND DASHBOARD
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    User Credentials: <span className={theme.primary}>Aniqa // Head Architect of Void</span>
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-black/60 border border-slate-900 px-3.5 py-2 rounded text-slate-400 uppercase tracking-widest">
                  PORTAL SECURED // LOCK OK
                </span>
              </div>

              {/* Dynamic Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Dashboard Core Directive */}
                <div className="md:col-span-2 bg-gradient-to-br from-[#070512] to-black border border-slate-900 rounded-lg p-6 flex flex-col justify-between chrome-glow">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase block mb-4">// PRIMARY SYSTEM DIRECTIVE</span>
                    <h3 className="text-2xl font-serif text-slate-100 font-bold mb-4 leading-relaxed">
                      "Isolate asymmetric structure from visual noise. Mastery lives in absolute restraint."
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Amateurs load white canvases with generic decorative details because they fear visual void. As an elite architect, your duty is to make a single letter layout command an entire screen through extreme margins and tracking control.
                    </p>
                  </div>
                  <div className="border-t border-slate-900/60 pt-4 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-mono w-full">
                    <span className="text-slate-500">CALIBRATION ENGINE // V12.04</span>
                    <button 
                      onClick={() => setCurrentTab('reconstruction')}
                      className={`flex items-center gap-1.5 text-xs ${theme.primary} font-semibold`}
                    >
                      BEGIN RECONSTRUCTION LAB <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                    </button>
                  </div>
                </div>

                {/* Cognitive Insight Box */}
                <div className="bg-[#050508] border border-slate-900 rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase block mb-4">// CREATIVE INTELLIGENCE NOTE</span>
                    <p className="text-sm font-serif italic text-slate-200 leading-relaxed mb-6">
                      "Perfectionism is merely your ego's defensive safety mechanism designed to protect you from public opinion. Neutralize it by creating raw mockups under zero-evaluation constraints."
                    </p>
                  </div>
                  <div>
                    <span className={`text-[8px] font-mono ${theme.primary} uppercase block mb-3`}>IDENTITY ANCHOR</span>
                    <button 
                      onClick={() => setCurrentTab('psychology')}
                      className="w-full py-2.5 bg-black/60 border border-slate-900 hover:border-slate-800 text-[10px] font-mono text-slate-300 rounded transition-all"
                    >
                      Bypass Blockages
                    </button>
                  </div>
                </div>

                {/* Palette Switcher Card */}
                <div className="bg-[#050508] border border-slate-900 rounded-lg p-6">
                  <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase block mb-4">// CALIBRATE INTERFACE ACCENT</span>
                  <div className="space-y-3">
                    {Object.entries(palettes).map(([key, item]) => (
                      <div 
                        key={key}
                        onClick={() => setActivePalette(key)}
                        className={`p-3 rounded border cursor-pointer transition-all flex items-center justify-between ${
                          activePalette === key ? `border-white bg-black` : 'border-slate-900 bg-[#08080c] hover:border-slate-850'
                        }`}
                      >
                        <div>
                          <span className="text-xs text-slate-200 block font-serif font-bold">{item.name}</span>
                          <span className="text-[8px] text-slate-500 block font-mono uppercase mt-0.5">{item.description}</span>
                        </div>
                        <div className="flex gap-1.5">
                          {item.previewColors.map((c, i) => (
                            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Synth Osc Waveform Selection */}
                <div className="bg-[#050508] border border-slate-900 rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase block mb-4">// ACOUSTIC WAVEFORM CONTROLLER</span>
                    <div className="grid grid-cols-3 gap-1.5 mb-4">
                      {['sawtooth', 'triangle', 'sine'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSynthType(type)}
                          className={`py-1.5 text-[9px] font-mono border rounded uppercase transition-all ${
                            synthType === type ? `border-white ${theme.primary} bg-black` : 'border-slate-900 text-slate-400 bg-black/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-1">
                          <span>LOW ENGINE FREQ:</span>
                          <span>{synthFreq} HZ</span>
                        </div>
                        <input 
                          type="range" 
                          min="55" 
                          max="110" 
                          value={synthFreq} 
                          onChange={(e) => setSynthFreq(Number(e.target.value))}
                          className="w-full accent-slate-400" 
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-1">
                          <span>PINK RAIN MASK:</span>
                          <span>{Math.round(staticVolume * 1000)} VOL</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.00" 
                          max="0.15" 
                          step="0.01" 
                          value={staticVolume} 
                          onChange={(e) => setStaticVolume(Number(e.target.value))}
                          className="w-full accent-slate-400" 
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-[8px] font-mono text-slate-600 uppercase mt-4">REALTIME SYNTH DRIVER SECURED</p>
                </div>

                {/* Skill Evolution Meter */}
                <div className="bg-[#050508] border border-slate-900 rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase block mb-4">// SKILL EVOLUTION TRACKS</span>
                    <div className="space-y-3.5">
                      {[
                        { name: "Optical Spacing & Kerning", progress: 92 },
                        { name: "Asymmetry Balance & Negative Void", progress: 87 },
                        { name: "Heavy Fabric Loopback Specs", progress: 81 },
                        { name: "Clinical Communication Sovereignty", progress: 95 }
                      ].map((skill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono">
                            <span className="text-slate-300">{skill.name}</span>
                            <span className={theme.primary}>{skill.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-950 h-1 rounded-sm overflow-hidden border border-slate-900">
                            <div className={`h-full ${theme.accent}`} style={{ width: `${skill.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[8px] font-mono text-slate-600 uppercase mt-4">MATRIX VERIFICATION COMPLETE</p>
                </div>

              </div>

            </div>
          )}

          {/* DESIGN LAB MODULE */}
          {currentTab === 'design-lab' && (
            <div className="space-y-8">
              
              <div className="border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-serif tracking-wider font-bold text-white uppercase gothic-text">
                    DESIGN EXPERIMENTAL LAB
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Train your spatial perception, contrast weights, and typographical optical spacing.
                  </p>
                </div>
                
                <div className="flex gap-2 bg-black/40 border border-slate-900 p-1.5 rounded text-[10px] font-mono">
                  <span className="text-slate-500 uppercase">GRID OVERLAYS:</span>
                  {['none', 'golden', 'thirds', 'void'].map((grid) => (
                    <button
                      key={grid}
                      onClick={() => setActiveOverlayGrid(grid)}
                      className={`px-2 py-0.5 rounded uppercase transition-all ${
                        activeOverlayGrid === grid ? 'bg-white text-black font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {grid}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Layout Canvas */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Visual Sandbox Area */}
                <div className="lg:col-span-2 bg-[#050508] border border-slate-900 rounded-lg p-6 chrome-glow flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Absolute Composition Grid lines */}
                  {activeOverlayGrid === 'thirds' && (
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-20">
                      <div className="border-r border-b border-dashed border-rose-500/20" />
                      <div className="border-r border-b border-dashed border-rose-500/20" />
                      <div className="border-b border-dashed border-rose-500/20" />
                      <div className="border-r border-b border-dashed border-rose-500/20" />
                      <div className="border-r border-b border-dashed border-rose-500/20" />
                      <div className="border-b border-dashed border-rose-500/20" />
                    </div>
                  )}

                  {activeOverlayGrid === 'golden' && (
                    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                      <div className="w-[80%] h-[80%] border border-rose-500/15 rounded-full animate-pulse" />
                      <div className="w-[50%] h-[50%] border border-rose-500/15 rounded-full absolute" />
                      <div className="w-[30%] h-[30%] border border-rose-500/15 rounded-full absolute" />
                    </div>
                  )}

                  {activeOverlayGrid === 'void' && (
                    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between">
                      <div className="h-1/3 bg-rose-500/5 border-b border-dashed border-rose-500/10 flex items-center justify-center">
                        <span className="text-[8px] font-mono text-rose-500/30">70% SYSTEM VOID BOUNDARY</span>
                      </div>
                      <div className="h-1/3" />
                      <div className="h-1/3 bg-rose-500/5 border-t border-dashed border-rose-500/10" />
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-6 text-[10px] font-mono">
                      <span className="text-slate-400 uppercase tracking-widest">// RAW SANDBOX CANVAS</span>
                      <span className={theme.primary}>ACCENT SHADER: {customTypos.blendMode.toUpperCase()}</span>
                    </div>

                    <div className="bg-black border border-slate-900 rounded min-h-[300px] flex items-center justify-center relative p-6 grid-lines">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                      
                      <div 
                        style={{
                          fontSize: `${customTypos.fontSize}px`,
                          letterSpacing: `${customTypos.letterSpacing}px`,
                          lineHeight: customTypos.lineHeight,
                          fontFamily: customTypos.fontStyle === 'serif' ? 'Cinzel, Georgia, serif' : customTypos.fontStyle === 'mono' ? 'Courier, monospace' : 'Inter, sans-serif',
                          textAlign: customTypos.align,
                          mixBlendMode: customTypos.blendMode
                        }}
                        className="text-white relative z-10 font-bold uppercase transition-all tracking-widest leading-none text-center"
                      >
                        {customTypos.text}
                        <span className="block text-[10px] text-slate-500 font-mono tracking-[0.9em] mt-4 opacity-50 text-center">
                          ANIQA COUTURE LAB // ARCHITECT RESISTANCE
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scientific design lesson card */}
                  <div className="mt-6 p-4 bg-indigo-950/20 border border-indigo-900/40 rounded">
                    <span className="text-[9px] font-mono uppercase text-indigo-400 block mb-1">AESTHETIC LAW DIAGNOSTIC:</span>
                    <p className="text-xs text-slate-300 font-serif leading-relaxed italic">
                      {typographyFormulas[selectedFormulaId]?.lesson || "Manual tweaks detected. Readjust using the right formula panel to study classic typography laws."}
                    </p>
                  </div>
                </div>

                {/* Typography controls & APCA Palette Contrast Engine */}
                <div className="space-y-6">
                  
                  {/* Preset formula selectors */}
                  <div className="bg-[#050508] border border-slate-900 rounded-lg p-5">
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mb-4">// CLASSIC GRID PRESETS</span>
                    <div className="space-y-2">
                      {Object.entries(typographyFormulas).map(([key, item]) => (
                        <button
                          key={key}
                          onClick={() => applyPresetFormula(key)}
                          className={`w-full text-left p-3 rounded border font-mono transition-all flex justify-between items-center ${
                            selectedFormulaId === key 
                              ? `border-white bg-black ${theme.primary}` 
                              : 'border-slate-900 bg-black/20 text-slate-400 hover:border-slate-800'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{item.name}</span>
                            <span className="text-[8px] text-slate-500 block uppercase">TYPOGRAPHY: {item.fontStyle}</span>
                          </div>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Interactive Optical Kerning Tuning */}
                  <div className="bg-[#050508] border border-slate-900 rounded-lg p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                      <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">// OPTICAL HIGHLIGHT RECONSTRUCTOR</span>
                      <span className="text-[9px] font-mono text-emerald-400">CALIBRATING</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-serif">
                      High-fashion titles suffer from mechanical software spacing. Adjust specific character tracking values to balance optical weight.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[9px] font-mono mb-1 text-slate-400">
                          <span>N - E O GAP (OPTICAL BALANCE):</span>
                          <span>{kerningOffsets.pair1}PX</span>
                        </div>
                        <input 
                          type="range" 
                          min="-10" 
                          max="15" 
                          value={kerningOffsets.pair1}
                          onChange={(e) => setKerningOffsets(prev => ({ ...prev, pair1: Number(e.target.value) }))}
                          className="w-full accent-slate-400"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-[9px] font-mono mb-1 text-slate-400">
                          <span>P - A R GAP (CRITICAL GAP):</span>
                          <span>{kerningOffsets.pair2}PX</span>
                        </div>
                        <input 
                          type="range" 
                          min="-10" 
                          max="15" 
                          value={kerningOffsets.pair2}
                          onChange={(e) => setKerningOffsets(prev => ({ ...prev, pair2: Number(e.target.value) }))}
                          className="w-full accent-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* APCA Cyberpunk Contrast Analyzer */}
                  <div className="bg-[#050508] border border-slate-900 rounded-lg p-5 space-y-3">
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block border-b border-slate-900 pb-2">// APCA READABILITY ANALYZER</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black border border-slate-900 p-2 rounded text-center">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase">LUMINANCE RETENTION</span>
                        <span className="text-xs font-mono font-bold text-white">L-VALUE // 88%</span>
                      </div>
                      <div className="bg-black border border-slate-900 p-2 rounded text-center">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase">VISUAL FATIGUE</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">0.02 (VERY LOW)</span>
                      </div>
                    </div>
                    <p className="text-[9px] font-mono text-slate-500 leading-relaxed">
                      Luminance analysis confirms deep space dark layers paired with laser-sharp {theme.name} accents prevent optic strain over long layout editing sessions.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* RECONSTRUCTION MODULE */}
          {currentTab === 'reconstruction' && (
            <div className="space-y-8">
              
              <div className="border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-serif tracking-wider font-bold text-white uppercase gothic-text">
                    RECONSTRUCTION ALIGNMENT INDEX
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Calibration tests. Train your visual eye by manually aligning layout matrices against elite references.
                  </p>
                </div>
                
                {/* Level selector buttons */}
                <div className="flex gap-2">
                  {reconstructionMissions.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setActiveMissionIndex(idx);
                        setChallengeOffsets({ x: 10, y: 35, tracking: 6 });
                      }}
                      className={`px-3 py-1.5 rounded border text-[10px] font-mono transition-all ${
                        activeMissionIndex === idx 
                          ? `border-white text-white bg-black` 
                          : 'border-slate-900 text-slate-400 bg-black/20 hover:border-slate-850'
                      }`}
                    >
                      {m.difficulty.split(' ')[0]} {m.difficulty.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Challenge Arena */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Visual Alignment Sandbox */}
                <div className="lg:col-span-2 bg-[#050508] border border-slate-900 rounded-lg p-6 chrome-glow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">// ALIGNMENT CALIBRATOR</span>
                        <h4 className="text-base font-serif font-bold text-slate-200">{currentMission.title}</h4>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/20 px-3 py-1 rounded border border-emerald-900/60 font-bold">
                        MATCHING: {challengeScore}% ACCURACY
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Target Blueprint (Perfect reference) */}
                      <div className="bg-black border border-slate-900 rounded p-4 relative h-64 flex flex-col justify-between overflow-hidden">
                        <span className="absolute top-2 left-2 text-[8px] font-mono text-slate-600 uppercase">BLUEPRINT (TARGET SPEC)</span>
                        <div 
                          style={{
                            transform: `translate(${currentMission.target.x}px, ${currentMission.target.y}px)`,
                            letterSpacing: `${currentMission.target.tracking}px`
                          }}
                          className="text-white font-serif font-bold text-2xl leading-none absolute transition-all"
                        >
                          {currentMission.text}
                        </div>
                      </div>

                      {/* Active edit sandbox with guide silhouette */}
                      <div className="bg-black border-2 border-indigo-900/40 rounded p-4 relative h-64 flex flex-col justify-between overflow-hidden">
                        <span className="absolute top-2 left-2 text-[8px] font-mono text-indigo-400 uppercase">ACTIVE WORKSPACE (SLIDE TO ALIGN)</span>
                        
                        {/* Target guide silhouette layer */}
                        <div 
                          style={{
                            transform: `translate(${currentMission.target.x}px, ${currentMission.target.y}px)`,
                            letterSpacing: `${currentMission.target.tracking}px`
                          }}
                          className="text-slate-900 font-serif font-bold text-2xl leading-none absolute opacity-40 select-none"
                        >
                          {currentMission.text}
                        </div>

                        {/* User controlled active element */}
                        <div 
                          style={{
                            transform: `translate(${challengeOffsets.x}px, ${challengeOffsets.y}px)`,
                            letterSpacing: `${challengeOffsets.tracking}px`
                          }}
                          className={`font-serif font-bold text-2xl leading-none absolute ${theme.primary} transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`}
                        >
                          {currentMission.text}
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 mt-6 pt-4 border-t border-slate-900/60 w-full gap-2">
                    <span>BLUEPRINT TARGET: X-AXIS: {currentMission.target.x}PX // Y-AXIS: {currentMission.target.y}PX // LETTER-TRACKING: {currentMission.target.tracking}PX</span>
                    <span className="font-bold uppercase text-emerald-500/80">{challengeScore > 92 ? "OPTIMAL CALIBRATION INDEX CONFIRMED" : "ADJUST TUNERS TO LOCK TARGET VALUES"}</span>
                  </div>
                </div>

                {/* Challenge Sliders controls panel */}
                <div className="bg-[#050508] border border-slate-900 rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mb-6">// ALIGNMENT TUNERS</span>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                          <span>HORIZONTAL (X-COORDINATE):</span>
                          <span className="text-indigo-400 font-bold">{challengeOffsets.x}PX</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="80" 
                          value={challengeOffsets.x}
                          onChange={(e) => setChallengeOffsets(prev => ({ ...prev, x: Number(e.target.value) }))}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                          <span>VERTICAL (Y-COORDINATE):</span>
                          <span className="text-indigo-400 font-bold">{challengeOffsets.y}PX</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="160" 
                          value={challengeOffsets.y}
                          onChange={(e) => setChallengeOffsets(prev => ({ ...prev, y: Number(e.target.value) }))}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                          <span>TYPOGRAPHY TRACKING WIDENING:</span>
                          <span className="text-indigo-400 font-bold">{challengeOffsets.tracking}PX</span>
                        </div>
                        <input 
                          type="range" 
                          min="2" 
                          max="32" 
                          value={challengeOffsets.tracking}
                          onChange={(e) => setChallengeOffsets(prev => ({ ...prev, tracking: Number(e.target.value) }))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {challengeScore > 92 ? (
                    <div className="p-4 bg-emerald-950/20 border border-emerald-900/60 rounded mt-6">
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
                        <Award className="w-4 h-4" />
                        <span>METRIC STYLES DECRYPTED</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed font-serif">
                        {currentMission.teardown} Calibration successfully logged to your layout bank.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-900/40 border border-slate-900 rounded text-center text-slate-500 text-[10px] font-mono mt-6">
                      Align workspace settings to reach &gt;92% accuracy to retrieve visual balance insights.
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* FACTORY MODE MODULE */}
          {currentTab === 'factory' && (
            <div className="space-y-8">
              
              <div className="border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-serif tracking-wider font-bold text-white uppercase gothic-text">
                    INDUSTRIAL FABRIC FACTORY
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Ground your creative layout visions inside real heavyweight luxury textile manufacturing specifications.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 bg-indigo-950/20 border border-indigo-900/60 p-2.5 rounded text-[10px] font-mono text-indigo-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                  <span>INTERACTIVE TECH-PACK SYSTEM ENFORCED</span>
                </div>
              </div>

              {/* Advanced Tech Pack Blueprint Canvas */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* SVG Blueprint Hotspots Panel */}
                <div className="lg:col-span-2 bg-[#050508] border border-slate-900 rounded-lg p-6 chrome-glow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mb-6">
                      // INTERACTIVE APPAREL SPEC HOTSPOTS
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      
                      {/* Hoodie Blueprint Vector Graphic */}
                      <div className="relative bg-black border border-slate-900/80 rounded p-6 flex items-center justify-center min-h-[250px] overflow-hidden">
                        
                        {/* CSS-Simulated Fabric Drape Physics display box */}
                        <div className="absolute top-2 right-2 border border-slate-900 bg-[#050508] p-2 rounded text-center">
                          <span className="text-[7px] font-mono text-slate-500 block uppercase">FABRIC RESISTANCE SIMULATION</span>
                          <div className="w-24 h-6 bg-black relative rounded overflow-hidden mt-1 flex items-center justify-center border border-slate-950">
                            {/* Animated line depicting fold rigidity depending on active gsm */}
                            <svg className="absolute inset-0 w-full h-full stroke-indigo-400 fill-none" viewBox="0 0 100 20">
                              <path 
                                d={`M 10 10 Q 30 ${10 - (10 * gsmSpecs[activeGsm].simRigidity)} 50 10 T 90 10`} 
                                strokeWidth="2"
                                className="transition-all duration-500"
                              />
                            </svg>
                          </div>
                          <span className="text-[8px] font-mono text-slate-300 block uppercase mt-1">{gsmSpecs[activeGsm].stiffness.split(' // ')[0]}</span>
                        </div>

                        <svg className="w-full max-w-[180px] h-auto stroke-slate-500 fill-none transition-colors duration-300" viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
                          {/* Hood lines */}
                          <path d="M40 30 Q50 15 60 30 Q55 35 45 35 Z" strokeWidth="1.2" className="cursor-pointer hover:stroke-indigo-400 transition" onClick={() => setSelectedTechHotspot('hood')} />
                          {/* Body outline shape */}
                          <path d="M30 35 L70 35 L75 85 L25 85 Z" strokeWidth="1" />
                          {/* Left Sleeve drop shoulder block */}
                          <path d="M30 35 L12 55 L22 62 L32 48" strokeWidth="1.2" className="cursor-pointer hover:stroke-indigo-400 transition" onClick={() => setSelectedTechHotspot('shoulder')} />
                          {/* Right Sleeve drop shoulder block */}
                          <path d="M70 35 L88 55 L78 62 L68 48" strokeWidth="1.2" className="cursor-pointer hover:stroke-indigo-400 transition" onClick={() => setSelectedTechHotspot('shoulder')} />
                          {/* Kangaroo Pocket structure */}
                          <path d="M38 65 L62 65 L58 82 L42 82 Z" strokeWidth="1" className="cursor-pointer hover:stroke-indigo-400 transition" onClick={() => setSelectedTechHotspot('pocket')} />
                          {/* Hem waistband ribs */}
                          <rect x="25" y="85" width="50" height="6" strokeWidth="1" className="cursor-pointer hover:stroke-indigo-400 transition" onClick={() => setSelectedTechHotspot('rib')} />

                          {/* Target hotspot indicators */}
                          <circle cx="50" cy="24" r="3" className="fill-rose-500 stroke-black animate-pulse cursor-pointer" onClick={() => setSelectedTechHotspot('hood')} />
                          <circle cx="28" cy="40" r="3" className="fill-rose-500 stroke-black animate-pulse cursor-pointer" onClick={() => setSelectedTechHotspot('shoulder')} />
                          <circle cx="50" cy="73" r="3" className="fill-rose-500 stroke-black animate-pulse cursor-pointer" onClick={() => setSelectedTechHotspot('pocket')} />
                          <circle cx="50" cy="88" r="3" className="fill-rose-500 stroke-black animate-pulse cursor-pointer" onClick={() => setSelectedTechHotspot('rib')} />
                        </svg>

                        <div className="absolute bottom-4 left-4">
                          <span className="text-[9px] font-mono text-indigo-400 animate-pulse">// REINFORCED STITCH HOTSPOTS LINKED</span>
                        </div>
                      </div>

                      {/* Hotspot details panel */}
                      <div className="space-y-4">
                        <div className="border border-slate-900 bg-black/50 p-4 rounded-lg space-y-2.5">
                          <span className={`text-[8px] font-mono uppercase block ${theme.primary}`}>ACTIVE BLUEPRINT HOTSPOT</span>
                          <h4 className="text-sm font-serif font-bold text-white">{techHotspots[selectedTechHotspot].title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed font-serif">
                            {techHotspots[selectedTechHotspot].spec}
                          </p>
                          <div className="border-t border-slate-900/60 pt-2.5 mt-2.5">
                            <span className="text-[9px] font-mono text-slate-500 block">ASSEMBLY DIMENSIONS // GUIDELINE:</span>
                            <span className="text-[10px] font-mono text-slate-200 font-bold">{techHotspots[selectedTechHotspot].measurement}</span>
                          </div>
                        </div>

                        {/* Switch buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          {Object.keys(techHotspots).map((k) => (
                            <button
                              key={k}
                              onClick={() => setSelectedTechHotspot(k)}
                              className={`py-1.5 text-[9px] font-mono rounded border uppercase transition-all ${
                                selectedTechHotspot === k ? 'border-white bg-black text-white' : 'border-slate-900 bg-black/20 text-slate-400'
                              }`}
                            >
                              {k} SPEC
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Weight specifications and loopback thickness */}
                  <div className="border-t border-slate-900/60 pt-4 mt-6">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block mb-3">// COTTON GSM SPECIFICATION LIBRARY</span>
                    <div className="grid grid-cols-3 gap-3">
                      {[240, 350, 500].map((gsm) => (
                        <div
                          key={gsm}
                          onClick={() => {
                            setActiveGsm(gsm);
                            setTechPackConfig(prev => ({ 
                              ...prev, 
                              weight: `${gsm} GSM`,
                              silhouette: gsm === 500 ? 'Extreme Oversized Drop-Shoulder Hoodie' : gsm === 350 ? 'Oversized Boxy Hoodie' : 'Standard Relaxed Drop-Shoulder Tee',
                              fabric: gsm === 240 ? '100% Combed Compact Jersey' : '100% Premium Cotton French Terry'
                            }));
                          }}
                          className={`p-3 rounded border cursor-pointer transition-all flex flex-col justify-between ${
                            activeGsm === gsm ? 'border-white bg-black' : 'border-slate-900 bg-black/20 hover:border-slate-850'
                          }`}
                        >
                          <div>
                            <span className={`text-[9px] font-mono font-bold block ${activeGsm === gsm ? theme.primary : 'text-slate-500'}`}>{gsm} GSM</span>
                            <span className="text-xs font-serif text-slate-100 block mt-1 leading-snug">{gsmSpecs[gsm].title.slice(11)}</span>
                          </div>
                          <p className="text-[9px] font-serif text-slate-400 leading-normal mt-2.5">{gsmSpecs[gsm].technical}</p>
                          <span className="text-[8px] font-mono text-slate-500 block mt-4 uppercase font-bold">{gsmSpecs[gsm].drape.slice(0, 32)}...</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Pack Builder Manifest compiler */}
                <div className="space-y-6">
                  
                  {/* Real-time configuration compiler */}
                  <div className="bg-[#050508] border border-slate-900 rounded-lg p-5 space-y-4">
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block border-b border-slate-900 pb-2">// TECH-PACK CONFIG COMPILER</span>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-[8px] font-mono text-slate-500 block uppercase mb-1">Stitching Layout Specification:</label>
                        <select 
                          value={techPackConfig.stitch} 
                          onChange={(e) => setTechPackConfig(prev => ({ ...prev, stitch: e.target.value }))}
                          className="w-full bg-black border border-slate-900 rounded px-2 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-slate-700"
                        >
                          <option>Twin-needle 1/4" Coverstitch</option>
                          <option>Triple-needle Flatlock Overstitch</option>
                          <option>Overlocked Seamless Merrow Edge</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[8px] font-mono text-slate-500 block uppercase mb-1">Fabric Wash Style Specification:</label>
                        <select 
                          value={techPackConfig.wash} 
                          onChange={(e) => setTechPackConfig(prev => ({ ...prev, wash: e.target.value }))}
                          className="w-full bg-black border border-slate-900 rounded px-2 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-slate-700"
                        >
                          <option>Heavy Acid Sulfur Wash</option>
                          <option>Enzyme Softening Pumice Wash</option>
                          <option>Vintage Silicon garment-Dye</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[8px] font-mono text-slate-500 block uppercase mb-1">Primary Decoration Technique:</label>
                        <select 
                          value={techPackConfig.print} 
                          onChange={(e) => setTechPackConfig(prev => ({ ...prev, print: e.target.value }))}
                          className="w-full bg-black border border-slate-900 rounded px-2 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-slate-700"
                        >
                          <option>3D High-Density Puff Print</option>
                          <option>Satin Viscose Direct Embroidery</option>
                          <option>Organic Water-Based Discharge Print</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-black border border-slate-950 p-3 rounded font-mono text-[9px] text-indigo-400/90 leading-relaxed overflow-x-auto select-all">
                      <p className="text-slate-500 mb-1">// COMPILED MANU_SPEC.JSON</p>
                      <pre>{JSON.stringify(techPackConfig, null, 2)}</pre>
                    </div>

                    <button 
                      onClick={() => handleCopyToClipboard(JSON.stringify(techPackConfig, null, 2), 'techpack')}
                      className={`w-full py-2 rounded text-xs font-mono font-bold transition-all ${
                        copiedText === 'techpack' ? 'bg-emerald-600 text-white' : 'bg-white text-black hover:bg-slate-200'
                      }`}
                    >
                      {copiedText === 'techpack' ? "SPEC MANIFEST COPIED" : "EXPORT MANU_SPEC JSON"}
                    </button>
                  </div>

                  {/* Print techniques guidelines */}
                  <div className="bg-[#050508] border border-slate-900 rounded-lg p-5 space-y-3">
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block border-b border-slate-900 pb-2">// DECORATION SPEC MANIFEST</span>
                    {[
                      { name: "Satin Direct Embroidery", spec: "Direct-to-garment high speed needle stitching. Ideal for thick loopback structures.", index: "Viscose stitch density: 140 threads per square centimeter." },
                      { name: "Plastisol Heat Puff print", spec: "Additive puffing paste formula screen-printed and baked on flat canvas.", index: "Mesh count screen layout: 86-mesh to ensure 3D volume rise." }
                    ].map((d, idx) => (
                      <div key={idx} className="bg-black/40 border border-slate-950 p-2.5 rounded text-[10px] space-y-1">
                        <span className="font-serif font-bold text-white block">{d.name}</span>
                        <p className="text-slate-400 font-serif">{d.spec}</p>
                        <span className="block text-[8px] font-mono text-indigo-400 uppercase mt-1">{d.index}</span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

              {/* Client Briefs Section */}
              <div className="bg-[#050508] border border-slate-900 rounded-lg p-6">
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mb-4">// DESIGN WORKSPACE BRIEFS & SPEC ARCHIVE</span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {mockBriefs.map((b, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedBrief(idx)}
                      className={`p-4 rounded border cursor-pointer transition-all ${
                        selectedBrief === idx ? `border-white bg-black` : 'border-slate-900 bg-[#08080c] hover:border-slate-800'
                      }`}
                    >
                      <span className="text-sm font-serif font-bold text-white block mb-1">{b.title}</span>
                      <span className="text-[9px] text-slate-500 font-mono block">TARGET AUDIENCE: {b.target.slice(0, 48)}...</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-black border border-slate-900 rounded space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-950 pb-2">
                    <span className="text-[10px] font-mono text-slate-400">DESIGN SPECIFICATION AND PRODUCTION PARAMETERS</span>
                    <span className={`text-[10px] font-mono ${theme.primary}`}>SECURE APPAREL DESIGN ARCHIVE</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-serif italic">
                    "{mockBriefs[selectedBrief].demands}"
                  </p>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-950">
                    <span>VISUAL PATHWAY: {mockBriefs[selectedBrief].aesthetic}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* GHOST MODE MODULE */}
          {currentTab === 'ghost-mode' && (
            <div className="space-y-8">
              
              <div className="border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-serif tracking-wider font-bold text-white uppercase gothic-text">
                    GHOST COMMUNICATIONS MODE
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Tactical client communication systems. Formulate clinical, non-emotional statements to protect your layout hours.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 bg-rose-950/20 border border-rose-900 px-3 py-1.5 rounded text-[10px] font-mono text-rose-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>COMMUNICATION ISOLATION LAYER ONLINE</span>
                </div>
              </div>

              {/* Advanced Script compiler workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Visual response generator pane */}
                <div className="lg:col-span-2 bg-[#050508] border border-slate-900 rounded-lg p-6 chrome-glow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-6">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">// DECRYPTED TRANSACTIVE SCRIPT</span>
                      <span className={`text-[10px] font-mono ${theme.primary}`}>
                        ASSERTIVENESS LEVEL: {assertivenessLevel === 1 ? 'DIPLOMATIC' : assertivenessLevel === 2 ? 'TECHNICAL' : 'SURGICAL'}
                      </span>
                    </div>

                    <div className="bg-black border border-slate-950 rounded p-6 min-h-[180px] flex flex-col justify-between relative overflow-hidden">
                      <span className="text-[8px] font-mono text-slate-600 block mb-3 uppercase">OUTPUT STRING (READY TO EXPORT FOR CLIENT SYSTEM INBOX)</span>
                      <p className="text-xs text-slate-200 leading-relaxed font-serif italic">
                        "{scripts[selectedScenario].levels[assertivenessLevel]}"
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-slate-900/60 w-full">
                    <span className="text-[9px] font-mono text-slate-500 uppercase">TONE INDEX: {assertivenessLevel === 1 ? 'COOPERATIVE DIPLOMACY' : assertivenessLevel === 2 ? 'TECHNICAL COMPLIANCE BOUNDARY' : 'CLINICAL SURGICAL SANCTION'}</span>
                    <button 
                      onClick={() => handleCopyToClipboard(scripts[selectedScenario].levels[assertivenessLevel], 'script')}
                      className={`px-4 py-2.5 bg-white text-black font-semibold rounded text-xs transition-all hover:bg-slate-200 flex items-center gap-2`}
                    >
                      {copiedText === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5" />}
                      {copiedText === 'script' ? "COPIED" : "COPY TRANSCRIPTION"}
                    </button>
                  </div>
                </div>

                {/* Tactical input setting dials */}
                <div className="bg-[#050508] border border-slate-900 rounded-lg p-6">
                  <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mb-6">// BOUNDARY RADIAL PARAMETERS</span>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-[9px] text-slate-400 uppercase font-mono block mb-2">Scenario Context Type</label>
                      <div className="space-y-2">
                        {[
                          { id: 'creep', label: 'Out-of-Scope Requests' },
                          { id: 'late', label: 'Delayed Payment Installment' },
                          { id: 'rejection', label: 'Rejecting Client Critique' }
                        ].map((s) => (
                          <div 
                            key={s.id}
                            onClick={() => setSelectedScenario(s.id)}
                            className={`p-3 rounded border text-xs font-mono cursor-pointer transition-all ${
                              selectedScenario === s.id ? 'border-white bg-black' : 'border-slate-900 bg-black/25 text-slate-400 hover:border-slate-800'
                            }`}
                          >
                            {s.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-2">
                        <span>ASSERTIVENESS PROFILE:</span>
                        <span className={theme.primary}>LEVEL {assertivenessLevel}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="3" 
                        value={assertivenessLevel}
                        onChange={(e) => setAssertivenessLevel(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-2.5">
                        <span>DIPLOMATIC SUPPORT</span>
                        <span>TECHNICAL RULE</span>
                        <span>SURGICAL BLOCK</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* CREATIVE PSYCHOLOGY MODULE */}
          {currentTab === 'psychology' && (
            <div className="space-y-8">
              
              <div className="border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-serif tracking-wider font-bold text-white uppercase gothic-text">
                    CREATIVE PSYCHOLOGICAL FIREWALL
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Analyze, identify, and disassemble visual perfectionist blocks. Refocus your cognitive layers.
                  </p>
                </div>
                
                <div className="bg-emerald-950/20 border border-emerald-900/65 px-3 py-2 rounded flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <Brain className="w-4 h-4" />
                  <span>EMOTIONAL ISOLATION SYSTEM SECURE</span>
                </div>
              </div>

              {/* Deep blockages descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: 'perfectionism',
                    title: "Perfectionist Impotence",
                    symptom: "Deleting half-finished layouts because they do not instantly match elite references.",
                    reframe: "You are judging initial mockups using final-polish criteria. Enforce speed-sketch rules: construct 5 raw, ugly configurations with zero critique loops for 45 minutes."
                  },
                  {
                    id: 'taste',
                    title: "The Taste vs Motor Gap",
                    symptom: "Feeling intense visual disgust when looking at your layout alignment attempts.",
                    reframe: "Your visual intelligence is fully developed, but muscle coordination is catching up. Accept visual disgust as a positive calibration signal rather than system failure."
                  },
                  {
                    id: 'burnout',
                    title: "The Cyclic Burnout Tide",
                    symptom: "Sudden drops in layout focus. Inability to begin simple design tasks.",
                    reframe: "Cognitive layout processing relies on subconscious rest cycles. Trying to force constant output ruins your spatial perception. Retreat to complete visual void."
                  }
                ].map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveBurnoutTopic(item.id)}
                    className={`p-5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between h-64 ${
                      activeBurnoutTopic === item.id 
                        ? `border-white bg-[#09080e]` 
                        : 'border-slate-900 bg-[#050508] hover:border-slate-850'
                    }`}
                  >
                    <div>
                      <span className={`text-[8px] font-mono uppercase block mb-2.5 ${theme.primary}`}>DIAGNOSTIC BLOCKAGE</span>
                      <h4 className="text-base font-serif font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-400 font-serif italic mb-4">"{item.symptom}"</p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-3 border-t border-slate-950 font-serif">
                      {item.reframe}
                    </p>
                  </div>
                ))}
              </div>

              {/* Interactive Boundary Assessment Quiz */}
              <div className="bg-[#050508] border border-slate-900 rounded-lg p-6 space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-950 pb-3">
                  <Target className="w-5 h-5 text-indigo-400" />
                  <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                    // CLINICAL BOUNDARY TESTING APPARATUS
                  </span>
                </div>

                <div className="space-y-6 max-w-3xl">
                  {clinicalPsychologyQuiz.map((q) => (
                    <div key={q.id} className="space-y-3">
                      <p className="text-xs text-slate-200 font-mono">{q.question}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => selectAnswer(q.id, oIdx)}
                            className={`p-3 rounded border text-left text-xs transition-all font-serif ${
                              selectedAnswers[q.id] === oIdx 
                                ? 'border-white bg-black text-white' 
                                : 'border-slate-900 bg-black/20 text-slate-400 hover:border-slate-850'
                            }`}
                          >
                            <span className="block font-bold mb-1">Option {oIdx + 1}:</span>
                            <span className="text-slate-300 text-[11px] leading-relaxed block">{opt.text}</span>
                            
                            {/* Feedback validation details */}
                            {selectedAnswers[q.id] === oIdx && (
                              <span className="block text-[9px] font-mono text-indigo-400 uppercase mt-2 border-t border-indigo-950/60 pt-1">
                                {opt.feedback}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between border-t border-slate-950 pt-4">
                    <button
                      onClick={calculateQuizScore}
                      className="px-4 py-2 bg-white text-black text-xs font-semibold rounded hover:bg-slate-200 transition"
                    >
                      CALCULATE DIAGNOSTIC RATING
                    </button>

                    {quizScore !== null && (
                      <div className="text-xs font-mono">
                        BOUNDARY INTEGRITY RATING: <span className={theme.primary}>{quizScore} / 30 POINTS</span>
                        <span className="block text-[8px] text-slate-500 uppercase mt-0.5">AUTONOMICAL INTEGRITY RATIO LOGGED</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ARCHIVE MODULE */}
          {currentTab === 'archive' && (
            <div className="space-y-8">
              
              <div className="border-b border-slate-900 pb-6">
                <h2 className="text-3xl font-serif tracking-wider font-bold text-white uppercase gothic-text">
                  SECURE VAULT OF FUTURE TRANSMISSIONS
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Access deep cognitive system recordings decrypted via secure verification pin sequences.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Visual Keypad Decrypter */}
                <div className="bg-[#050508] border border-slate-900 rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mb-6">
                      // CRYPTOGRAPHIC KEYPAD PIN
                    </span>
                    
                    <div className="bg-black border border-slate-950 rounded p-4 text-center mb-4">
                      <div className="text-[9px] font-mono text-slate-500 mb-2">SUBMIT SECURE PIN DETAILS</div>
                      <div className="tracking-[0.45em] font-mono text-xl text-white font-bold h-8">
                        {cryptoInput.padEnd(4, '•')}
                      </div>
                      {secretError && <span className="text-[9px] font-mono text-red-500 block mt-1">DECRYPTION ERROR. RETRY PIN.</span>}
                      {secretUnlocked && <span className="text-[9px] font-mono text-emerald-400 block mt-1">SUCCESSFUL VAULT INTEGRITY MOUNTED</span>}
                    </div>

                    {/* Numeric button pad */}
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleKeypadPress(String(num))}
                          className="py-3 bg-black/40 border border-slate-900 rounded font-mono text-xs hover:border-slate-750 transition-all text-white"
                        >
                          {num}
                        </button>
                      ))}
                      <button 
                        onClick={() => setCryptoInput('')}
                        className="py-3 bg-red-950/25 border border-red-900/40 rounded font-mono text-[9px] text-red-400 hover:bg-red-950/40 transition-all"
                      >
                        CLEAR
                      </button>
                      <button 
                        onClick={() => handleKeypadPress('0')}
                        className="py-3 bg-black/40 border border-slate-900 rounded font-mono text-xs hover:border-slate-750 transition-all text-white"
                      >
                        0
                      </button>
                      <div className="bg-slate-950 border border-slate-950 flex items-center justify-center text-[8px] font-mono text-slate-600">
                        PIN: 2032
                      </div>
                    </div>
                  </div>

                  <span className="text-[8px] font-mono text-slate-600 uppercase text-center mt-6">HARDWARE SECURED DECRYPTER SYSTEM</span>
                </div>

                {/* Vault output log view */}
                <div className="lg:col-span-2 bg-[#050508] border border-slate-900 rounded-lg p-6 chrome-glow flex flex-col justify-between min-h-[350px]">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block mb-4">
                      // SECURE FUTURE CHRONICLE CHANNELS
                    </span>

                    {!secretUnlocked ? (
                      <div className="flex flex-col items-center justify-center h-56 border border-dashed border-slate-900 text-center p-6 bg-black/30">
                        <Lock className="w-8 h-8 text-slate-750 mb-3 animate-pulse" />
                        <span className="text-xs font-mono text-slate-400 block mb-1">RECORD INDEXES ENCRYPTED</span>
                        <p className="text-[9px] text-slate-500 max-w-xs leading-relaxed font-mono">
                          Input verification PIN parameters (2032) via the dashboard numeric deck to unlock the system records.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-indigo-900/30 pb-2 mb-2 text-indigo-400 text-xs font-mono">
                          <LockOpen className="w-4 h-4 animate-bounce" />
                          <span>DECRYPTED DEEP SYSTEM TRANSMISSIONS</span>
                        </div>
                        
                        <div className="space-y-4 max-h-56 overflow-y-auto custom-scrollbar pr-2">
                          {futureLogs.map((log, i) => (
                            <div key={i} className="bg-black/50 border border-slate-950 p-3 rounded-lg space-y-1">
                              <span className="block text-[8px] font-mono text-slate-500">{log.date}</span>
                              <p className="text-xs text-slate-300 font-serif italic leading-relaxed">
                                "{log.message}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-[9px] font-mono text-slate-600 border-t border-slate-900 pt-4 uppercase">
                    CHRONO DATA TRANSFER RATE SECURED // RECORD MATRIX CLOSED
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}