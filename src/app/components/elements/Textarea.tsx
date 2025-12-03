'use client';

import { useState } from 'react';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  style?: React.CSSProperties;
  isPreview?: boolean;
}

export default function TextareaComponent({ 
  label,
  placeholder = 'Enter text...',
  rows = 4,
  required = false,
  disabled = false,
  value,
  style,
  isPreview = false
}: TextareaProps) {
  const [localValue, setLocalValue] = useState(value || '');

  return (
    <div className="flex flex-col gap-1" style={{ width: '100%', height: '100%', ...style }}>
      {label && (
        <label className="text-sm text-gray-400">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        placeholder={placeholder}
        required={required}
        disabled={disabled || !isPreview}
        value={isPreview ? localValue : value}
        onChange={isPreview ? (e) => setLocalValue(e.target.value) : undefined}
        className={`px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isPreview ? '' : 'pointer-events-none'} resize-none w-full`}
        style={{ height: '100%', flex: 1 }}
        readOnly={!isPreview}
      />
    </div>
  );
}
