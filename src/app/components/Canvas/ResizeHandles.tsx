'use client';

import { Element } from '../../types';
import { useEffect, useRef, useState } from 'react';

interface ResizeHandlesProps {
  element: Element;
  onResize: (width: number, height: number, newX?: number, newY?: number) => void;
}

export default function ResizeHandles({ element, onResize }: ResizeHandlesProps) {
  const handleSize = 10;
  const handleStyle = "absolute bg-blue-500 border-2 border-white rounded-full z-50 hover:bg-blue-600 transition-colors";
  const containerRef = useRef<HTMLDivElement>(null);
  const [actualSize, setActualSize] = useState<{ width: number; height: number }>({
    width: element.width || 200,
    height: element.height || 100
  });

  // Get actual element size from DOM
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        // Get the parent element (the DraggableElement container)
        const parent = containerRef.current.parentElement;
        if (parent) {
          // Get the actual rendered size
          const rect = parent.getBoundingClientRect();
          const computedWidth = rect.width;
          const computedHeight = rect.height;
          
          // Use actual size if available, otherwise fallback to element dimensions
          setActualSize({
            width: computedWidth > 0 ? computedWidth : (element.width || 200),
            height: computedHeight > 0 ? computedHeight : (element.height || 100)
          });
        }
      }
    };

    // Update size immediately and after a short delay to ensure DOM is ready
    updateSize();
    const timeout = setTimeout(updateSize, 10);
    const timeout2 = setTimeout(updateSize, 50);
    
    // Also update on window resize
    window.addEventListener('resize', updateSize);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      window.removeEventListener('resize', updateSize);
    };
  }, [element.width, element.height, element.x, element.y]);

  const handleMouseDown = (e: React.MouseEvent, corner: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = actualSize.width;
    const startHeight = actualSize.height;
    const startElementX = element.x;
    const startElementY = element.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startElementX;
      let newY = startElementY;

      // Handle resize based on corner/edge
      if (corner.includes('e')) {
        // Resize from right edge
        newWidth = Math.max(20, startWidth + deltaX);
      }
      if (corner.includes('w')) {
        // Resize from left edge - adjust position
        newWidth = Math.max(20, startWidth - deltaX);
        newX = startElementX + (startWidth - newWidth);
      }
      if (corner.includes('s')) {
        // Resize from bottom edge
        newHeight = Math.max(20, startHeight + deltaY);
      }
      if (corner.includes('n')) {
        // Resize from top edge - adjust position
        newHeight = Math.max(20, startHeight - deltaY);
        newY = startElementY + (startHeight - newHeight);
      }

      // Update actual size state for immediate visual feedback
      setActualSize({ width: newWidth, height: newHeight });

      // Only update position if it actually changed
      onResize(
        newWidth, 
        newHeight, 
        newX !== startElementX ? newX : undefined, 
        newY !== startElementY ? newY : undefined
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = corner.includes('n') && corner.includes('w') ? 'nwse-resize' :
                                 corner.includes('n') && corner.includes('e') ? 'nesw-resize' :
                                 corner.includes('s') && corner.includes('w') ? 'nesw-resize' :
                                 corner.includes('s') && corner.includes('e') ? 'nwse-resize' :
                                 corner.includes('n') || corner.includes('s') ? 'ns-resize' : 'ew-resize';
    document.body.style.userSelect = 'none';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Use actual size from DOM or fallback to element dimensions
  const elementWidth = actualSize.width;
  const elementHeight = actualSize.height;

  return (
    <div 
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{ 
        left: 0,
        top: 0,
        width: `${elementWidth}px`, 
        height: `${elementHeight}px`,
        boxSizing: 'border-box'
      }}
    >
      {/* Corner handles */}
      <div
        className={`${handleStyle} cursor-nwse-resize`}
        style={{ 
          width: handleSize, 
          height: handleSize, 
          top: -handleSize/2, 
          left: -handleSize/2,
          pointerEvents: 'auto'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'nw')}
      />
      <div
        className={`${handleStyle} cursor-nesw-resize`}
        style={{ 
          width: handleSize, 
          height: handleSize, 
          top: -handleSize/2, 
          right: -handleSize/2,
          pointerEvents: 'auto'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'ne')}
      />
      <div
        className={`${handleStyle} cursor-nesw-resize`}
        style={{ 
          width: handleSize, 
          height: handleSize, 
          bottom: -handleSize/2, 
          left: -handleSize/2,
          pointerEvents: 'auto'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'sw')}
      />
      <div
        className={`${handleStyle} cursor-nwse-resize`}
        style={{ 
          width: handleSize, 
          height: handleSize, 
          bottom: -handleSize/2, 
          right: -handleSize/2,
          pointerEvents: 'auto'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'se')}
      />
      
      {/* Edge handles */}
      <div
        className={`${handleStyle} cursor-ns-resize`}
        style={{ 
          width: handleSize, 
          height: handleSize, 
          top: -handleSize/2,
          left: `calc(50% - ${handleSize/2}px)`,
          pointerEvents: 'auto'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'n')}
      />
      <div
        className={`${handleStyle} cursor-ns-resize`}
        style={{ 
          width: handleSize, 
          height: handleSize, 
          bottom: -handleSize/2,
          left: `calc(50% - ${handleSize/2}px)`,
          pointerEvents: 'auto'
        }}
        onMouseDown={(e) => handleMouseDown(e, 's')}
      />
      <div
        className={`${handleStyle} cursor-ew-resize`}
        style={{ 
          width: handleSize, 
          height: handleSize, 
          left: -handleSize/2,
          top: `calc(50% - ${handleSize/2}px)`,
          pointerEvents: 'auto'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'w')}
      />
      <div
        className={`${handleStyle} cursor-ew-resize`}
        style={{ 
          width: handleSize, 
          height: handleSize, 
          right: -handleSize/2,
          top: `calc(50% - ${handleSize/2}px)`,
          pointerEvents: 'auto'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'e')}
      />
    </div>
  );
}