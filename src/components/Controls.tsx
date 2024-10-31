import React from 'react';
import { Pause, Play, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isPaused: boolean;
}

export function Controls({
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onNext,
  onPrevious,
  isPaused,
}: ControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPrevious}
        className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-indigo-600" />
      </button>
      
      {isPlaying ? (
        <button
          onClick={onPause}
          className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
        >
          <Pause className="w-6 h-6 text-indigo-600" />
        </button>
      ) : (
        <button
          onClick={onPlay}
          className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
        >
          <Play className="w-6 h-6 text-indigo-600" />
        </button>
      )}
      
      <button
        onClick={onStop}
        className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
      >
        <RotateCcw className="w-6 h-6 text-red-600" />
      </button>
      
      <button
        onClick={onNext}
        className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-indigo-600" />
      </button>
    </div>
  );
}