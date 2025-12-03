interface VideoPlayerProps {
  videoUrl?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export default function VideoPlayerComponent({ 
  videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  autoplay = false,
  controls = true,
  loop = false,
  muted = false
}: VideoPlayerProps) {
  return (
    <div className="pointer-events-none w-full">
      <video
        src={videoUrl}
        autoPlay={autoplay}
        controls={controls}
        loop={loop}
        muted={muted}
        className="w-full rounded"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
