interface GridProps {
  gridColumns?: number;
  gridRows?: number;
  gridGap?: number;
  padding?: string;
  backgroundColor?: string;
}

export default function GridComponent({ 
  gridColumns = 3,
  gridRows = 2,
  gridGap = 16,
  padding = '16px',
  backgroundColor = 'transparent'
}: GridProps) {
  return (
    <div 
      className="pointer-events-none min-h-[100px]"
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        gap: `${gridGap}px`,
        padding,
        backgroundColor
      }}
    >
      <div className="text-gray-500 text-xs text-center py-2 col-span-full">
        Grid ({gridColumns}×{gridRows})
      </div>
    </div>
  );
}
