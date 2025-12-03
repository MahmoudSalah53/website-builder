'use client';

import { useState } from 'react';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  isPreview?: boolean;
}

export default function CheckboxComponent({ 
  label = 'Checkbox',
  checked = false,
  required = false,
  disabled = false,
  style,
  isPreview = false
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <label className={`flex items-center gap-2 ${isPreview ? 'cursor-pointer' : 'pointer-events-none'}`} style={{ width: '100%', height: '100%', ...style }}>
      <input
        type="checkbox"
        checked={isPreview ? isChecked : checked}
        required={required}
        disabled={disabled || !isPreview}
        onChange={isPreview ? (e) => setIsChecked(e.target.checked) : undefined}
        className="w-4 h-4 text-blue-600 bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-2 focus:ring-blue-500"
        readOnly={!isPreview}
      />
      <span className="text-sm text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
  );
}
