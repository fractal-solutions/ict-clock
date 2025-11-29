import { SessionsPanel } from '@/components/sessions-panel';
import { KillzonesPanel } from '@/components/killzones-panel';
import { MacrosPanel } from '@/components/macros-panel';
import { DigitalClockDisplay } from '@/components/digital-clock-display';
import { StatusIndicatorsDisplay } from '@/components/status-indicators-display';
import { TimeProgressBar } from '@/components/time-progress-bar';

export function TradingDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DigitalClockDisplay />
        <StatusIndicatorsDisplay />
        <div className="bg-gray-900/70 rounded-lg p-4 shadow-inner shadow-black/50 border border-white/10">
          <TimeProgressBar />
        </div>
      </div>
      
      {/* Desktop View: Show all panels */}
      <div className="hidden lg:block space-y-6">
        <SessionsPanel />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <KillzonesPanel />
          <MacrosPanel />
        </div>
      </div>
    </div>
  );
}
