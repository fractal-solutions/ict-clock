import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { TimeWindow } from '@/components/time-window';
import { useTime } from '@/contexts/time-context';
import { getTimeWindowStatus } from '@/lib/time-utils';
import { cn } from '@/lib/utils';

interface TimeWindowItem {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
  relatedSession?: string;
  isSpecialEvent?: boolean;
  macroNumber?: number;
}

interface RevolvingMenuProps {
  items: TimeWindowItem[];
  color: 'blue' | 'orange' | 'green' | 'red';
  timezone: string;
  title: string;
}

export function RevolvingMenu({ items, color, timezone, title }: RevolvingMenuProps) {
  const { estTime } = useTime();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [spacerWidth, setSpacerWidth] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isManuallyControlled = useRef(false);

  const activeItemIndex = items.findIndex((item) => getTimeWindowStatus(estTime, item.startTime, item.endTime) === 'active');

  // Effect to auto-select the active item
  useEffect(() => {
    if (activeItemIndex !== -1 && !isManuallyControlled.current) {
      setSelectedIndex(activeItemIndex);
    }
  }, [activeItemIndex]);

  // Effect to calculate spacer width for centering
  useLayoutEffect(() => {
    const calculateSpacer = () => {
      if (scrollContainerRef.current && itemRefs.current[0]) {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const itemWidth = itemRefs.current[0].offsetWidth;
        setSpacerWidth((containerWidth - itemWidth) / 2);
      }
    };
    calculateSpacer();
    window.addEventListener('resize', calculateSpacer);
    return () => window.removeEventListener('resize', calculateSpacer);
  }, [items]);

  // Effect to scroll the selected item into the center
  useEffect(() => {
    if (scrollContainerRef.current && itemRefs.current[selectedIndex]) {
      const container = scrollContainerRef.current;
      const item = itemRefs.current[selectedIndex];
      if (item) {
        const scrollLeft = item.offsetLeft - spacerWidth;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedIndex, spacerWidth]);

  const handleInteraction = () => {
    isManuallyControlled.current = true;
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      isManuallyControlled.current = false;
    }, 3000); // 3-second timeout before auto-snapping resumes
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    handleInteraction();
  };

  return (
    <div className="bg-black/10 rounded-lg shadow-inner shadow-black/50 transition-all duration-300 hover:shadow-cyan-800/20 border border-white/5">
      <div className="px-4 py-2 border-b border-border/20">
        <h3 className="font-semibold text-lg text-foreground/80 tracking-wider">{title}</h3>
      </div>
      <div 
        ref={scrollContainerRef}
        className="relative flex items-center overflow-x-auto py-4 no-scrollbar"
        onScroll={handleInteraction}
        onTouchStart={handleInteraction}
      >
        <div style={{ flex: `0 0 ${spacerWidth}px` }} />
        {items.map((item, index) => {
          const status = getTimeWindowStatus(estTime, item.startTime, item.endTime);
          const isSelected = index === selectedIndex;
          const isNeighbor = Math.abs(index - selectedIndex) === 1;

          return (
            <div
              key={item.id}
              ref={el => itemRefs.current[index] = el}
              className={cn(
                'flex-shrink-0 w-[calc(100%-1rem)] lg:w-80 transition-all duration-300 mx-2',
                {
                  'scale-100': isSelected,
                  'scale-90 opacity-60': !isSelected,
                  'blur-sm opacity-40': !isSelected && !isNeighbor,
                }
              )}
              onClick={() => handleSelect(index)}
            >
              <TimeWindow
                name={item.name}
                startTime={item.startTime}
                endTime={item.endTime}
                status={status}
                color={item.isSpecialEvent ? 'red' : color}
                timezone={timezone}
                description={item.description}
                isSpecialEvent={item.isSpecialEvent}
                macroNumber={item.macroNumber}
              />
            </div>
          );
        })}
        <div style={{ flex: `0 0 ${spacerWidth}px` }} />
      </div>
    </div>
  );
}

