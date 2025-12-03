interface SectionProps {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export default function SectionComponent({ 
  padding = '20px',
  margin = '0',
  backgroundColor = 'transparent',
  backgroundImage
}: SectionProps) {
  return (
    <div 
      className="pointer-events-none min-h-[100px]"
      style={{ 
        padding,
        margin,
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-gray-500 text-xs text-center py-4">Section</div>
    </div>
  );
}
