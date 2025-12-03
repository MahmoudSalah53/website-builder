interface RowProps {
  gap?: number;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  padding?: string;
  backgroundColor?: string;
}

export default function RowComponent({ 
  gap = 16,
  alignItems = 'start',
  justifyContent = 'start',
  padding = '16px',
  backgroundColor = 'transparent'
}: RowProps) {
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch'
  };

  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    'space-between': 'space-between',
    'space-around': 'space-around'
  };

  return (
    <div 
      className="flex pointer-events-none min-h-[50px]"
      style={{ 
        gap: `${gap}px`,
        alignItems: alignMap[alignItems],
        justifyContent: justifyMap[justifyContent],
        padding,
        backgroundColor
      }}
    >
      <div className="text-gray-500 text-xs">Row</div>
    </div>
  );
}
