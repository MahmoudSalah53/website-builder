interface ButtonProps {
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
  style?: React.CSSProperties;
  isPreview?: boolean;
}

export default function ButtonComponent({ label = 'Button', size = 'medium', variant = 'primary', style, isPreview = false }: ButtonProps) {
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border-2 border-gray-600 hover:bg-gray-800 text-gray-300',
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <button
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          rounded font-medium transition-colors
          ${isPreview ? 'cursor-pointer' : 'pointer-events-none'}
          w-full h-full
        `}
        style={{ width: '100%', height: '100%' }}
        disabled={!isPreview}
        onClick={isPreview ? () => alert(`Button clicked: ${label}`) : undefined}
      >
        {label}
      </button>
    </div>
  );
}
