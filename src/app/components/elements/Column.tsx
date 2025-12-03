interface ColumnProps {
  columns?: number;
  gap?: number;
  padding?: string;
  backgroundColor?: string;
}

export default function ColumnComponent({ 
  columns = 2,
  gap = 16,
  padding = '16px',
  backgroundColor = 'transparent'
}: ColumnProps) {
  return (
    <div 
      className="pointer-events-none min-h-[50px]"
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        padding,
        backgroundColor
      }}
    >
      <div className="text-gray-500 text-xs text-center py-2">Column Layout ({columns} cols)</div>
    </div>
  );
}
