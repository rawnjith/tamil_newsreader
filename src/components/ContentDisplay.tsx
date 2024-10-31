import React from 'react';
import { FileText } from 'lucide-react';

interface ContentDisplayProps {
  lines: string[];
  currentLineIndex: number;
  onLineClick: (index: number) => void;
}

export function ContentDisplay({ lines, currentLineIndex, onLineClick }: ContentDisplayProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700">Content</h2>
      </div>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {lines.map((line, index) => (
          <p
            key={index}
            id={`line-${index}`}
            onClick={() => onLineClick(index)}
            className={`p-2 rounded cursor-pointer transition-colors ${
              index === currentLineIndex
                ? 'bg-indigo-100 border-l-4 border-indigo-500'
                : 'hover:bg-gray-100'
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}