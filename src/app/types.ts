// Core Elements
export type CoreElementType = 
  | 'heading' | 'paragraph' | 'button' | 'image' | 'icon' | 'divider' | 'spacer';

// Layout Elements
export type LayoutElementType = 
  | 'section' | 'container' | 'row' | 'column' | 'grid' | 'card' | 'tabs';

// Media Components
export type MediaElementType = 
  | 'image-gallery' | 'image-carousel' | 'video-embed' | 'video-player';

// Form Elements
export type FormElementType = 
  | 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch';

// Navigation Elements
export type NavigationElementType = 
  | 'navbar' | 'sidebar-nav' | 'menu' | 'footer';

// All Element Types
export type ElementType = 
  | CoreElementType 
  | LayoutElementType 
  | MediaElementType 
  | FormElementType 
  | NavigationElementType;

export type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
export type DisplayType = 'block' | 'inline' | 'inline-block' | 'flex' | 'grid' | 'none';

export interface Element {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  zIndex?: number;
  locked?: boolean;
  visible?: boolean;
  props: ElementProps;
  styles?: CustomStyles;
}

export interface CustomStyles {
  // Positioning
  position?: PositionType;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  
  // Display & Layout
  display?: DisplayType;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: string;
  
  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration?: 'none' | 'underline' | 'line-through' | 'overline';
  fontStyle?: 'normal' | 'italic' | 'oblique';
  
  // Colors
  color?: string;
  backgroundColor?: string;
  opacity?: number;
  
  // Spacing
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  
  // Borders
  border?: string;
  borderWidth?: string;
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
  borderColor?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  
  // Effects
  boxShadow?: string;
  textShadow?: string;
  filter?: string;
  backdropFilter?: string;
  
  // Transform
  transform?: string;
  transformOrigin?: string;
  rotate?: string;
  scale?: string;
  translateX?: string;
  translateY?: string;
  
  // Transition & Animation
  transition?: string;
  animation?: string;
  
  // Overflow
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
  
  // Custom CSS
  customCSS?: string;
}

export interface ElementProps {
  // Text/Heading props
  content?: string;
  textType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  
  // Button props
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  icon?: string;
  
  // Image props
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  
  // Icon props
  iconName?: string;
  iconSize?: 'small' | 'medium' | 'large';
  iconColor?: string;
  
  // Divider props
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  
  // Spacer props
  spacing?: number;
  
  // Container/Section props
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  
  // Column/Row props
  columns?: number;
  gap?: number;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  
  // Grid props
  gridColumns?: number;
  gridRows?: number;
  gridGap?: number;
  
  // Card props
  title?: string;
  description?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: number;
  
  // Tabs props
  tabs?: string[];
  activeTab?: number;
  
  // Gallery/Carousel props
  images?: string[];
  autoplay?: boolean;
  interval?: number;
  
  // Video props
  videoUrl?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  
  // Form props
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  disabled?: boolean;
  value?: string;
  options?: string[];
  checked?: boolean;
  label?: string;
  
  // Textarea props
  rows?: number;
  
  // Select props
  multiple?: boolean;
  
  // Navigation props
  links?: Array<{ label: string; href: string }>;
  logo?: string;
  logoText?: string;
  menuItems?: Array<{ label: string; href: string; children?: Array<{ label: string; href: string }> }>;
  
  // Footer props
  copyright?: string;
  columns?: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
}