import React from 'react';
import { Settings } from 'lucide-react';
import { SpeechSettings } from '../types';

interface VoiceSettingsProps {
  settings: SpeechSettings;
  onSettingChange: (setting: keyof SpeechSettings, value: number | boolean) => void;
}

export function VoiceSettings({ settings, onSettingChange }: VoiceSettingsProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700">Voice Settings</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Speed: {settings.rate}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.rate}
            onChange={(e) => onSettingChange('rate', parseFloat(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Pitch: {settings.pitch}
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.pitch}
            onChange={(e) => onSettingChange('pitch', parseFloat(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Volume: {settings.volume * 100}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.volume}
            onChange={(e) => onSettingChange('volume', parseFloat(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.autoScroll}
              onChange={(e) => onSettingChange('autoScroll', e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">Auto-scroll</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.autoNext}
              onChange={(e) => onSettingChange('autoNext', e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">Auto-next</span>
          </label>
        </div>
      </div>
    </div>
  );
}