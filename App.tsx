
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ServerList } from './components/ServerList';
import { RemoteExecute } from './components/RemoteExecute';
import { View } from './types';
import { Bell, Search, User, Menu, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>('health');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'health': return <Dashboard />;
      case 'servers': return <ServerList />;
      case 'execute': return <RemoteExecute />;
      default: return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'health': return 'System Health Metrics';
      case 'servers': return 'Managed Infrastructure';
      case 'execute': return 'Remote Command Execution';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar currentView={currentView} setView={setView} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-auto bg-slate-50/50">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-4">
             <button className="lg:hidden p-2 hover:bg-slate-100 rounded-md">
                <Menu className="w-5 h-5" />
             </button>
             <h2 className="text-lg font-bold text-slate-800">{getTitle()}</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none text-xs focus:outline-none w-48 text-slate-600"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white" />
              </button>
              <div className="h-6 w-px bg-slate-200" />
              <button className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                   <img src="https://picsum.photos/seed/user/100/100" className="w-full h-full object-cover" />
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              </button>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>

        <footer className="mt-auto px-8 py-6 border-t border-slate-200 text-center">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">
            CloudOps Pro v2.4.12 • Enterprise Edition • Powered by Gemini Engine
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
