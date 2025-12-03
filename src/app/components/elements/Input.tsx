interface InputProps {
  label?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  isPreview?: boolean;
}

export default function InputComponent({ label, placeholder = 'Enter text...', size = 'medium', style, isPreview = false }: InputProps) {
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <div className="flex flex-col gap-1" style={{ width: '100%', height: '100%', ...style }}>
      {label && <label className="text-sm text-gray-400">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className={`
          ${sizeClasses[size]}
          bg-[#1a1a1a] border border-[#2a2a2a] rounded text-white
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500
          ${isPreview ? '' : 'pointer-events-none'}
          w-full
        `}
        style={{ height: '100%', flex: 1 }}
        readOnly={!isPreview}
      />
    </div>
  );
}
