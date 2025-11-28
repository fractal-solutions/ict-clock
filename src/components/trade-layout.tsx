import { useState, useEffect } from 'react';
import { TradingDashboard } from '@/components/trading-dashboard';
import { useTime } from '@/contexts/time-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SessionsPanel } from '@/components/sessions-panel';
import { KillzonesPanel } from '@/components/killzones-panel';
import { MacrosPanel } from '@/components/macros-panel';

export default function TradeLayout() {
  const { timezone: contextTimezone, setTimezone } = useTime();
  const [timezone, setLocalTimezone] = useState(contextTimezone);

  useEffect(() => {
    setLocalTimezone(contextTimezone);
  }, [contextTimezone]);

  const handleTimezoneChange = (tz: string) => {
    setTimezone(tz);
    setLocalTimezone(tz);
  };
  const [view, setView] = useState<'all' | 'sessions' | 'killzones' | 'macros'>('all');

  useEffect(() => {
    document.title = 'Trading Schedule Dashboard';
  }, []);

  return (
      <div className="flex flex-col w-full">
        <main className="flex-1 w-full">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4">
            <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setView(v as any)}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="killzones">Killzones</TabsTrigger>
                <TabsTrigger value="macros">Macros</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {view === 'all' ? (
            <TradingDashboard />
          ) : (
            <div className="space-y-4">
              {view === 'sessions' && <SessionsPanel />}
              {view === 'killzones' && <KillzonesPanel />}
              {view === 'macros' && <MacrosPanel />}
            </div>
          )}
        </main>
      </div>
  );
}