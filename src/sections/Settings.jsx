// src/sections/Settings.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Trash2, AlertCircle, CheckCircle, Database } from 'lucide-react';

export default function Settings() {
  const [importStatus, setImportStatus] = useState(null);
  const [exportStatus, setExportStatus] = useState(null);

  // List of all localStorage keys used by ANI.OS
  const storageKeys = [
    'anios_moodboard',
    'anios_notes',
    'anios_links',
    'anios_completed_missions',
    'anios_mission_data',
    'anios_techpacks',
    'anios_ghost_scripts',
    'anios_psych_entries',
    'anios_last_mood',
    'anios_future_archive',
  ];

  // Export all data as JSON file
  const exportAllData = () => {
    const allData = {};
    storageKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) allData[key] = JSON.parse(value);
    });
    const dataStr = JSON.stringify(allData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anios_backup_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportStatus('success');
    setTimeout(() => setExportStatus(null), 3000);
  };

  // Import data from JSON file
  const importAllData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        let importedCount = 0;
        storageKeys.forEach(key => {
          if (imported[key] !== undefined) {
            localStorage.setItem(key, JSON.stringify(imported[key]));
            importedCount++;
          }
        });
        setImportStatus({ success: true, count: importedCount });
        setTimeout(() => {
          setImportStatus(null);
          window.location.reload(); // reload to show imported data
        }, 1500);
      } catch (err) {
        setImportStatus({ success: false, error: 'Invalid JSON file' });
        setTimeout(() => setImportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
    // reset file input
    event.target.value = '';
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('⚠️ This will permanently delete ALL your saved data (moodboard, notes, scripts, journal, archive, etc.). This cannot be undone. Continue?')) {
      storageKeys.forEach(key => localStorage.removeItem(key));
      setImportStatus({ success: true, count: 0, clear: true });
      setTimeout(() => {
        setImportStatus(null);
        window.location.reload();
      }, 1500);
    }
  };

  // Calculate total storage usage (approximate)
  const getStorageSize = () => {
    let total = 0;
    storageKeys.forEach(key => {
      const val = localStorage.getItem(key);
      if (val) total += val.length;
    });
    return (total / 1024).toFixed(2); // KB
  };

  return (
    <section className="py-20 px-6 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-anios-indigo/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-anios-indigo">
          Settings
        </span>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mt-4">
          Your Data
        </h1>
        <p className="text-anios-muted text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Export, import, or clear your creative archive. Data stays on your device unless you export it.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Storage info */}
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-anios-indigo" />
            <span className="text-sm">Local storage used</span>
          </div>
          <span className="text-sm font-mono text-anios-muted">{getStorageSize()} KB</span>
        </div>

        {/* Export */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-6 h-6 text-anios-indigo" />
            <h2 className="text-xl font-playfair font-bold">Export all data</h2>
          </div>
          <p className="text-sm text-anios-muted mb-4">
            Save a backup of all your moodboards, notes, scripts, journal entries, tech packs, and archive.
          </p>
          <button
            onClick={exportAllData}
            className="px-5 py-2 rounded-2xl bg-anios-indigo/20 border border-anios-indigo/50 text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download JSON backup
          </button>
          {exportStatus === 'success' && (
            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Export complete</p>
          )}
        </div>

        {/* Import */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-6 h-6 text-anios-indigo" />
            <h2 className="text-xl font-playfair font-bold">Import from backup</h2>
          </div>
          <p className="text-sm text-anios-muted mb-4">
            Restore a previously exported JSON file. This will overwrite current data.
          </p>
          <label className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm flex items-center gap-2 cursor-pointer hover:bg-white/10 transition">
            <Upload className="w-4 h-4" /> Choose backup file
            <input type="file" accept=".json" onChange={importAllData} className="hidden" />
          </label>
          {importStatus && (
            <div className={`text-xs mt-2 flex items-center gap-1 ${importStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
              {importStatus.success ? (
                importStatus.clear ? (
                  <><CheckCircle className="w-3 h-3" /> All data cleared</>
                ) : (
                  <><CheckCircle className="w-3 h-3" /> Imported {importStatus.count} items. Reloading...</>
                )
              ) : (
                <><AlertCircle className="w-3 h-3" /> {importStatus.error}</>
              )}
            </div>
          )}
        </div>

        {/* Danger zone */}
        <div className="glass-card p-6 border-rose-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl font-playfair font-bold text-rose-300">Clear all data</h2>
          </div>
          <p className="text-sm text-anios-muted mb-4">
            Permanently delete EVERYTHING: moodboards, notes, scripts, journal, tech packs, archive. This cannot be undone.
          </p>
          <button
            onClick={clearAllData}
            className="px-5 py-2 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-sm text-rose-300 flex items-center gap-2 hover:bg-rose-500/30 transition"
          >
            <Trash2 className="w-4 h-4" /> Clear all user data
          </button>
        </div>
      </div>

      {/* Footer note */}
      <div className="max-w-2xl mx-auto mt-12 text-center text-xs text-anios-subtle">
        All data is stored locally in your browser. No information is sent to any server.
      </div>
    </section>
  );
}