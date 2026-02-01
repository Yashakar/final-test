
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">CloudOps Pro</h1>
        </div>
        
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === item.id
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 py-3 bg-slate-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
            SD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold truncate">Senior Developer</p>
            <p className="text-[10px] text-slate-500 truncate">tenant-alpha</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
