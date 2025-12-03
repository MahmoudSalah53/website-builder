'use client';

import { Element, CustomStyles } from '../../types';

interface LayoutPropertiesProps {
  element: Element;
  onUpdateStyles: (id: string, styles: Partial<CustomStyles>) => void;
}

export default function LayoutProperties({ element, onUpdateStyles }: LayoutPropertiesProps) {
  const styles = element.styles || {};
  const updateStyle = (key: keyof CustomStyles, value: any) => {
    onUpdateStyles(element.id, { [key]: value });
  };

  const inputClass = "w-full px-3 py-2 bg-[#252525] border border-[#2a2a2a] rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm text-gray-300 mb-2";

  return (
    <div className="space-y-6">
      {/* Display */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Display</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Display Type</label>
            <select
              value={styles.display || 'block'}
              onChange={(e) => updateStyle('display', e.target.value)}
              className={inputClass}
            >
              <option value="block">Block</option>
              <option value="inline">Inline</option>
              <option value="inline-block">Inline Block</option>
              <option value="flex">Flex</option>
              <option value="grid">Grid</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flexbox */}
      {styles.display === 'flex' && (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Flexbox</h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Flex Direction</label>
              <select
                value={styles.flexDirection || 'row'}
                onChange={(e) => updateStyle('flexDirection', e.target.value)}
                className={inputClass}
              >
                <option value="row">Row</option>
                <option value="row-reverse">Row Reverse</option>
                <option value="column">Column</option>
                <option value="column-reverse">Column Reverse</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Flex Wrap</label>
              <select
                value={styles.flexWrap || 'nowrap'}
                onChange={(e) => updateStyle('flexWrap', e.target.value)}
                className={inputClass}
              >
                <option value="nowrap">No Wrap</option>
                <option value="wrap">Wrap</option>
                <option value="wrap-reverse">Wrap Reverse</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Align Items</label>
                <select
                  value={styles.alignItems || 'stretch'}
                  onChange={(e) => updateStyle('alignItems', e.target.value)}
                  className={inputClass}
                >
                  <option value="flex-start">Start</option>
                  <option value="flex-end">End</option>
                  <option value="center">Center</option>
                  <option value="baseline">Baseline</option>
                  <option value="stretch">Stretch</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Justify Content</label>
                <select
                  value={styles.justifyContent || 'flex-start'}
                  onChange={(e) => updateStyle('justifyContent', e.target.value)}
                  className={inputClass}
                >
                  <option value="flex-start">Start</option>
                  <option value="flex-end">End</option>
                  <option value="center">Center</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-evenly">Space Evenly</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Gap</label>
              <input
                type="text"
                value={styles.gap || ''}
                onChange={(e) => updateStyle('gap', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {/* Size */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Size</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Width</label>
              <input
                type="text"
                value={element.width ? `${element.width}px` : ''}
                onChange={(e) => {
                  const val = e.target.value.replace('px', '').trim();
                  if (val === '') {
                    onUpdateStyles(element.id, { width: undefined } as any);
                  } else {
                    const num = parseInt(val);
                    if (!isNaN(num)) {
                      onUpdateStyles(element.id, { width: num } as any);
                    }
                  }
                }}
                placeholder="auto"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Height</label>
              <input
                type="text"
                value={element.height ? `${element.height}px` : ''}
                onChange={(e) => {
                  const val = e.target.value.replace('px', '').trim();
                  if (val === '') {
                    onUpdateStyles(element.id, { height: undefined } as any);
                  } else {
                    const num = parseInt(val);
                    if (!isNaN(num)) {
                      onUpdateStyles(element.id, { height: num } as any);
                    }
                  }
                }}
                placeholder="auto"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overflow */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Overflow</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Overflow</label>
            <select
              value={styles.overflow || 'visible'}
              onChange={(e) => updateStyle('overflow', e.target.value)}
              className={inputClass}
            >
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
              <option value="scroll">Scroll</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
