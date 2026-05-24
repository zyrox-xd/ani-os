// src/sections/Fabric.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ruler,
  Printer,
  Scissors,
  Package,
  FileText,
  Download,
  Save,
  Trash2,
  Plus,
  X,
  Info,
  Leaf,
  Thermometer,
  Droplet,
  AlertCircle,
  CheckCircle,
  Layers,
  Palette,
} from 'lucide-react';

// Expanded fabric library
const fabricLibrary = [
  { name: 'Cotton Jersey', gsm: 150, feel: 'Soft, breathable', stretch: '4-way', uses: 'T‑shirts, loungewear', care: 'Machine wash cold' },
  { name: 'Linen', gsm: 180, feel: 'Crisp, textured', stretch: 'Minimal', uses: 'Shirts, summer dresses', care: 'Hand wash, air dry' },
  { name: 'Denim', gsm: 350, feel: 'Heavy, durable', stretch: '2-way (selvedge)', uses: 'Jeans, jackets', care: 'Wash inside out' },
  { name: 'Silk Charmeuse', gsm: 70, feel: 'Luxurious, fluid', stretch: 'None', uses: 'Blouses, lingerie', care: 'Dry clean only' },
  { name: 'Wool Suiting', gsm: 280, feel: 'Smooth, structured', stretch: 'None', uses: 'Blazers, trousers', care: 'Dry clean' },
  { name: 'Polyester Crepe', gsm: 120, feel: 'Lightweight, matte', stretch: 'Medium', uses: 'Dresses, linings', care: 'Machine wash' },
  { name: 'Hemp Cotton', gsm: 200, feel: 'Eco‑friendly, breathable', stretch: 'Minimal', uses: 'Casual wear, bags', care: 'Machine wash' },
  { name: 'Leather (Vegan)', gsm: 400, feel: 'Smooth, rigid', stretch: 'None', uses: 'Jackets, accessories', care: 'Wipe clean' },
];

// Printing methods
const printMethods = [
  { name: 'Screen Print', durability: 'High', detail: 'Good', cost: 'Medium', bestFor: 'Bold graphics, large runs' },
  { name: 'DTG (Direct to Garment)', durability: 'Medium', detail: 'Excellent', cost: 'Low for small runs', bestFor: 'Photographic, small batches' },
  { name: 'Embroidery', durability: 'Very High', detail: 'Low to medium', cost: 'High', bestFor: 'Logos, premium accents' },
  { name: 'Heat Transfer', durability: 'Medium', detail: 'Good', cost: 'Low', bestFor: 'Small orders, complex colours' },
  { name: 'Sublimation', durability: 'High', detail: 'Excellent', cost: 'Medium', bestFor: 'All‑over prints, polyester' },
];

// Tech pack template
const techPackTemplate = {
  id: null,
  name: '',
  garmentType: '',
  fabric: '',
  gsm: '',
  printMethod: '',
  embroideryDetails: '',
  measurements: {
    chest: '',
    length: '',
    sleeve: '',
  },
  threadColor: '',
  labels: '',
  packaging: '',
  notes: '',
};

