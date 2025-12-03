interface TextProps {
  content?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function TextComponent({ content = 'Text', size = 'medium' }: TextProps) {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <p className={`${sizeClasses[size]} text-white`}>
      {content}
    </p>
  );
}
