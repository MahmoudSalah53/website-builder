interface SpacerProps {
  spacing?: number;
}

export default function SpacerComponent({ spacing = 20 }: SpacerProps) {
  return (
    <div 
      className="pointer-events-none"
      style={{ 
        height: `${spacing}px`,
        width: '100%'
      }}
    />
  );
}
