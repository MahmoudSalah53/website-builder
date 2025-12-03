'use client';

import { useState } from 'react';

interface SwitchProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  isPreview?: boolean;
}

export default function SwitchComponent({ 
  label = 'Switch',
  checked = false,
  disabled = false,
  style,
  isPreview = false
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <label className={`flex items-center gap-2 ${isPreview ? 'cursor-pointer' : 'pointer-events-none'}`} style={{ width: '100%', height: '100%', ...style }}>
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={isPreview ? isChecked : checked}
          disabled={disabled || !isPreview}
          onChange={isPreview ? (e) => setIsChecked(e.target.checked) : undefined}
          className="sr-only peer"
          readOnly={!isPreview}
        />
        <div className={`
          w-11 h-6 bg-[#2a2a2a] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer
          peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
          peer-checked:bg-blue-600
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `} />
      </div>
      <span className={`text-sm text-gray-300 ${disabled ? 'opacity-50' : ''}`}>
        {label}
      </span>
    </label>
  );
}
