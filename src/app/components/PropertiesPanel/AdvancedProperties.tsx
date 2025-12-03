'use client';

import { Element, CustomStyles } from '../../types';

interface AdvancedPropertiesProps {
  element: Element;
  onUpdate: (id: string, styles: Partial<CustomStyles>) => void;
}

export default function AdvancedProperties({ element, onUpdate }: AdvancedPropertiesProps) {
  const styles = element.styles || {};
  const updateStyle = (key: keyof CustomStyles, value: any) => {
    onUpdate(element.id, { [key]: value });
  };

  const inputClass = "w-full px-3 py-2 bg-[#252525] border border-[#2a2a2a] rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm text-gray-300 mb-2";
  const sectionClass = "space-y-4";

  return (
    <div className="space-y-6">
      {/* Positioning */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Positioning</h3>
        <div className={sectionClass}>
          <div>
            <label className={labelClass}>Position</label>
            <select
              value={styles.position || 'static'}
              onChange={(e) => updateStyle('position', e.target.value)}
              className={inputClass}
            >
              <option value="static">Static</option>
              <option value="relative">Relative</option>
              <option value="absolute">Absolute</option>
              <option value="fixed">Fixed</option>
              <option value="sticky">Sticky</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Top</label>
              <input
                type="text"
                value={styles.top || ''}
                onChange={(e) => updateStyle('top', e.target.value)}
                placeholder="auto"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Right</label>
              <input
                type="text"
                value={styles.right || ''}
                onChange={(e) => updateStyle('right', e.target.value)}
                placeholder="auto"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Bottom</label>
              <input
                type="text"
                value={styles.bottom || ''}
                onChange={(e) => updateStyle('bottom', e.target.value)}
                placeholder="auto"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Left</label>
              <input
                type="text"
                value={styles.left || ''}
                onChange={(e) => updateStyle('left', e.target.value)}
                placeholder="auto"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Z-Index</label>
            <input
              type="number"
              value={element.zIndex || 0}
              onChange={(e) => onUpdate(element.id, { zIndex: parseInt(e.target.value) || 0 })}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Typography</h3>
        <div className={sectionClass}>
          <div>
            <label className={labelClass}>Font Family</label>
            <select
              value={styles.fontFamily || ''}
              onChange={(e) => updateStyle('fontFamily', e.target.value)}
              className={inputClass}
            >
              <option value="">Default</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Helvetica Neue', sans-serif">Helvetica</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="Verdana, sans-serif">Verdana</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Font Size</label>
              <input
                type="text"
                value={styles.fontSize || ''}
                onChange={(e) => updateStyle('fontSize', e.target.value)}
                placeholder="16px"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Font Weight</label>
              <select
                value={styles.fontWeight || ''}
                onChange={(e) => updateStyle('fontWeight', e.target.value)}
                className={inputClass}
              >
                <option value="">Normal</option>
                <option value="100">100 - Thin</option>
                <option value="200">200 - Extra Light</option>
                <option value="300">300 - Light</option>
                <option value="400">400 - Normal</option>
                <option value="500">500 - Medium</option>
                <option value="600">600 - Semi Bold</option>
                <option value="700">700 - Bold</option>
                <option value="800">800 - Extra Bold</option>
                <option value="900">900 - Black</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Line Height</label>
            <input
              type="text"
              value={styles.lineHeight || ''}
              onChange={(e) => updateStyle('lineHeight', e.target.value)}
              placeholder="1.5"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Letter Spacing</label>
            <input
              type="text"
              value={styles.letterSpacing || ''}
              onChange={(e) => updateStyle('letterSpacing', e.target.value)}
              placeholder="0px"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Text Transform</label>
              <select
                value={styles.textTransform || 'none'}
                onChange={(e) => updateStyle('textTransform', e.target.value)}
                className={inputClass}
              >
                <option value="none">None</option>
                <option value="uppercase">Uppercase</option>
                <option value="lowercase">Lowercase</option>
                <option value="capitalize">Capitalize</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Text Decoration</label>
              <select
                value={styles.textDecoration || 'none'}
                onChange={(e) => updateStyle('textDecoration', e.target.value)}
                className={inputClass}
              >
                <option value="none">None</option>
                <option value="underline">Underline</option>
                <option value="line-through">Line Through</option>
                <option value="overline">Overline</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Spacing</h3>
        <div className={sectionClass}>
          <div>
            <label className={labelClass}>Padding (All)</label>
            <input
              type="text"
              value={styles.padding || ''}
              onChange={(e) => updateStyle('padding', e.target.value)}
              placeholder="0px"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Padding Top</label>
              <input
                type="text"
                value={styles.paddingTop || ''}
                onChange={(e) => updateStyle('paddingTop', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Padding Right</label>
              <input
                type="text"
                value={styles.paddingRight || ''}
                onChange={(e) => updateStyle('paddingRight', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Padding Bottom</label>
              <input
                type="text"
                value={styles.paddingBottom || ''}
                onChange={(e) => updateStyle('paddingBottom', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Padding Left</label>
              <input
                type="text"
                value={styles.paddingLeft || ''}
                onChange={(e) => updateStyle('paddingLeft', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Margin (All)</label>
            <input
              type="text"
              value={styles.margin || ''}
              onChange={(e) => updateStyle('margin', e.target.value)}
              placeholder="0px"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Margin Top</label>
              <input
                type="text"
                value={styles.marginTop || ''}
                onChange={(e) => updateStyle('marginTop', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Margin Right</label>
              <input
                type="text"
                value={styles.marginRight || ''}
                onChange={(e) => updateStyle('marginRight', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Margin Bottom</label>
              <input
                type="text"
                value={styles.marginBottom || ''}
                onChange={(e) => updateStyle('marginBottom', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Margin Left</label>
              <input
                type="text"
                value={styles.marginLeft || ''}
                onChange={(e) => updateStyle('marginLeft', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Borders */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Borders</h3>
        <div className={sectionClass}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Border Width</label>
              <input
                type="text"
                value={styles.borderWidth || ''}
                onChange={(e) => updateStyle('borderWidth', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Border Style</label>
              <select
                value={styles.borderStyle || 'solid'}
                onChange={(e) => updateStyle('borderStyle', e.target.value)}
                className={inputClass}
              >
                <option value="none">None</option>
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
                <option value="double">Double</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Border Color</label>
            <input
              type="color"
              value={styles.borderColor || '#000000'}
              onChange={(e) => updateStyle('borderColor', e.target.value)}
              className="w-full h-10 rounded"
            />
          </div>
          <div>
            <label className={labelClass}>Border Radius</label>
            <input
              type="text"
              value={styles.borderRadius || ''}
              onChange={(e) => updateStyle('borderRadius', e.target.value)}
              placeholder="0px"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Effects */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Effects</h3>
        <div className={sectionClass}>
          <div>
            <label className={labelClass}>Box Shadow</label>
            <input
              type="text"
              value={styles.boxShadow || ''}
              onChange={(e) => updateStyle('boxShadow', e.target.value)}
              placeholder="0px 0px 0px rgba(0,0,0,0)"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Text Shadow</label>
            <input
              type="text"
              value={styles.textShadow || ''}
              onChange={(e) => updateStyle('textShadow', e.target.value)}
              placeholder="0px 0px 0px rgba(0,0,0,0)"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={styles.opacity !== undefined ? styles.opacity : 1}
              onChange={(e) => updateStyle('opacity', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1 text-center">
              {Math.round((styles.opacity !== undefined ? styles.opacity : 1) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Transform */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Transform</h3>
        <div className={sectionClass}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Rotate</label>
              <input
                type="text"
                value={styles.rotate || ''}
                onChange={(e) => updateStyle('rotate', e.target.value)}
                placeholder="0deg"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Scale</label>
              <input
                type="text"
                value={styles.scale || ''}
                onChange={(e) => updateStyle('scale', e.target.value)}
                placeholder="1"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Translate X</label>
              <input
                type="text"
                value={styles.translateX || ''}
                onChange={(e) => updateStyle('translateX', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Translate Y</label>
              <input
                type="text"
                value={styles.translateY || ''}
                onChange={(e) => updateStyle('translateY', e.target.value)}
                placeholder="0px"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Custom CSS</h3>
        <div>
          <textarea
            value={styles.customCSS || ''}
            onChange={(e) => updateStyle('customCSS', e.target.value)}
            placeholder="/* Add custom CSS here */"
            className={`${inputClass} font-mono text-xs`}
            rows={6}
          />
        </div>
      </div>
    </div>
  );
}