export default function Fabric() {
  const [selectedGsm, setSelectedGsm] = useState(180);
  const [techPacks, setTechPacks] = useState([]);
  const [showTechPackModal, setShowTechPackModal] = useState(false);
  const [currentTechPack, setCurrentTechPack] = useState({ ...techPackTemplate, id: Date.now().toString() });
  const [editingPackId, setEditingPackId] = useState(null);
  const [showExportAlert, setShowExportAlert] = useState(false);

  // Load tech packs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('anios_techpacks');
    if (stored) setTechPacks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('anios_techpacks', JSON.stringify(techPacks));
  }, [techPacks]);

  const currentFabric = fabricLibrary.find(f => Math.abs(f.gsm - selectedGsm) < 30) || fabricLibrary[1];

  const saveTechPack = () => {
    if (!currentTechPack.name.trim()) return;
    if (editingPackId) {
      setTechPacks(techPacks.map(p => p.id === editingPackId ? currentTechPack : p));
    } else {
      setTechPacks([...techPacks, { ...currentTechPack, id: Date.now().toString() }]);
    }
    setShowTechPackModal(false);
    setCurrentTechPack({ ...techPackTemplate, id: Date.now().toString() });
    setEditingPackId(null);
  };

  const openEditPack = (pack) => {
    setEditingPackId(pack.id);
    setCurrentTechPack(pack);
    setShowTechPackModal(true);
  };

  const deleteTechPack = (id) => {
    setTechPacks(techPacks.filter(p => p.id !== id));
  };

  const exportTechPack = (pack) => {
    const dataStr = JSON.stringify(pack, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `techpack_${pack.name.replace(/\s/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportAlert(true);
    setTimeout(() => setShowExportAlert(false), 2000);
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
          Fabric Intelligence
        </span>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mt-4">
          Material Knowledge
        </h1>
        <p className="text-anios-muted text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Understand GSM, printing, embroidery, and create professional tech packs.
        </p>
      </motion.div>

      {/* Two‑column layout */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 mb-16">
        {/* Left: GSM Visualizer & Fabric Library */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-6 h-6 text-anios-indigo" />
              <h2 className="text-xl font-playfair font-bold">GSM Visualizer</h2>
            </div>
            <p className="text-sm text-anios-muted mb-4">Grams per square meter – weight & drape</p>
            <input
              type="range"
              min={50}
              max={500}
              step={5}
              value={selectedGsm}
              onChange={(e) => setSelectedGsm(parseInt(e.target.value))}
              className="w-full accent-anios-indigo"
            />
            <div className="flex justify-between text-xs text-anios-subtle mt-1">
              <span>Light (50) – Chiffon, Voile</span>
              <span>Heavy (500) – Upholstery, Denim</span>
            </div>
            <div className="mt-6 p-4 bg-black/40 rounded-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-mono">{selectedGsm} GSM</p>
                  <p className="text-sm text-anios-muted">{currentFabric.name} — {currentFabric.feel}</p>
                  <p className="text-xs text-anios-subtle mt-1">Stretch: {currentFabric.stretch}</p>
                  <p className="text-xs text-anios-subtle">Best for: {currentFabric.uses}</p>
                </div>
                <div
                  className="w-16 h-16 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, #${Math.floor(selectedGsm/2).toString(16)}3355, #${Math.floor(selectedGsm/3).toString(16)}2266)`,
                    boxShadow: selectedGsm > 300 ? '0 0 10px rgba(0,0,0,0.5)' : 'none',
                  }}
                />
              </div>
              <div className="mt-4 w-full h-8 rounded-md bg-gradient-to-b from-white/20 to-transparent" style={{
                background: `linear-gradient(to bottom, rgba(255,255,255,${Math.min(selectedGsm/300, 0.8)}), rgba(255,255,255,0.05))`,
                border: '1px solid rgba(255,255,255,0.2)'
              }} />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-6 h-6 text-anios-indigo" />
              <h2 className="text-xl font-playfair font-bold">Fabric Library</h2>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {fabricLibrary.map((fabric) => (
                <div key={fabric.name} className="flex justify-between items-center p-2 border-b border-white/10 text-sm">
                  <span>{fabric.name}</span>
                  <span className="text-anios-muted">{fabric.gsm} GSM</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Printing & Embroidery / Tech pack section */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Printer className="w-6 h-6 text-anios-indigo" />
              <h2 className="text-xl font-playfair font-bold">Printing & Embroidery</h2>
            </div>
            <div className="space-y-3">
              {printMethods.map(method => (
                <div key={method.name} className="border-b border-white/10 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{method.name}</span>
                    <span className="text-xs text-anios-subtle">{method.bestFor}</span>
                  </div>
                  <div className="flex gap-3 text-xs text-anios-muted mt-1">
                    <span>Durability: {method.durability}</span>
                    <span>Detail: {method.detail}</span>
                    <span>Cost: {method.cost}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-black/20 rounded-xl text-sm">
              <Scissors className="w-4 h-4 inline mr-2 text-anios-indigo" />
              Embroidery systems: Flat, 3D puff, chenille. Digitizing required.
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-anios-indigo" />
                <h2 className="text-xl font-playfair font-bold">Tech Packs</h2>
              </div>
              <button
                onClick={() => {
                  setEditingPackId(null);
                  setCurrentTechPack({ ...techPackTemplate, id: Date.now().toString() });
                  setShowTechPackModal(true);
                }}
                className="px-3 py-1 rounded-xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> New
              </button>
            </div>
            {techPacks.length === 0 ? (
              <p className="text-center text-anios-muted text-sm py-6">No tech packs yet. Create your first.</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {techPacks.map(pack => (
                  <div key={pack.id} className="flex justify-between items-center p-2 border border-white/10 rounded-xl">
                    <div>
                      <p className="font-medium">{pack.name || 'Unnamed'}</p>
                      <p className="text-xs text-anios-muted">{pack.fabric} · {pack.gsm} GSM</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditPack(pack)} className="text-anios-muted hover:text-white"><FileText className="w-4 h-4" /></button>
                      <button onClick={() => exportTechPack(pack)} className="text-anios-muted hover:text-anios-indigo"><Download className="w-4 h-4" /></button>
                      <button onClick={() => deleteTechPack(pack.id)} className="text-anios-muted hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Knowledge base cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
        <div className="glass-card p-5">
          <Leaf className="w-6 h-6 text-anios-indigo mb-2" />
          <h3 className="font-playfair font-bold">Sustainability</h3>
          <p className="text-xs text-anios-muted mt-2">Organic cotton, recycled polyester, hemp. Low‑impact dyes reduce water usage.</p>
        </div>
        <div className="glass-card p-5">
          <Thermometer className="w-6 h-6 text-anios-indigo mb-2" />
          <h3 className="font-playfair font-bold">Care Instructions</h3>
          <p className="text-xs text-anios-muted mt-2">Always test a swatch. Cold wash extends life. Air dry for natural fibres.</p>
        </div>
        <div className="glass-card p-5">
          <Droplet className="w-6 h-6 text-anios-indigo mb-2" />
          <h3 className="font-playfair font-bold">Shrinkage</h3>
          <p className="text-xs text-anios-muted mt-2">Pre‑wash fabrics before cutting. Cotton shrinks 3‑5%, wool up to 10%.</p>
        </div>
      </div>

      {/* Tech Pack Modal */}
      <AnimatePresence>
        {showTechPackModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowTechPackModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-2xl w-full max-h-[85vh] overflow-y-auto glass-card p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-playfair font-bold">{editingPackId ? 'Edit Tech Pack' : 'New Tech Pack'}</h2>
                <button onClick={() => setShowTechPackModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-mono text-anios-muted">Project Name</label>
                  <input type="text" value={currentTechPack.name} onChange={(e) => setCurrentTechPack({...currentTechPack, name: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-mono text-anios-muted">Garment Type</label>
                    <input type="text" value={currentTechPack.garmentType} onChange={(e) => setCurrentTechPack({...currentTechPack, garmentType: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-mono text-anios-muted">Fabric</label>
                    <select value={currentTechPack.fabric} onChange={(e) => setCurrentTechPack({...currentTechPack, fabric: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm">
                      <option value="">Select</option>
                      {fabricLibrary.map(f => <option key={f.name}>{f.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-mono text-anios-muted">GSM</label>
                    <input type="text" value={currentTechPack.gsm} onChange={(e) => setCurrentTechPack({...currentTechPack, gsm: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-mono text-anios-muted">Print Method</label>
                    <select value={currentTechPack.printMethod} onChange={(e) => setCurrentTechPack({...currentTechPack, printMethod: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm">
                      <option value="">Select</option>
                      {printMethods.map(p => <option key={p.name}>{p.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-mono text-anios-muted">Embroidery Details</label>
                  <input type="text" value={currentTechPack.embroideryDetails} onChange={(e) => setCurrentTechPack({...currentTechPack, embroideryDetails: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm" placeholder="Thread type, stitch count, placement" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div><label className="text-xs text-anios-muted">Chest (cm)</label><input type="text" value={currentTechPack.measurements.chest} onChange={(e) => setCurrentTechPack({...currentTechPack, measurements: {...currentTechPack.measurements, chest: e.target.value}})} className="w-full bg-black/30 rounded-lg px-2 py-1 text-sm" /></div>
                  <div><label className="text-xs text-anios-muted">Length (cm)</label><input type="text" value={currentTechPack.measurements.length} onChange={(e) => setCurrentTechPack({...currentTechPack, measurements: {...currentTechPack.measurements, length: e.target.value}})} className="w-full bg-black/30 rounded-lg px-2 py-1 text-sm" /></div>
                  <div><label className="text-xs text-anios-muted">Sleeve (cm)</label><input type="text" value={currentTechPack.measurements.sleeve} onChange={(e) => setCurrentTechPack({...currentTechPack, measurements: {...currentTechPack.measurements, sleeve: e.target.value}})} className="w-full bg-black/30 rounded-lg px-2 py-1 text-sm" /></div>
                </div>
                <div>
                  <label className="text-sm font-mono text-anios-muted">Notes</label>
                  <textarea rows={3} value={currentTechPack.notes} onChange={(e) => setCurrentTechPack({...currentTechPack, notes: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm" />
                </div>
                <button onClick={saveTechPack} className="w-full py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Save Tech Pack
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export alert */}
      <AnimatePresence>
        {showExportAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 glass-card p-3 text-sm flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Tech pack exported as JSON
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer wisdom */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="glass-card p-5 text-center">
          <p className="text-xs text-anios-muted font-mono">“Know your materials – the fabric dictates the form.”</p>
        </div>
      </div>
    </section>
  );
}