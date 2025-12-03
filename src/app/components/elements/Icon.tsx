interface IconProps {
  iconName?: string;
  iconSize?: 'small' | 'medium' | 'large';
  iconColor?: string;
  style?: React.CSSProperties;
}

export default function IconComponent({ 
  iconName = '⭐',
  iconSize = 'medium',
  iconColor = '#ededed',
  style
}: IconProps) {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl',
  };

  return (
    <div 
      className={`${sizeClasses[iconSize]} pointer-events-none flex items-center justify-center`}
      style={{ 
        color: iconColor,
        width: '100%',
        height: '100%',
        ...style
      }}
    >
      {iconName}
    </div>
  );
}
