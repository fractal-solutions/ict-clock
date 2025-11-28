import { RevolvingMenu } from '@/components/revolving-menu';
import { killzonesData } from '@/lib/trading-data';
import { useTime } from '@/contexts/time-context';

export function KillzonesPanel() {
  const { timezone } = useTime();

  return (
    <RevolvingMenu 
      items={killzonesData} 
      color="orange" 
      timezone={timezone}
      title="KILLZONES"
    />
  );
}
