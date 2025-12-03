'use client';

import { useState } from 'react';
import { Element } from '../../types';
import BasicProperties from './BasicProperties';
import AdvancedProperties from './AdvancedProperties';
import LayoutProperties from './LayoutProperties';
import PositionProperties from './PositionProperties';

interface PropertiesPanelProps {
  element: Element;
  onUpdate: (id: string, props: any) => void;
  onUpdateStyles: (id: string, styles: any) => void;
  onUpdatePosition?: (id: string, x: number, y: number) => void;
  onClose?: () => void;
}

type TabType = 'basic' | 'layout' | 'advanced';

export default function PropertiesPanel({ element, onUpdate, onUpdateStyles, onUpdatePosition, onClose }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const tabs = [
    { id: 'basic' as TabType, label: 'Basic', icon: '⚙️' },
    { id: 'layout' as TabType, label: 'Layout', icon: '📐' },
    { id: 'advanced' as TabType, label: 'Advanced', icon: '🎨' },
  ];

  const handlePositionUpdate = (x: number, y: number) => {
    if (onUpdatePosition) {
      onUpdatePosition(element.id, x, y);
    }
  };

  const handleSizeUpdate = (width?: number, height?: number) => {
    onUpdateStyles(element.id, { 
      width: width !== undefined ? width : element.width,
      height: height !== undefined ? height : element.height
    } as any);
  };

  return (
    <aside className="w-96 h-full flex flex-col bg-[#1a1a1a] border-l border-[#2a2a2a]">
      {/* Clean header */}
      <div className="p-4 border-b border-[#2a2a2a]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white mb-1">Properties</h2>
            <p className="text-xs text-gray-500 capitalize">{element.type.replace('-', ' ')}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#2a2a2a] rounded text-gray-400 hover:text-white transition-colors"
              title="Close Properties Panel"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 bg-[#252525] p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 px-3 py-2 text-xs font-medium rounded transition-colors
                ${activeTab === tab.id
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll scrollbar-hide p-4">
        {activeTab === 'basic' && (
          <>
            <PositionProperties 
              element={element} 
              onUpdatePosition={handlePositionUpdate}
              onUpdateSize={handleSizeUpdate}
            />
            <div className="my-6 border-t border-[#2a2a2a]" />
            <BasicProperties element={element} onUpdate={onUpdate} />
          </>
        )}
        {activeTab === 'layout' && (
          <LayoutProperties element={element} onUpdateStyles={onUpdateStyles} />
        )}
        {activeTab === 'advanced' && (
          <AdvancedProperties element={element} onUpdate={onUpdateStyles} />
        )}
      </div>

      {/* Element Info */}
      <div className="p-4 border-t border-[#2a2a2a] bg-[#151515]">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
          <div>X: {Math.round(element.x)}px</div>
          <div>Y: {Math.round(element.y)}px</div>
          {element.width && <div>W: {element.width}px</div>}
          {element.height && <div>H: {element.height}px</div>}
        </div>
      </div>
    </aside>
  );
}
