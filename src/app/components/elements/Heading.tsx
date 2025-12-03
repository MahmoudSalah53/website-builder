interface HeadingProps {
  content?: string;
  textType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  style?: React.CSSProperties;
}

export default function HeadingComponent({ 
  content = 'Heading', 
  textType = 'h1',
  textAlign = 'left',
  fontSize,
  fontWeight,
  color = '#ededed',
  style
}: HeadingProps) {
  const sizeClasses = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
  };

  const Tag = textType;
  const alignClass = `text-${textAlign}`;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start', ...style }}>
      <Tag 
        className={`${sizeClasses[textType]} ${alignClass} font-semibold pointer-events-none`}
        style={{ 
          fontSize: fontSize || undefined,
          fontWeight: fontWeight || undefined,
          color: color 
        }}
      >
        {content}
      </Tag>
    </div>
  );
}
