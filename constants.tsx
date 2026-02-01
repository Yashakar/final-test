
import React from 'react';
import { Server, UserSession } from './types';
import { LayoutDashboard, Server as ServerIcon, Terminal, Settings, Bell, Search, User, Activity } from 'lucide-react';

export const MOCK_SESSION: UserSession = {
  user: {
    id: 'user-123',
    name: 'Senior Dev',
    email: 'dev@enterprise.io',
    tenantId: 'tenant-alpha'
  },
  expires: new Date(Date.now() + 3600000).toISOString()
};

export const DUMMY_SERVERS: Server[] = [
  {
    id: 'srv-1',
    name: 'prod-api-01',
    ip: '192.168.1.10',
    status: 'online',
    tenantId: 'tenant-alpha',
    region: 'us-east-1',
    cpuUsage: 12,
    memUsage: 45,
    uptime: '15d 4h 22m'
  },
  {
    id: 'srv-2',
    name: 'prod-db-master',
    ip: '192.168.1.11',
    status: 'online',
    tenantId: 'tenant-alpha',
    region: 'us-east-1',
    cpuUsage: 8,
    memUsage: 78,
    uptime: '42d 1h 0m'
  },
  {
    id: 'srv-3',
    name: 'stg-web-01',
    ip: '10.0.0.5',
    status: 'warning',
    tenantId: 'tenant-alpha',
    region: 'us-west-2',
    cpuUsage: 89,
    memUsage: 92,
    uptime: '2d 12h 5m'
  },
  {
    id: 'srv-4',
    name: 'external-client-srv',
    ip: '172.16.0.4',
    status: 'online',
    tenantId: 'tenant-beta', // Should be hidden from Alpha tenant
    region: 'eu-central-1',
    cpuUsage: 5,
    memUsage: 20,
    uptime: '100d+'
  },
];

export const NAV_ITEMS = [
  { id: 'health', label: 'System Health', icon: LayoutDashboard },
  { id: 'servers', label: 'Managed Servers', icon: ServerIcon },
  { id: 'execute', label: 'Remote Execute', icon: Terminal },
] as const;
