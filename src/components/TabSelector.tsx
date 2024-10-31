import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Tab } from '../types';

interface TabOption {
  id: Tab;
  label: string;
  icon: LucideIcon;
}

interface TabSelectorProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  tabs: TabOption[];
}

export function TabSelector({ activeTab, onTabChange, tabs }: TabSelectorProps) {
  return (
    <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
              ${activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}