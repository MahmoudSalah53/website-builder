interface ParagraphProps {
  content?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  style?: React.CSSProperties;
}

export default function ParagraphComponent({ 
  content = 'Paragraph text', 
  textAlign = 'left',
  fontSize,
  fontWeight,
  color = '#ededed',
  style
}: ParagraphProps) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start', ...style }}>
      <p 
        className={`text-base text-${textAlign} pointer-events-none`}
        style={{ 
          fontSize: fontSize || undefined,
          fontWeight: fontWeight || undefined,
          color: color 
        }}
      >
        {content}
      </p>
    </div>
  );
}
