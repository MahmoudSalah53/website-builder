'use client';

import { Element } from '../../types';

interface PositionPropertiesProps {
  element: Element;
  onUpdatePosition: (x: number, y: number) => void;
}

export default function PositionProperties({ element, onUpdatePosition, onUpdateSize }: PositionPropertiesProps) {
  const inputClass = "w-full px-3 py-2 bg-[#252525] border border-[#2a2a2a] rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm text-gray-300 mb-2";

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Position</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelClass}>X Position</label>
          <input
            type="number"
            value={Math.round(element.x)}
            onChange={(e) => {
              const newX = parseInt(e.target.value) || 0;
              onUpdatePosition(newX, element.y);
            }}
            className={inputClass}
            step="1"
          />
        </div>
        <div>
          <label className={labelClass}>Y Position</label>
          <input
            type="number"
            value={Math.round(element.y)}
            onChange={(e) => {
              const newY = parseInt(e.target.value) || 0;
              onUpdatePosition(element.x, newY);
            }}
            className={inputClass}
            step="1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelClass}>Width</label>
          <input
            type="number"
            value={element.width || ''}
            onChange={(e) => {
              const width = parseInt(e.target.value);
              if (onUpdateSize) {
                onUpdateSize(!isNaN(width) && width > 0 ? width : undefined, element.height);
              }
            }}
            placeholder="Auto"
            className={inputClass}
            step="1"
          />
        </div>
        <div>
          <label className={labelClass}>Height</label>
          <input
            type="number"
            value={element.height || ''}
            onChange={(e) => {
              const height = parseInt(e.target.value);
              if (onUpdateSize) {
                onUpdateSize(element.width, !isNaN(height) && height > 0 ? height : undefined);
              }
            }}
            placeholder="Auto"
            className={inputClass}
            step="1"
          />
        </div>
      </div>
    </div>
  );
}
