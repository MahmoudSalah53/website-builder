interface ImageGalleryProps {
  images?: string[];
}

export default function ImageGalleryComponent({ 
  images = [
    'https://picsum.photos/300/200?random=1',
    'https://picsum.photos/300/200?random=2',
    'https://picsum.photos/300/200?random=3',
    'https://picsum.photos/300/200?random=4'
  ]
}: ImageGalleryProps) {
  return (
    <div className="pointer-events-none">
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
