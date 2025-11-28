import { useState, useEffect } from 'react';
import { useTime } from '@/contexts/time-context';
import { CircularProgress } from '@/components/ui/circular-progress';

export function TimeProgressBar() {
  const { estTime } = useTime();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const calculateDayProgress = () => {
      const now = new Date(estTime);
      const tradingStart = 9 * 3600 + 30 * 60; // 9:30 AM in seconds
      const tradingEnd = 16 * 3600; // 4:00 PM in seconds
      const tradingDuration = tradingEnd - tradingStart;
      
      const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      
      let percentage = 0;
      if (currentSeconds >= tradingStart && currentSeconds <= tradingEnd) {
        percentage = ((currentSeconds - tradingStart) / tradingDuration) * 100;
      } else if (currentSeconds > tradingEnd) {
        percentage = 100;
      }
      setProgress(percentage);
    };
    
    calculateDayProgress();
    const interval = setInterval(calculateDayProgress, 1000);
    
    return () => clearInterval(interval);
  }, [estTime]);
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative">
        <CircularProgress value={progress} strokeWidth={6} className="w-32 h-32 text-cyan-300/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-digital text-4xl text-cyan-300/90" style={{ textShadow: '0 0 5px rgba(100, 255, 255, 0.4)' }}>
            {Math.round(progress)}%
          </span>
          <span className="text-xs text-cyan-300/50 -mt-1">Day Complete</span>
        </div>
      </div>
    </div>
  );
}
