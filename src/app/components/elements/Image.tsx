interface ImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  style?: React.CSSProperties;
}

export default function ImageComponent({ 
  src = 'https://picsum.photos/400/300',
  alt = 'Image',
  width = 400,
  height = 300,
  objectFit = 'cover',
  style
}: ImageProps) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <img
        src={src}
        alt={alt}
        className={`object-${objectFit} rounded pointer-events-none`}
        style={{ width: '100%', height: '100%', objectFit }}
      />
    </div>
  );
}
