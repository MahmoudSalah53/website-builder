interface ContainerProps {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  maxWidth?: string;
  children?: React.ReactNode;
}

export default function ContainerComponent({ 
  padding = '16px',
  margin = '0 auto',
  backgroundColor = 'transparent',
  maxWidth = '1200px'
}: ContainerProps) {
  return (
    <div 
      className="pointer-events-none min-h-[50px]"
      style={{ 
        padding,
        margin,
        backgroundColor,
        maxWidth,
        width: '100%'
      }}
    >
      <div className="text-gray-500 text-xs text-center py-2">Container</div>
    </div>
  );
}
