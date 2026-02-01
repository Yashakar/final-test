
import React, { useMemo } from 'react';
import { DUMMY_SERVERS, MOCK_SESSION } from '../constants';
import { Circle, Globe, MoreVertical, Terminal } from 'lucide-react';

export const ServerList: React.FC = () => {
  // SIMULATED TENANT FILTERING (Prisma equivalent: findMany where tenantId = session.tenantId)
  const filteredServers = useMemo(() => {
    return DUMMY_SERVERS.filter(s => s.tenantId === MOCK_SESSION.user.tenantId);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-sm font-semibold text-slate-900">Servers for {MOCK_SESSION.user.tenantId}</h2>
        <button className="text-xs font-medium bg-white border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">
          Add Server
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-6 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-500">Status</th>
            <th className="px-6 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-500">Node Name</th>
            <th className="px-6 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-500">IP Address</th>
            <th className="px-6 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-500">Region</th>
            <th className="px-6 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-500">CPU/Mem</th>
            <th className="px-6 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredServers.map((server) => (
            <tr key={server.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Circle className={`w-2 h-2 fill-current ${
                    server.status === 'online' ? 'text-emerald-500' : 
                    server.status === 'warning' ? 'text-amber-500' : 'text-slate-300'
                  }`} />
                  <span className="text-xs font-medium capitalize">{server.status}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-slate-900">{server.name}</div>
                <div className="text-[10px] text-slate-500 font-mono uppercase">{server.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-600">
                {server.ip}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Globe className="w-3.5 h-3.5" />
                  {server.region}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1.5 w-24">
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>CPU</span>
                    <span>{server.cpuUsage}%</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${server.cpuUsage > 80 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                      style={{ width: `${server.cpuUsage}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                    <Terminal className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredServers.length === 0 && (
        <div className="p-12 text-center text-slate-400">
          No servers found for your account.
        </div>
      )}
    </div>
  );
};
