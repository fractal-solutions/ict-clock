import { useEffect, useState } from 'react';
import { useTime } from '@/contexts/time-context';
import { 
  getTimeWindowStatus,
  formatTimeWithSeconds,
} from '@/lib/time-utils';
import { sessionsData, killzonesData, macrosData } from '@/lib/trading-data';

interface TimeWindowItem {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isSpecialEvent?: boolean;
}

interface StatusIndicatorProps {
  label: string;
  color: 'blue' | 'orange' | 'green' | 'red';
  data: TimeWindowItem[];
  animation: string;
}

const StatusIndicator = ({ label, color, data, animation }: StatusIndicatorProps) => {
  const { estTime } = useTime();
  const [activeItem, setActiveItem] = useState<TimeWindowItem | null>(null);

  useEffect(() => {
    const item = data.find(item => getTimeWindowStatus(estTime, item.startTime, item.endTime) === 'active');
    setActiveItem(item || null);
  }, [estTime, data]);

  const colorClasses: Record<'blue' | 'orange' | 'green' | 'red', string> = {
    blue: 'bg-blue-500 shadow-[0_0_8px_rgba(30,144,255,0.7)]',
    orange: 'bg-orange-500 shadow-[0_0_8px_rgba(255,165,0,0.7)]',
    green: 'bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.7)]',
    red: 'bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.7)]',
  };
  
  const itemColor = activeItem?.isSpecialEvent ? 'red' : color;
  const animationClass = activeItem ? animation : '';

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeItem ? `${colorClasses[itemColor]} ${animationClass}` : 'bg-gray-600/50'}`} />
        <span className="text-sm font-semibold text-foreground/60">{label}</span>
      </div>
      <div className="bg-black/30 rounded-md px-3 py-1 w-32 lg:w-48 text-center shadow-inner shadow-black/50">
        <p className="font-digital text-lg text-cyan-300/80 truncate tabular-nums" style={{ textShadow: '0 0 3px rgba(100, 255, 255, 0.3)' }}>
          {activeItem ? activeItem.name : 'INACTIVE'}
        </p>
      </div>
    </div>
  );
};

export function TimeOverview() {
  const { currentTime, estTime, timezone } = useTime();
  const [localTimeString, setLocalTimeString] = useState('');
  const [estTimeString, setEstTimeString] = useState('');

  useEffect(() => {
    setLocalTimeString(formatTimeWithSeconds(currentTime, timezone));
    setEstTimeString(formatTimeWithSeconds(estTime, 'America/New_York'));
  }, [currentTime, estTime, timezone]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      {/* Digital Clock */}
      <div className="md:col-span-1 bg-gray-900/70 rounded-lg p-4 shadow-inner shadow-black/50 border border-white/10">
        <div className="text-center">
          <p className="font-digital text-5xl text-cyan-300/90 tabular-nums" style={{ textShadow: '0 0 5px rgba(100, 255, 255, 0.4)' }}>
            {estTimeString}
          </p>
          <p className="text-sm text-cyan-300/50 -mt-1">Market Time (EST/EDT)</p>
        </div>
        <div className="text-center mt-2">
          <p className="font-digital text-2xl text-cyan-300/70 tabular-nums" style={{ textShadow: '0 0 5px rgba(100, 255, 255, 0.4)' }}>
            {localTimeString}
          </p>
          <p className="text-xs text-cyan-300/40">{timezone}</p>
        </div>
      </div>
      
      {/* Status Indicators */}
      <div className="md:col-span-2 bg-gray-900/70 rounded-lg p-4 shadow-inner shadow-black/50 border border-white/10 h-full">
        <div className="flex flex-col justify-center h-full space-y-3">
          <StatusIndicator label="Session" color="blue" data={sessionsData} animation="" />
          <StatusIndicator label="Killzone" color="orange" data={killzonesData} animation="animate-pulse-slow" />
          <StatusIndicator label="Macro" color="green" data={macrosData} animation="animate-pulse-fast" />
        </div>
      </div>
    </div>
  );
}
