
export interface Server {
  id: string;
  name: string;
  ip: string;
  status: 'online' | 'offline' | 'warning';
  tenantId: string;
  region: string;
  cpuUsage: number;
  memUsage: number;
  uptime: string;
}

export interface UserSession {
  user: {
    id: string;
    name: string;
    email: string;
    tenantId: string;
  };
  expires: string;
}

export type View = 'health' | 'servers' | 'execute';

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'command' | 'success';
}
