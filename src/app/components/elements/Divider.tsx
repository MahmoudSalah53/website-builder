interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
}

export default function DividerComponent({ 
  orientation = 'horizontal',
  thickness = 1,
  color = '#2a2a2a'
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div 
        className="pointer-events-none"
        style={{ 
          width: `${thickness}px`,
          height: '100px',
          backgroundColor: color 
        }}
      />
    );
  }

  return (
    <hr 
      className="pointer-events-none border-0"
      style={{ 
        height: `${thickness}px`,
        backgroundColor: color,
        width: '100%'
      }}
    />
  );
}
