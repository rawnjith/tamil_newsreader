import React from 'react';
import { Globe2 } from 'lucide-react';

interface URLInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onFetch: () => void;
  isLoading: boolean;
}

export function URLInput({ url, onUrlChange, onFetch, isLoading }: URLInputProps) {
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="flex gap-2 items-center mb-2">
        <Globe2 className="w-4 h-4 text-gray-600" />
        <label className="text-sm font-medium text-gray-600">Enter URL</label>
      </div>
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://example.com/tamil-content"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={onFetch}
          disabled={isLoading}
          className={`px-4 py-2 bg-indigo-600 text-white rounded-lg transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
          }`}
        >
          {isLoading ? 'Loading...' : 'Fetch'}
        </button>
      </div>
    </div>
  );
}