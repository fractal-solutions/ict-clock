import { RevolvingMenu } from '@/components/revolving-menu';
import { macrosData } from '@/lib/trading-data';
import { useTime } from '@/contexts/time-context';

export function MacrosPanel() {
  const { timezone } = useTime();

  return (
    <RevolvingMenu 
      items={macrosData} 
      color="green" 
      timezone={timezone}
      title="MACRO TIMINGS"
    />
  );
}
