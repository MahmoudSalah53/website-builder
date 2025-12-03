'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Element } from '../types';
import ButtonComponent from './elements/Button';
import InputComponent from './elements/Input';
import TextComponent from './elements/Text';
import HeadingComponent from './elements/Heading';
import ParagraphComponent from './elements/Paragraph';
import ImageComponent from './elements/Image';
import IconComponent from './elements/Icon';
import DividerComponent from './elements/Divider';
import SpacerComponent from './elements/Spacer';
import TextareaComponent from './elements/Textarea';
import SelectComponent from './elements/Select';
import CheckboxComponent from './elements/Checkbox';
import RadioComponent from './elements/Radio';
import SwitchComponent from './elements/Switch';
import SectionComponent from './elements/Section';
import ContainerComponent from './elements/Container';
import RowComponent from './elements/Row';
import ColumnComponent from './elements/Column';
import GridComponent from './elements/Grid';
import CardComponent from './elements/Card';
import TabsComponent from './elements/Tabs';
import ImageGalleryComponent from './elements/ImageGallery';
import ImageCarouselComponent from './elements/ImageCarousel';
import VideoEmbedComponent from './elements/VideoEmbed';
import VideoPlayerComponent from './elements/VideoPlayer';
import NavbarComponent from './elements/Navbar';
import MenuComponent from './elements/Menu';
import FooterComponent from './elements/Footer';

import ResizeHandles from './Canvas/ResizeHandles';

interface DraggableElementProps {
  element: Element;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onResize?: (width: number, height: number, newX?: number, newY?: number) => void;
}

export default function DraggableElement({ element, isSelected, onSelect, onDelete, onResize }: DraggableElementProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.id,
  });

  // Build style object from element styles and position
  const buildStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: (element.styles?.position as any) || 'absolute',
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: element.width ? `${element.width}px` : 'auto',
      height: element.height ? `${element.height}px` : 'auto',
      minWidth: element.width ? `${element.width}px` : undefined,
      minHeight: element.height ? `${element.height}px` : undefined,
      zIndex: isSelected ? (element.zIndex || 10) : (element.zIndex || 1),
      transform: CSS.Translate.toString(transform),
      boxSizing: 'border-box',
      willChange: transform ? 'transform' : undefined, // Optimize for smooth transitions
    };

    // Apply custom styles
    if (element.styles) {
      const styles = element.styles;
      if (styles.color) baseStyle.color = styles.color;
      if (styles.backgroundColor) baseStyle.backgroundColor = styles.backgroundColor;
      if (styles.padding) baseStyle.padding = styles.padding;
      if (styles.margin) baseStyle.margin = styles.margin;
      if (styles.border) baseStyle.border = styles.border;
      if (styles.borderRadius) baseStyle.borderRadius = styles.borderRadius;
      if (styles.boxShadow) baseStyle.boxShadow = styles.boxShadow;
      if (styles.opacity !== undefined) baseStyle.opacity = styles.opacity;
      if (styles.fontSize) baseStyle.fontSize = styles.fontSize;
      if (styles.fontWeight) baseStyle.fontWeight = styles.fontWeight;
      if (styles.fontFamily) baseStyle.fontFamily = styles.fontFamily;
      if (styles.lineHeight) baseStyle.lineHeight = styles.lineHeight;
      if (styles.letterSpacing) baseStyle.letterSpacing = styles.letterSpacing;
      if (styles.textTransform) baseStyle.textTransform = styles.textTransform;
      if (styles.textDecoration) baseStyle.textDecoration = styles.textDecoration;
      if (styles.display) baseStyle.display = styles.display;
      if (styles.flexDirection) baseStyle.flexDirection = styles.flexDirection;
      if (styles.alignItems) baseStyle.alignItems = styles.alignItems;
      if (styles.justifyContent) baseStyle.justifyContent = styles.justifyContent;
      if (styles.gap) baseStyle.gap = styles.gap;
      if (styles.overflow) baseStyle.overflow = styles.overflow;
      
      // Transform
      if (styles.rotate || styles.scale || styles.translateX || styles.translateY) {
        const transforms = [];
        if (styles.rotate) transforms.push(`rotate(${styles.rotate})`);
        if (styles.scale) transforms.push(`scale(${styles.scale})`);
        if (styles.translateX) transforms.push(`translateX(${styles.translateX})`);
        if (styles.translateY) transforms.push(`translateY(${styles.translateY})`);
        if (transforms.length > 0) {
          baseStyle.transform = `${baseStyle.transform || ''} ${transforms.join(' ')}`.trim();
        }
      }
    }

    return baseStyle;
  };

  const style = buildStyle();

  const renderElement = () => {
    // Create a style object that respects width and height
    const elementStyle: React.CSSProperties = {
      width: element.width ? `${element.width}px` : '100%',
      height: element.height ? `${element.height}px` : '100%',
      boxSizing: 'border-box',
    };

    switch (element.type) {
      // Core Elements
      case 'heading':
        return <HeadingComponent {...element.props} style={elementStyle} />;
      case 'paragraph':
        return <ParagraphComponent {...element.props} style={elementStyle} />;
      case 'button':
        return <ButtonComponent {...element.props} style={elementStyle} />;
      case 'image':
        return <ImageComponent {...element.props} style={elementStyle} />;
      case 'icon':
        return <IconComponent {...element.props} style={elementStyle} />;
      
      // Layout Elements
      case 'section':
        return <SectionComponent {...element.props} />;
      case 'container':
        return <ContainerComponent {...element.props} />;
      case 'row':
        return <RowComponent {...element.props} />;
      case 'column':
        return <ColumnComponent {...element.props} />;
      case 'grid':
        return <GridComponent {...element.props} />;
      case 'card':
        return <CardComponent {...element.props} />;
      case 'tabs':
        return <TabsComponent {...element.props} />;
      
      // Media Components
      case 'image-gallery':
        return <ImageGalleryComponent {...element.props} style={elementStyle} />;
      case 'image-carousel':
        return <ImageCarouselComponent {...element.props} style={elementStyle} />;
      
      // Form Elements
      case 'input':
        return <InputComponent {...element.props} style={elementStyle} />;
      case 'textarea':
        return <TextareaComponent {...element.props} style={elementStyle} />;
      case 'select':
        return <SelectComponent {...element.props} style={elementStyle} />;
      case 'checkbox':
        return <CheckboxComponent {...element.props} style={elementStyle} />;
      case 'radio':
        return <RadioComponent {...element.props} style={elementStyle} />;
      case 'switch':
        return <SwitchComponent {...element.props} style={elementStyle} />;
      
      // Navigation Elements
      case 'navbar':
        return <NavbarComponent {...element.props} />;
      case 'sidebar-nav':
        return <MenuComponent {...element.props} />;
      case 'menu':
        return <MenuComponent {...element.props} />;
      case 'footer':
        return <FooterComponent {...element.props} />;
      
      // Legacy support
      case 'text':
        return <TextComponent {...element.props} />;
      
      default:
        return <div className="text-gray-500 text-sm">Unknown component: {element.type}</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      data-element-id={element.id}
      style={style}
      className={`
        relative
        ${isDragging ? 'opacity-90' : ''}
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div {...listeners} {...attributes} className="cursor-move" style={{ width: '100%', height: '100%', display: 'inline-block' }}>
        {renderElement()}
      </div>
      {isSelected && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-20 shadow-lg"
            title="Delete"
          >
            ×
          </button>
          {onResize && (
            <ResizeHandles
              element={element}
              onResize={onResize}
            />
          )}
        </>
      )}
    </div>
  );
}