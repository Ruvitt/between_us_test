import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { X, Heart, RotateCcw } from 'lucide-react';
import { QUESTIONS } from './data';
import { SwipeCard } from './components/SwipeCard';

export default function App() {
  const [cards, setCards] = useState(QUESTIONS);
  const [leaveDir, setLeaveDir] = useState<'left' | 'right'>('right');

  const handleSwipe = (direction: 'left' | 'right') => {
    setLeaveDir(direction);
    setCards((prev) => prev.slice(1));
  };

  const handleRestart = () => {
    setCards(QUESTIONS);
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center p-4 sm:p-6 overflow-hidden bg-bg-warm selection:bg-brand-blue selection:text-white">
      {/* Logo Heading */}
      <div className="shrink-0 w-full text-center z-10 select-none pt-4 pb-2">
        <h1 className="text-xs sm:text-sm font-bold tracking-[0.3em] text-gray-400 leading-[1.3] uppercase">
          Between Us
        </h1>
      </div>

      {/* Cards Area */}
      <div className="relative flex-1 w-full max-w-[360px] sm:max-w-[400px] my-6">
        <AnimatePresence custom={leaveDir}>
          {cards.map((card, index) => {
            if (index > 2) return null;
            return (
              <SwipeCard
                key={card.id}
                card={card}
                index={index}
                active={index === 0}
                onSwipe={handleSwipe}
              />
            );
          })}
        </AnimatePresence>

        {/* Empty State */}
        {cards.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-900 text-center z-0 transition-opacity duration-1000 ease-in-out">
            <p className="text-xl md:text-2xl font-serif italic mb-8 px-4 leading-relaxed">
              There is nothing left to ask.
            </p>
            <button
              onClick={handleRestart}
              className="bg-brand-blue text-white px-8 py-3.5 rounded-full font-sans font-bold uppercase tracking-widest text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-brand-blue/20 hover:scale-105 active:scale-95 transition-all"
            >
              <RotateCcw size={18} strokeWidth={2.5} />
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      {cards.length > 0 && (
        <div className="shrink-0 flex gap-10 pb-8 sm:pb-12 pt-2 z-10 w-full max-w-[320px] justify-center">
          <button
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 rounded-full bg-white text-gray-400 flex items-center justify-center shadow-xl shadow-black/5 hover:scale-110 hover:text-gray-900 active:scale-95 transition-all outline-none border border-gray-100"
            aria-label="Pass"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 rounded-full bg-white text-brand-blue flex items-center justify-center shadow-xl shadow-brand-blue/15 hover:scale-110 active:scale-95 transition-all outline-none border border-brand-blue/10"
            aria-label="Deepen"
          >
            <Heart size={26} strokeWidth={2.5} fill="currentColor" />
          </button>
        </div>
      )}
    </div>
  );
}