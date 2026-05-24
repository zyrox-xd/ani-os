// src/components/BottomNav.jsx
import { NavLink } from 'react-router-dom';
import {
  Home,
  User,
  Eye,
  FlaskConical,
  Layers,
  Ruler,
  Shield,
  Brain,
  Archive,
  Settings,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/identity', label: 'Identity', icon: User },
  { path: '/typography', label: 'Typography', icon: Eye },
  { path: '/reconstruction', label: 'Missions', icon: FlaskConical },
  { path: '/workspace', label: 'Studio', icon: Layers },
  { path: '/fabric', label: 'Fabric', icon: Ruler },
  { path: '/ghost', label: 'Ghost', icon: Shield },
  { path: '/psychology', label: 'Mind', icon: Brain },
  { path: '/archive', label: 'Archive', icon: Archive },
  { path: '/settings', label: 'Data', icon: Settings },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/40 backdrop-blur-2xl">
      {/* Mobile: scrollable, Desktop: centered */}
      <div className="overflow-x-auto md:overflow-visible no-scrollbar">
        <div className="flex items-center gap-4 px-4 py-3 min-w-max md:min-w-0 md:justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 transition-colors duration-300 ${
                    isActive ? 'text-anios-indigo' : 'text-anios-subtle hover:text-anios-indigo'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-mono uppercase tracking-wider">
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}