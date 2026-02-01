
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Video, CheckCircle, Copy, Code, ArrowRight } from 'lucide-react';
import { LogEntry } from '../types';
// Import MOCK_SESSION from constants
import { MOCK_SESSION } from '../constants';

export const RemoteExecute: React.FC = () => {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [artifactVisible, setArtifactVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleExecute = async () => {
    if (!command.trim() || isExecuting) return;

    setIsExecuting(true);
    setArtifactVisible(false);
    addLog(`Initiating SSH connection to prod-api-01...`, 'info');
    
    // Simulate node-ssh delay
    await new Promise(r => setTimeout(r, 1000));
    addLog(`Running command: ${command}`, 'command');

    await new Promise(r => setTimeout(r, 1500));
    
    if (command.toLowerCase() === 'whoami') {
      addLog(`root`, 'success');
    } else if (command.toLowerCase() === 'uptime') {
      addLog(`14:42:01 up 15 days, 4:22, 1 user, load average: 0.12, 0.08, 0.05`, 'success');
    } else {
      addLog(`Execution successful. Return code 0.`, 'success');
    }

    addLog(`Triggering Antigravity Browser Tool logging...`, 'info');
    await new Promise(r => setTimeout(r, 1000));
    addLog(`Recording Browser Artifact for Dev-Preview session...`, 'info');
    
    await new Promise(r => setTimeout(r, 800));
    setIsExecuting(false);
    setArtifactVisible(true);
    setCommand('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-slate-400" />
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Interactive Terminal</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
          </div>
          
          <div ref={scrollRef} className="p-4 h-[400px] overflow-y-auto font-mono text-sm space-y-1.5">
            {logs.length === 0 && (
              <div className="text-slate-500 italic opacity-50">Waiting for command...</div>
            )}
            {logs.map(log => (
              <div key={log.id} className="flex gap-3">
                <span className="text-slate-600 flex-shrink-0 select-none">[{log.timestamp}]</span>
                <span className={`
                  ${log.type === 'command' ? 'text-indigo-400 font-bold' : ''}
                  ${log.type === 'success' ? 'text-emerald-400' : ''}
                  ${log.type === 'error' ? 'text-rose-400' : ''}
                  ${log.type === 'info' ? 'text-slate-300' : ''}
                `}>
                  {log.type === 'command' && <span className="mr-2">$</span>}
                  {log.message}
                </span>
              </div>
            ))}
            {isExecuting && (
              <div className="flex gap-3 animate-pulse">
                <span className="text-slate-600 flex-shrink-0">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-indigo-400">... processing ...</span>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-800/30 border-t border-slate-800 flex gap-3">
            <input 
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
              placeholder="e.g. whoami, uptime, df -h"
              disabled={isExecuting}
              className="flex-1 bg-transparent border-none focus:ring-0 text-indigo-100 font-mono text-sm"
            />
            <button
              onClick={handleExecute}
              disabled={isExecuting || !command.trim()}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md text-xs font-bold transition-all flex items-center gap-2"
            >
              {isExecuting ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
              EXECUTE
            </button>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex gap-4">
          <div className="p-3 bg-white rounded-full text-indigo-600 flex-shrink-0">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-semibold text-indigo-900">Security Context</h5>
            <p className="text-xs text-indigo-700 mt-1">
              Commands are executed in an isolated container for tenant <strong>{MOCK_SESSION.user.tenantId}</strong>.
              All actions are logged and audited via the Browser Recording Artifact.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Video className="w-4 h-4 text-rose-500" />
          Artifact Gallery
        </h3>
        
        {artifactVisible ? (
          <div className="bg-white rounded-xl border-2 border-emerald-100 p-1 shadow-lg group">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
               <img src="https://picsum.photos/seed/server/800/450" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                 <CheckCircle className="w-10 h-10 text-emerald-400 mb-2 drop-shadow-md" />
                 <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">Execution Verified</p>
               </div>
               <div className="absolute top-2 left-2 bg-rose-600 px-2 py-0.5 rounded flex items-center gap-1.5 animate-pulse">
                 <div className="w-1.5 h-1.5 rounded-full bg-white" />
                 <span className="text-[10px] font-bold text-white uppercase">REC</span>
               </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Artifact #77421</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">PASSED</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800">Terminal Output Capture</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                Session recording of successful command execution and environmental check on dev-preview.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-slate-900 text-white text-[10px] font-bold py-2 rounded flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors">
                  <Play className="w-3 h-3" /> WATCH REPLAY
                </button>
                <button className="px-3 bg-slate-100 text-slate-600 text-[10px] font-bold rounded hover:bg-slate-200 transition-colors">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl h-[340px] flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-200 mb-4 shadow-sm">
              <Video className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-400">No artifacts recorded</p>
            <p className="text-xs text-slate-400 mt-2">
              Execute a command to generate an Antigravity Browser recording.
            </p>
          </div>
        )}

        <div className="bg-white p-4 rounded-xl border border-slate-200">
           <div className="flex items-center gap-2 mb-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500" />
             <span className="text-[11px] font-bold text-slate-600 uppercase">Deployment Ready</span>
           </div>
           <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">DATABASE_URL</span>
                <span className="text-emerald-600 font-mono font-bold">VERIFIED</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">NEXTAUTH_SECRET</span>
                <span className="text-emerald-600 font-mono font-bold">VERIFIED</span>
              </div>
              <button className="w-full mt-4 bg-white border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                VERCEL PRODUCTION BUILD <ArrowRight className="w-3 h-3" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
