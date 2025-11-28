import { useState, useEffect } from 'react';
import { useTime } from '@/contexts/time-context';
import { formatDuration } from '@/lib/time-utils';

interface CountdownTimerProps {
  startTime: string;
  endTime: string;
  status: 'active' | 'upcoming' | 'inactive';
}

export function CountdownTimer({ startTime, endTime, status }: CountdownTimerProps) {
  const { estTime } = useTime();
  const [timeText, setTimeText] = useState('');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date(estTime);
      
      const start = new Date(estTime);
      const [startHour, startMinute] = startTime.split(':').map(Number);
      start.setHours(startHour, startMinute, 0, 0);
      
      const end = new Date(estTime);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      end.setHours(endHour, endMinute, 0, 0);
      
      if (end < start) {
        if (now >= start) { // We are in the first day of an overnight session
          end.setDate(end.getDate() + 1);
        } else { // We are in the second day, before the session starts
          start.setDate(start.getDate() - 1);
        }
      }
      
      if (status === 'upcoming') {
        const timeUntilStart = start.getTime() - now.getTime();
        setTimeText(`STARTS IN: ${formatDuration(timeUntilStart)}`);
        setProgress(0);
      } else if (status === 'active') {
        const timeRemaining = end.getTime() - now.getTime();
        setTimeText(`ENDS IN: ${formatDuration(timeRemaining)}`);
        
        const totalSessionDuration = end.getTime() - start.getTime();
        const timePassed = now.getTime() - start.getTime();
        setProgress(Math.min(100, (timePassed / totalSessionDuration) * 100));
      }
    };
    
    if (status !== 'inactive') {
      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [estTime, startTime, endTime, status]);
  
  if (status === 'inactive') return null;
  
  return (
    <div className="space-y-2">
      <p className="font-digital text-lg text-cyan-300/70" style={{ textShadow: '0 0 2px rgba(100, 255, 255, 0.3)' }}>
        {timeText}
      </p>
      <div className="w-full bg-black/30 rounded-full h-2 shadow-inner shadow-black/50 border border-white/10">
        <div 
          className="bg-cyan-400/80 h-full rounded-full transition-all duration-1000" 
          style={{ width: `${progress}%`, boxShadow: '0 0 5px rgba(100, 255, 255, 0.5)' }}
        />
      </div>
    </div>
  );
}
