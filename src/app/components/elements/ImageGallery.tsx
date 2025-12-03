interface ImageGalleryProps {
  images?: string[];
}

export default function ImageGalleryComponent({ 
  images = [
    'https://via.placeholder.com/300x200?text=Image+1',
    'https://via.placeholder.com/300x200?text=Image+2',
    'https://via.placeholder.com/300x200?text=Image+3',
    'https://via.placeholder.com/300x200?text=Image+4'
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
