'use client';

import { Element } from '../types';

interface LayersPanelProps {
  elements: Element[];
  selectedElement: Element | null;
  onSelectElement: (element: Element | null) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement?: (id: string) => void;
  onUpdateZIndex: (id: string, zIndex: number) => void;
}

export default function LayersPanel({ 
  elements, 
  selectedElement, 
  onSelectElement, 
  onDeleteElement,
  onDuplicateElement,
  onUpdateZIndex,
  onClose
}: LayersPanelProps) {
  const sortedElements = [...elements].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));

  const getElementIcon = (type: string) => {
    const icons: Record<string, string> = {
      heading: 'H',
      paragraph: 'P',
      button: 'B',
      image: '🖼️',
      icon: '⭐',
      divider: '—',
      spacer: '↕️',
      input: 'I',
      textarea: 'T',
      select: '▼',
      checkbox: '☑️',
      radio: '🔘',
      switch: '🔀',
      navbar: '🧭',
      footer: '⬇️',
    };
    return icons[type] || '📦';
  };

  return (
    <aside className="w-64 h-full flex flex-col bg-[#1a1a1a] border-l border-[#2a2a2a]">
      {/* Clean header */}
      <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between flex-shrink-0">
        <h2 className="text-sm font-semibold text-gray-300 uppercase">Layers</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#2a2a2a] rounded text-gray-400 hover:text-white transition-colors"
            title="Close Layers Panel"
          >
            ✕
          </button>
        )}
      </div>
      <div className="p-4 flex-1 overflow-y-scroll scrollbar-hide">
        <div className="space-y-1">
          {sortedElements.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">No elements</p>
          ) : (
            sortedElements.map((element) => (
              <div
                key={element.id}
                onClick={() => onSelectElement(element)}
                className={`
                  p-2 rounded-lg cursor-pointer transition-colors group mb-1
                  ${selectedElement?.id === element.id 
                    ? 'bg-[#2a2a2a] border border-[#3a3a3a]' 
                    : 'bg-[#252525] hover:bg-[#2a2a2a] border border-transparent'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{getElementIcon(element.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-white truncate capitalize">
                      {element.type.replace('-', ' ')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {element.width && element.height 
                        ? `${element.width}×${element.height}` 
                        : 'Auto'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onDuplicateElement && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicateElement(element.id);
                        }}
                        className="p-1 hover:bg-[#353535] rounded text-xs"
                        title="Duplicate"
                      >
                        📋
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteElement(element.id);
                      }}
                      className="p-1 hover:bg-red-500/20 rounded text-xs text-red-400"
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    value={element.zIndex || 0}
                    onChange={(e) => {
                      e.stopPropagation();
                      onUpdateZIndex(element.id, parseInt(e.target.value) || 0);
                    }}
                    className="w-16 px-2 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-white text-xs"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-xs text-gray-500">Z-Index</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
