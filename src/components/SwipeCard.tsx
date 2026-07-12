import { motion, useMotionValue, useTransform } from 'motion/react';
import { Question } from '../types';

interface SwipeCardProps {
  card: Question;
  index: number;
  active: boolean;
  onSwipe: (dir: 'left' | 'right') => void;
}

export function SwipeCard({ card, index, active, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);

  const handleDragEnd = (e: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{
        x: active ? x : 0,
        rotate: active ? rotate : 0,
        zIndex: 100 - index
      }}
      initial={{ scale: 0.95, y: 30, opacity: 0 }}
      animate={{
        scale: active ? 1 : Math.max(0.85, 1 - index * 0.05),
        y: active ? 0 : index * 15,
        opacity: index > 2 ? 0 : 1
      }}
      exit={(leaveDir: 'left' | 'right' | undefined) => {
        const dir = leaveDir || 'right';
        return {
          x: dir === 'left' ? -300 : 300,
          y: 50,
          rotate: dir === 'left' ? -20 : 20,
          opacity: 0,
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute inset-0 w-full h-full bg-surface rounded-[24px] flex flex-col items-center justify-between py-10 px-8 sm:py-12 sm:px-10 origin-bottom shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 cursor-grab active:cursor-grabbing text-center"
    >
      {/* Top Level indicator */}
      <div className="w-full text-center flex flex-col items-center justify-center gap-2 select-none shrink-0">
        <span className="text-[10px] sm:text-xs uppercase font-sans font-extrabold tracking-[0.2em] text-brand-blue">
          Phase {card.level}
        </span>
        <span className="text-[9px] sm:text-[10px] uppercase font-sans font-medium tracking-widest text-gray-400">
          {card.levelName}
        </span>
      </div>

      {/* Question Text - Editorial Serif */}
      <h2 className="text-3xl sm:text-[40px] font-serif text-gray-900 tracking-tight leading-snug w-full select-none pointer-events-none mb-auto mt-auto flex items-center justify-center py-6">
        {card.text}
      </h2>

      {/* Footer branding */}
      <div className="w-full text-center select-none shrink-0">
        <span className="text-[9px] sm:text-[10px] uppercase font-sans font-bold tracking-[0.25em] text-gray-300">
          Between Us
        </span>
      </div>
    </motion.div>
  );
}
