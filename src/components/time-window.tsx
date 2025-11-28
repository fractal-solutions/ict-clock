import { Clock, Info } from 'lucide-react';
import { CountdownTimer } from '@/components/countdown-timer';
import { formatTimeRange } from '@/lib/time-utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type TimeWindowStatus = 'active' | 'upcoming' | 'inactive';
type TimeWindowColor = 'blue' | 'orange' | 'green' | 'red';

interface TimeWindowProps {
  name: string;
  startTime: string;
  endTime: string;
  status: TimeWindowStatus;
  color: TimeWindowColor;
  timezone: string;
  description?: string;
  isSpecialEvent?: boolean;
  macroNumber?: number;
}

export function TimeWindow({
  name,
  startTime,
  endTime,
  status,
  color,
  timezone,
  description,
  isSpecialEvent,
  macroNumber,
}: TimeWindowProps) {
  
  const colorClasses = {
    blue: {
      base: 'border-blue-500/30',
      active: 'bg-blue-900/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),_0_0_10px_rgba(30,144,255,0.5)] border-blue-500/70',
      upcoming: 'hover:bg-blue-900/20',
      inactive: 'opacity-60 hover:opacity-80',
      led: 'bg-blue-500 shadow-[0_0_5px_rgba(30,144,255,0.8)]',
    },
    orange: {
      base: 'border-orange-500/30',
      active: 'bg-orange-900/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),_0_0_10px_rgba(255,165,0,0.5)] border-orange-500/70',
      upcoming: 'hover:bg-orange-900/20',
      inactive: 'opacity-60 hover:opacity-80',
      led: 'bg-orange-500 shadow-[0_0_5px_rgba(255,165,0,0.8)]',
    },
    green: {
      base: 'border-green-500/30',
      active: 'bg-green-900/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),_0_0_10px_rgba(0,255,0,0.5)] border-green-500/70',
      upcoming: 'hover:bg-green-900/20',
      inactive: 'opacity-60 hover:opacity-80',
      led: 'bg-green-500 shadow-[0_0_5px_rgba(0,255,0,0.8)]',
    },
    red: {
      base: 'border-red-500/30',
      active: 'bg-red-900/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),_0_0_10px_rgba(255,0,0,0.5)] border-red-500/70',
      upcoming: 'hover:bg-red-900/20',
      inactive: 'opacity-60 hover:opacity-80',
      led: 'bg-red-500 shadow-[0_0_5px_rgba(255,0,0,0.8)]',
    },
  };

  const timeRange = formatTimeRange(startTime, endTime, timezone);
  const currentColors = colorClasses[color];

  const content = (
    <div className={`rounded-lg p-4 transition-all duration-200 border ${currentColors.base} ${status === 'active' ? currentColors.active : status === 'upcoming' ? currentColors.upcoming : currentColors.inactive} bg-black/20`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-3 h-3 rounded-full transition-all duration-300">
            {status !== 'inactive' && <div className={`w-full h-full rounded-full ${status === 'active' ? 'animate-pulse' : ''} ${currentColors.led}`} />}
          </div>
          <div className="font-semibold text-foreground/90">
            {macroNumber && <span className="text-xs font-bold mr-1 opacity-70">#{macroNumber}</span>}
            {name}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isSpecialEvent && (
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_4px_rgba(255,0,0,0.7)]" />
          )}
          <div className="flex items-center text-sm text-muted-foreground font-digital">
            <Clock className="h-4 w-4 mr-1.5" />
            <span>{timeRange}</span>
          </div>
        </div>
      </div>
      
      {status !== 'inactive' && (
        <div className="mt-3 pl-6">
          <CountdownTimer
            startTime={startTime}
            endTime={endTime}
            status={status}
          />
        </div>
      )}
    </div>
  );

  if (!description) {
    return content;
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        {content}
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-gray-800/90 border-gray-700 text-sm text-gray-300 shadow-lg backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-cyan-400" />
          <p>{description}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
