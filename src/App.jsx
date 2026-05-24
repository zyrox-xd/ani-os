// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import BottomNav from './components/BottomNav';
import AudioPlayer from './components/AudioPlayer';

// Import all pages (already done)
import Landing from './sections/Landing';
import Identity from './sections/Identity';
import TypographyLab from './sections/TypographyLab';
import Reconstruction from './sections/Reconstruction';
import Workspace from './sections/Workspace';
import Fabric from './sections/Fabric';           // ← add
import GhostMode from './sections/GhostMode';     // ← add
import Psychology from './sections/Psychology';   // ← add
import Archive from './sections/Archive';
import Settings from './sections/Settings';


export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/identity" element={<Identity />} />
        <Route path="/typography" element={<TypographyLab />} />
        <Route path="/reconstruction" element={<Reconstruction />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/fabric" element={<Fabric />} />
        <Route path="/ghost" element={<GhostMode />} />
        <Route path="/psychology" element={<Psychology />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
      <AudioPlayer />
    </div>
  );
}