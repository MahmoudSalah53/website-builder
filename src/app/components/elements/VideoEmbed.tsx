interface VideoEmbedProps {
  videoUrl?: string;
  width?: number;
  height?: number;
}

export default function VideoEmbedComponent({ 
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  width = 560,
  height = 315
}: VideoEmbedProps) {
  return (
    <div className="pointer-events-none">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={videoUrl}
          width={width}
          height={height}
          className="absolute top-0 left-0 w-full h-full rounded"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
