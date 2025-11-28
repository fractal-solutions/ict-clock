import { RevolvingMenu } from '@/components/revolving-menu';
import { sessionsData } from '@/lib/trading-data';
import { useTime } from '@/contexts/time-context';

export function SessionsPanel() {
  const { timezone } = useTime();

  return (
    <RevolvingMenu 
      items={sessionsData} 
      color="blue" 
      timezone={timezone}
      title="TRADING SESSIONS"
    />
  );
}
