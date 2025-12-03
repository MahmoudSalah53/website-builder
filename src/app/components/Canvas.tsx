'use client';

import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Element } from '../types';
import DraggableElement from './DraggableElement';

interface CanvasProps {
  elements: Element[];
  selectedElement: Element | null;
  onSelectElement: (element: Element | null) => void;
  onDeleteElement: (id: string) => void;
  onUpdateElementPosition?: (id: string, x: number, y: number, width?: number, height?: number) => void;
  snapToGrid?: boolean;
  gridSize?: number;
  onDuplicate?: (id: string) => void;
  onCopy?: (id: string) => void;
  onPaste?: () => void;
}

export default function Canvas({ 
  elements, 
  selectedElement, 
  onSelectElement, 
  onDeleteElement, 
  onUpdateElementPosition,
  snapToGrid = true,
  gridSize = 10,
  onDuplicate,
  onCopy,
  onPaste
}: CanvasProps) {
  const [showGrid, setShowGrid] = useState(true);
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  const handleResize = (id: string, width: number, height: number, newX?: number, newY?: number) => {
    if (onUpdateElementPosition) {
      const element = elements.find(el => el.id === id);
      if (element) {
        let finalX = newX !== undefined ? newX : element.x;
        let finalY = newY !== undefined ? newY : element.y;
        let finalWidth = width;
        let finalHeight = height;
        
        // Snap to grid if enabled
        if (snapToGrid) {
          finalX = Math.round(finalX / gridSize) * gridSize;
          finalY = Math.round(finalY / gridSize) * gridSize;
          finalWidth = Math.round(finalWidth / gridSize) * gridSize;
          finalHeight = Math.round(finalHeight / gridSize) * gridSize;
        }
        
        onUpdateElementPosition(id, finalX, finalY, finalWidth, finalHeight);
      }
    }
  };

  return (
    <div className="flex-1 relative overflow-auto bg-[#0f0f0f]">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-2">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`px-3 py-1.5 text-xs rounded transition-colors ${
            showGrid 
              ? 'bg-[#2a2a2a] text-white' 
              : 'bg-[#252525] text-gray-300 hover:text-white hover:bg-[#2a2a2a]'
          }`}
          title="Toggle Grid"
        >
          Grid
        </button>
        <button
          onClick={() => {
            // Toggle snap to grid - will be handled by parent
          }}
          className={`px-3 py-1.5 text-xs rounded transition-colors ${
            snapToGrid 
              ? 'bg-[#2a2a2a] text-white' 
              : 'bg-[#252525] text-gray-300 hover:text-white hover:bg-[#2a2a2a]'
          }`}
          title="Snap to Grid"
        >
          Snap
        </button>
        {selectedElement && (
          <>
            {onCopy && (
              <button
                onClick={() => onCopy(selectedElement.id)}
                className="px-3 py-1.5 text-xs bg-[#252525] text-gray-300 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                title="Copy (Ctrl+C)"
              >
                Copy
              </button>
            )}
            {onPaste && (
              <button
                onClick={onPaste}
                className="px-3 py-1.5 text-xs bg-[#252525] text-gray-300 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                title="Paste (Ctrl+V)"
              >
                Paste
              </button>
            )}
            {onDuplicate && (
              <button
                onClick={() => onDuplicate(selectedElement.id)}
                className="px-3 py-1.5 text-xs bg-[#252525] text-gray-300 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                title="Duplicate (Ctrl+D)"
              >
                Duplicate
              </button>
            )}
          </>
        )}
      </div>

      <div
        ref={setNodeRef}
        id="canvas-drop-zone"
        className={`
          min-h-full w-full relative
          ${isOver ? 'bg-[#0f0f0f]' : 'bg-[#0f0f0f]'}
        `}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onSelectElement(null);
          }
        }}
        style={{
          backgroundImage: showGrid
            ? `linear-gradient(to right, rgba(42, 42, 42, 0.2) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(42, 42, 42, 0.2) 1px, transparent 1px)`
            : 'none',
          backgroundSize: showGrid ? `${gridSize}px ${gridSize}px` : 'auto',
          backgroundPosition: '0 0',
        }}
      >
        {elements.map((element) => (
          <DraggableElement
            key={element.id}
            element={element}
            isSelected={selectedElement?.id === element.id}
            onSelect={() => onSelectElement(element)}
            onDelete={() => onDeleteElement(element.id)}
            onResize={(width, height, newX, newY) => handleResize(element.id, width, height, newX, newY)}
          />
        ))}
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-1">Drag components here to start building</p>
              <p className="text-gray-600 text-xs">Drop elements from the sidebar onto the canvas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}