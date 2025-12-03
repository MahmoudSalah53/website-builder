interface CardProps {
  title?: string;
  description?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: number;
  padding?: string;
  backgroundColor?: string;
}

export default function CardComponent({ 
  title = 'Card Title',
  description = 'Card description text goes here',
  shadow = 'md',
  borderRadius = 8,
  padding = '20px',
  backgroundColor = '#1a1a1a'
}: CardProps) {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  return (
    <div 
      className={`${shadowClasses[shadow]} pointer-events-none`}
      style={{ 
        borderRadius: `${borderRadius}px`,
        padding,
        backgroundColor,
        border: '1px solid #2a2a2a'
      }}
    >
      {title && <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>}
      {description && <p className="text-sm text-gray-400">{description}</p>}
    </div>
  );
}
