'use client';

import { useState } from 'react';

interface TabsProps {
  tabs?: string[];
  activeTab?: number;
  isPreview?: boolean;
}

export default function TabsComponent({ 
  tabs = ['Tab 1', 'Tab 2', 'Tab 3'],
  activeTab = 0,
  isPreview = false
}: TabsProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  return (
    <div className={isPreview ? '' : 'pointer-events-none'}>
      <div className="flex border-b border-[#2a2a2a]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={isPreview ? () => setCurrentTab(index) : undefined}
            className={`
              px-4 py-2 text-sm font-medium transition-colors
              ${index === (isPreview ? currentTab : activeTab)
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-300'
              }
              ${isPreview ? 'cursor-pointer' : ''}
            `}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 bg-[#1a1a1a] min-h-[100px]">
        <p className="text-gray-400 text-sm">Content for {tabs[isPreview ? currentTab : activeTab]}</p>
      </div>
    </div>
  );
}
