'use client';

import { useState } from 'react';

interface SelectProps {
  label?: string;
  placeholder?: string;
  options?: string[];
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  isPreview?: boolean;
}

export default function SelectComponent({ 
  label,
  placeholder = 'Select an option...',
  options = ['Option 1', 'Option 2', 'Option 3'],
  multiple = false,
  required = false,
  disabled = false,
  style,
  isPreview = false
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div className="flex flex-col gap-1" style={{ width: '100%', height: '100%', ...style }}>
      {label && (
        <label className="text-sm text-gray-400">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        multiple={multiple}
        required={required}
        disabled={disabled || !isPreview}
        value={isPreview ? selectedValue : ''}
        onChange={isPreview ? (e) => setSelectedValue(e.target.value) : undefined}
        className={`px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${isPreview ? 'cursor-pointer' : 'pointer-events-none'} w-full`}
        style={{ height: '100%', flex: 1 }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
