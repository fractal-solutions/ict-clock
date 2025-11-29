import { useEffect, useState } from 'react';
import { useTime } from '@/contexts/time-context';
import { formatTimeWithSeconds } from '@/lib/time-utils';

export function DigitalClockDisplay() {
  const { currentTime, estTime, timezone } = useTime();
  const [localTimeString, setLocalTimeString] = useState('');
  const [estTimeString, setEstTimeString] = useState('');

  useEffect(() => {
    setLocalTimeString(formatTimeWithSeconds(currentTime, timezone));
    setEstTimeString(formatTimeWithSeconds(estTime, 'America/New_York'));
  }, [currentTime, estTime, timezone]);

  return (
    <div className="bg-gray-900/70 rounded-lg p-4 shadow-inner shadow-black/50 border border-white/10 h-full flex flex-col justify-center">
      <div className="text-center">
        <p className="font-digital text-3xl md:text-2xl lg:text-4xl text-cyan-300/90 tabular-nums whitespace-nowrap" style={{ textShadow: '0 0 5px rgba(100, 255, 255, 0.4)' }}>
          {estTimeString}
        </p>
        <p className="text-sm text-cyan-300/50 -mt-1">Market Time (EST/EDT)</p>
      </div>
      <div className="text-center mt-2">
        <p className="font-digital text-lg md:text-base lg:text-xl text-cyan-300/70 tabular-nums whitespace-nowrap" style={{ textShadow: '0 0 5px rgba(100, 255, 255, 0.4)' }}>
          {localTimeString}
        </p>
        <p className="text-xs text-cyan-300/40">{timezone}</p>
      </div>
    </div>
  );
}
