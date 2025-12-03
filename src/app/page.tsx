'use client';

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, useDndMonitor } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import LayersPanel from './components/LayersPanel';
import { Element, ElementType } from './types';
// Import all element components for DragOverlay
import ButtonComponent from './components/elements/Button';
import InputComponent from './components/elements/Input';
import TextComponent from './components/elements/Text';
import HeadingComponent from './components/elements/Heading';
import ParagraphComponent from './components/elements/Paragraph';
import ImageComponent from './components/elements/Image';
import IconComponent from './components/elements/Icon';
import TextareaComponent from './components/elements/Textarea';
import SelectComponent from './components/elements/Select';
import CheckboxComponent from './components/elements/Checkbox';
import RadioComponent from './components/elements/Radio';
import SwitchComponent from './components/elements/Switch';
import NavbarComponent from './components/elements/Navbar';
import MenuComponent from './components/elements/Menu';
import FooterComponent from './components/elements/Footer';
import SectionComponent from './components/elements/Section';
import ContainerComponent from './components/elements/Container';
import RowComponent from './components/elements/Row';
import ColumnComponent from './components/elements/Column';
import GridComponent from './components/elements/Grid';
import CardComponent from './components/elements/Card';
import TabsComponent from './components/elements/Tabs';
import ImageGalleryComponent from './components/elements/ImageGallery';
import ImageCarouselComponent from './components/elements/ImageCarousel';

export default function Home() {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [nextId, setNextId] = useState(1);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(10);
  const [copiedElement, setCopiedElement] = useState<Element | null>(null);
  const [currentMousePosition, setCurrentMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [pendingActiveId, setPendingActiveId] = useState<string | null>(null);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false); // Panel closed by default
  const [isLayersPanelOpen, setIsLayersPanelOpen] = useState(false); // Panel closed by default
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Load saved elements on mount
  useEffect(() => {
    const saved = localStorage.getItem('web-builder-elements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setElements(parsed);
          setNextId(Math.max(...parsed.map((el: Element) => parseInt(el.id.replace('element-', '')) || 0)) + 1);
        }
      } catch (error) {
        console.error('Error loading saved elements:', error);
      }
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setCurrentMousePosition(null);
  };

  // Track mouse position during drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeId) {
        const canvasElement = document.getElementById('canvas-drop-zone');
        if (canvasElement) {
          const canvasRect = canvasElement.getBoundingClientRect();
          setCurrentMousePosition({
            x: e.clientX - canvasRect.left + (canvasElement.scrollLeft || 0),
            y: e.clientY - canvasRect.top + (canvasElement.scrollTop || 0)
          });
        }
      }
    };

    if (activeId) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [activeId]);

  // Clear activeId only after element is confirmed in elements array
  useEffect(() => {
    if (pendingActiveId) {
      const elementExists = elements.some(el => el.id === pendingActiveId);
      if (elementExists) {
        // Element is now in the array, safe to clear overlay
        requestAnimationFrame(() => {
          setActiveId(null);
          setPendingActiveId(null);
        });
      }
    }
  }, [elements, pendingActiveId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    // Mark activeId as pending - we'll clear it after element is confirmed in DOM
    if (active.id) {
      setPendingActiveId(active.id as string);
    }

    if (!over || over.id !== 'canvas') return;

    // If dragging from sidebar (component type)
    if (typeof active.id === 'string' && active.id.startsWith('component-')) {
      const componentType = active.id.replace('component-', '') as ElementType;
      
      // Get canvas element position
      const canvasElement = document.getElementById('canvas-drop-zone');
      if (!canvasElement) return;
      
      const canvasRect = canvasElement.getBoundingClientRect();
      
      // Get current mouse position at drop time
      // Use the tracked mouse position if available (most accurate)
      let dropX = 100;
      let dropY = 100;
      
      const canvasScrollLeft = canvasElement.scrollLeft || 0;
      const canvasScrollTop = canvasElement.scrollTop || 0;
      
      // Priority 1: Use tracked mouse position (most accurate)
      if (currentMousePosition) {
        dropX = currentMousePosition.x;
        dropY = currentMousePosition.y;
      } 
      // Priority 2: Calculate from delta + initial position
      else {
        const pointerEvent = event.activatorEvent as PointerEvent;
        if (pointerEvent && delta) {
          const finalMouseX = pointerEvent.clientX + delta.x;
          const finalMouseY = pointerEvent.clientY + delta.y;
          
          dropX = finalMouseX - canvasRect.left + canvasScrollLeft;
          dropY = finalMouseY - canvasRect.top + canvasScrollTop;
        } 
        // Priority 3: Use current mouse position from pointer event
        else if (pointerEvent) {
          dropX = pointerEvent.clientX - canvasRect.left + canvasScrollLeft;
          dropY = pointerEvent.clientY - canvasRect.top + canvasScrollTop;
        } 
        // Fallback: center of visible canvas
        else {
          dropX = (canvasRect.width / 2) + canvasScrollLeft;
          dropY = (canvasRect.height / 2) + canvasScrollTop;
        }
      }
      
      let canvasX = Math.max(0, dropX);
      let canvasY = Math.max(0, dropY);
      
      // Snap to grid if enabled
      if (snapToGrid) {
        canvasX = Math.round(canvasX / gridSize) * gridSize;
        canvasY = Math.round(canvasY / gridSize) * gridSize;
      }
      
      const newElement: Element = {
        id: `element-${nextId}`,
        type: componentType,
        x: canvasX,
        y: canvasY,
        props: getDefaultProps(componentType),
      };
      // Update state
      setElements([...elements, newElement]);
      setNextId(nextId + 1);
      setSelectedElement(newElement);
      
      // activeId will be cleared by useEffect when element is confirmed in elements array
    } 
    // If dragging existing element on canvas
    else if (typeof active.id === 'string' && active.id.startsWith('element-')) {
      const elementId = active.id;
      const element = elements.find(el => el.id === elementId);
      if (element && delta) {
        // Calculate new position based on delta
        // Delta is already relative to the canvas, so we can use it directly
        let newX = Math.max(0, element.x + delta.x);
        let newY = Math.max(0, element.y + delta.y);
        
        // Snap to grid if enabled
        if (snapToGrid) {
          newX = Math.round(newX / gridSize) * gridSize;
          newY = Math.round(newY / gridSize) * gridSize;
        }
        
        // Update state
        // Update state
        setElements(prev => prev.map(el => 
          el.id === elementId 
            ? { ...el, x: newX, y: newY }
            : el
        ));
        if (selectedElement?.id === elementId) {
          setSelectedElement(prev => {
            if (!prev) return null;
            return { ...prev, x: newX, y: newY };
          });
        }
        
        // For existing elements, clear activeId immediately after state update
        // since the element already exists in DOM
        requestAnimationFrame(() => {
          setActiveId(null);
          setPendingActiveId(null);
        });
      }
    }
  };

  const getDefaultProps = (type: ElementType): any => {
    switch (type) {
      // Core Elements
      case 'heading':
        return { content: 'Heading', textType: 'h1', textAlign: 'left' };
      case 'paragraph':
        return { content: 'Paragraph text', textAlign: 'left' };
      case 'button':
        return { label: 'Button', size: 'medium', variant: 'primary' };
      case 'image':
        return { src: 'https://via.placeholder.com/400x300?text=Image', alt: 'Image' };
      case 'icon':
        return { iconName: '⭐', iconSize: 'medium' };
      
      // Layout Elements
      case 'section':
        return { padding: '20px', backgroundColor: 'transparent' };
      case 'container':
        return { padding: '16px', maxWidth: '1200px' };
      case 'row':
        return { gap: 16, alignItems: 'start', justifyContent: 'start' };
      case 'column':
        return { columns: 2, gap: 16 };
      case 'grid':
        return { gridColumns: 3, gridRows: 2, gridGap: 16 };
      case 'card':
        return { title: 'Card Title', description: 'Card description', shadow: 'md' };
      case 'tabs':
        return { tabs: ['Tab 1', 'Tab 2', 'Tab 3'], activeTab: 0 };
      
      // Media Components
      case 'image-gallery':
        return { images: ['https://via.placeholder.com/300x200?text=1', 'https://via.placeholder.com/300x200?text=2'] };
      case 'image-carousel':
        return { images: ['https://via.placeholder.com/600x300?text=Slide+1'], autoplay: false };
      
      // Form Elements
      case 'input':
        return { label: 'Input', placeholder: 'Enter text...', size: 'medium' };
      case 'textarea':
        return { label: 'Textarea', placeholder: 'Enter text...', rows: 4 };
      case 'select':
        return { label: 'Select', options: ['Option 1', 'Option 2', 'Option 3'] };
      case 'checkbox':
        return { label: 'Checkbox', checked: false };
      case 'radio':
        return { label: 'Radio option', checked: false };
      case 'switch':
        return { label: 'Switch', checked: false };
      
      // Navigation Elements
      case 'navbar':
        return { logoText: 'Logo', links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }] };
      case 'sidebar-nav':
      case 'menu':
        return { menuItems: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }] };
      case 'footer':
        return { copyright: '© 2024 Your Company', columns: [{ title: 'Company', links: [] }] };
      
      // Legacy
      case 'text':
        return { content: 'Text', size: 'medium' };
      
      default:
        return {};
    }
  };

  const updateElement = (id: string, props: any) => {
    setElements(elements.map(el => el.id === id ? { ...el, props: { ...el.props, ...props } } : el));
    if (selectedElement?.id === id) {
      setSelectedElement({ ...selectedElement, props: { ...selectedElement.props, ...props } });
    }
  };

  const updateElementStyles = (id: string, styles: any) => {
    setElements(elements.map(el => {
      if (el.id === id) {
        const updatedStyles = { ...el.styles, ...styles };
        // Handle width/height updates
        const updated: any = { ...el, styles: updatedStyles };
        if (styles.width !== undefined) updated.width = styles.width;
        if (styles.height !== undefined) updated.height = styles.height;
        if (styles.zIndex !== undefined) updated.zIndex = styles.zIndex;
        return updated;
      }
      return el;
    }));
    if (selectedElement?.id === id) {
      const updatedStyles = { ...selectedElement.styles, ...styles };
      const updated: any = { ...selectedElement, styles: updatedStyles };
      if (styles.width !== undefined) updated.width = styles.width;
      if (styles.height !== undefined) updated.height = styles.height;
      if (styles.zIndex !== undefined) updated.zIndex = styles.zIndex;
      setSelectedElement(updated);
    }
  };

  const updateElementPosition = (id: string, x: number, y: number, width?: number, height?: number) => {
    setElements(elements.map(el => {
      if (el.id === id) {
        const updated: any = { ...el, x, y };
        if (width !== undefined) updated.width = width;
        if (height !== undefined) updated.height = height;
        return updated;
      }
      return el;
    }));
    if (selectedElement?.id === id) {
      const updated: any = { ...selectedElement, x, y };
      if (width !== undefined) updated.width = width;
      if (height !== undefined) updated.height = height;
      setSelectedElement(updated);
    }
  };

  const updateZIndex = (id: string, zIndex: number) => {
    setElements(elements.map(el => el.id === id ? { ...el, zIndex } : el));
    if (selectedElement?.id === id) {
      setSelectedElement({ ...selectedElement, zIndex });
    }
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newElement: Element = {
        ...element,
        id: `element-${nextId}`,
        x: element.x + 20,
        y: element.y + 20,
      };
      setElements([...elements, newElement]);
      setNextId(nextId + 1);
      setSelectedElement(newElement);
    }
  };

  const copyElement = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      setCopiedElement(element);
    }
  };

  const pasteElement = () => {
    if (copiedElement) {
      const newElement: Element = {
        ...copiedElement,
        id: `element-${nextId}`,
        x: copiedElement.x + 20,
        y: copiedElement.y + 20,
      };
      setElements([...elements, newElement]);
      setNextId(nextId + 1);
      setSelectedElement(newElement);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c' && selectedElement) {
          e.preventDefault();
          copyElement(selectedElement.id);
        } else if (e.key === 'v' && copiedElement) {
          e.preventDefault();
          pasteElement();
        } else if (e.key === 'd' && selectedElement) {
          e.preventDefault();
          duplicateElement(selectedElement.id);
        }
      }
      if (e.key === 'Delete' && selectedElement) {
        deleteElement(selectedElement.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, copiedElement]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-[#0f0f0f] text-[#ededed]">
        {/* Clean Top Bar */}
        <div className="h-14 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center px-6 gap-4 flex-shrink-0">
          {/* Title */}
          <h1 className="text-lg font-semibold text-white">
            Web Builder
          </h1>
          
          <div className="h-6 w-px bg-[#2a2a2a]" />
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                // Save to localStorage
                try {
                  localStorage.setItem('web-builder-elements', JSON.stringify(elements));
                  // Also download as JSON file
                  const data = JSON.stringify(elements, null, 2);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `website-${new Date().getTime()}.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  alert('Saved successfully!');
                } catch (error) {
                  alert('Error saving: ' + error);
                }
              }}
              className="px-4 py-2 text-sm font-medium bg-[#252525] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-white transition-colors"
            >
              Save
            </button>
            <button 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-4 py-2 text-sm font-medium border border-[#2a2a2a] rounded-lg transition-colors ${
                isPreviewMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-[#252525] hover:bg-[#2a2a2a] text-gray-300 hover:text-white'
              }`}
            >
              {isPreviewMode ? 'Exit Preview' : 'Preview'}
            </button>
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            {/* Snap to Grid Toggle */}
            <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#252525] border border-[#2a2a2a] hover:bg-[#2a2a2a] cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={snapToGrid}
                onChange={(e) => setSnapToGrid(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-xs font-medium text-gray-300">Snap to Grid</span>
            </label>
            
            <div className="h-6 w-px bg-[#2a2a2a]" />
            
            {/* Panel Toggles */}
            {selectedElement && (
              <button
                onClick={() => setIsPropertiesPanelOpen(!isPropertiesPanelOpen)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isPropertiesPanelOpen
                    ? 'bg-[#2a2a2a] text-white border border-[#3a3a3a]'
                    : 'bg-[#252525] text-gray-400 hover:text-white hover:bg-[#2a2a2a] border border-[#2a2a2a]'
                }`}
                title={isPropertiesPanelOpen ? 'Close Properties' : 'Open Properties'}
              >
                Properties
              </button>
            )}
            <button
              onClick={() => setIsLayersPanelOpen(!isLayersPanelOpen)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isLayersPanelOpen
                  ? 'bg-[#2a2a2a] text-white border border-[#3a3a3a]'
                  : 'bg-[#252525] text-gray-400 hover:text-white hover:bg-[#2a2a2a] border border-[#2a2a2a]'
              }`}
              title={isLayersPanelOpen ? 'Close Layers' : 'Open Layers'}
            >
              Layers
            </button>
          </div>
        </div>
        {isPreviewMode ? (
          <div className="flex-1 relative overflow-auto bg-[#0f0f0f]">
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setIsPreviewMode(false)}
                className="px-4 py-2 text-sm font-medium bg-[#252525] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-white transition-colors"
              >
                Exit Preview
              </button>
            </div>
            <div className="min-h-full relative" style={{ minHeight: '100vh' }}>
              {elements.map((element) => {
                const elementStyle: React.CSSProperties = {
                  position: (element.styles?.position as any) || 'absolute',
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  width: element.width ? `${element.width}px` : 'auto',
                  height: element.height ? `${element.height}px` : 'auto',
                  zIndex: element.zIndex || 1,
                  boxSizing: 'border-box',
                };

                if (element.styles) {
                  const styles = element.styles;
                  if (styles.color) elementStyle.color = styles.color;
                  if (styles.backgroundColor) elementStyle.backgroundColor = styles.backgroundColor;
                  if (styles.padding) elementStyle.padding = styles.padding;
                  if (styles.margin) elementStyle.margin = styles.margin;
                  if (styles.border) elementStyle.border = styles.border;
                  if (styles.borderRadius) elementStyle.borderRadius = styles.borderRadius;
                  if (styles.boxShadow) elementStyle.boxShadow = styles.boxShadow;
                  if (styles.opacity !== undefined) elementStyle.opacity = styles.opacity;
                  if (styles.fontSize) elementStyle.fontSize = styles.fontSize;
                  if (styles.fontWeight) elementStyle.fontWeight = styles.fontWeight;
                  if (styles.fontFamily) elementStyle.fontFamily = styles.fontFamily;
                  if (styles.textAlign) elementStyle.textAlign = styles.textAlign as any;
                }

                const componentStyle: React.CSSProperties = {
                  width: '100%',
                  height: '100%',
                  boxSizing: 'border-box',
                };

                let component = null;
                switch (element.type) {
                  case 'heading':
                    component = <HeadingComponent {...element.props} style={componentStyle} />;
                    break;
                  case 'paragraph':
                    component = <ParagraphComponent {...element.props} style={componentStyle} />;
                    break;
                  case 'button':
                    component = <ButtonComponent {...element.props} style={componentStyle} isPreview={true} />;
                    break;
                  case 'image':
                    component = <ImageComponent {...element.props} style={componentStyle} />;
                    break;
                  case 'icon':
                    component = <IconComponent {...element.props} style={componentStyle} />;
                    break;
                  case 'input':
                    component = <InputComponent {...element.props} style={componentStyle} isPreview={true} />;
                    break;
                  case 'textarea':
                    component = <TextareaComponent {...element.props} style={componentStyle} isPreview={true} />;
                    break;
                  case 'select':
                    component = <SelectComponent {...element.props} style={componentStyle} isPreview={true} />;
                    break;
                  case 'checkbox':
                    component = <CheckboxComponent {...element.props} style={componentStyle} isPreview={true} />;
                    break;
                  case 'radio':
                    component = <RadioComponent {...element.props} style={componentStyle} isPreview={true} />;
                    break;
                  case 'switch':
                    component = <SwitchComponent {...element.props} style={componentStyle} isPreview={true} />;
                    break;
                  case 'navbar':
                    component = <NavbarComponent {...element.props} />;
                    break;
                  case 'menu':
                  case 'sidebar-nav':
                    component = <MenuComponent {...element.props} />;
                    break;
                  case 'footer':
                    component = <FooterComponent {...element.props} />;
                    break;
                  case 'section':
                    component = <SectionComponent {...element.props} />;
                    break;
                  case 'container':
                    component = <ContainerComponent {...element.props} />;
                    break;
                  case 'row':
                    component = <RowComponent {...element.props} />;
                    break;
                  case 'column':
                    component = <ColumnComponent {...element.props} />;
                    break;
                  case 'grid':
                    component = <GridComponent {...element.props} />;
                    break;
                  case 'card':
                    component = <CardComponent {...element.props} />;
                    break;
                  case 'tabs':
                    component = <TabsComponent {...element.props} isPreview={true} />;
                    break;
                  case 'image-gallery':
                    component = <ImageGalleryComponent {...element.props} style={componentStyle} />;
                    break;
                  case 'image-carousel':
                    component = <ImageCarouselComponent {...element.props} style={componentStyle} isPreview={true} />;
                    break;
                  default:
                    component = null;
                }

                return component ? (
                  <div key={element.id} style={elementStyle}>
                    {component}
                  </div>
                ) : null;
              })}
              {elements.length === 0 && (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <p className="text-gray-500 text-lg mb-2">No content to preview</p>
                    <p className="text-gray-600 text-sm">Add elements to see them here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden relative">
            <Sidebar />
            <Canvas
              elements={elements}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onDeleteElement={deleteElement}
              onUpdateElementPosition={updateElementPosition}
              snapToGrid={snapToGrid}
              gridSize={gridSize}
              onDuplicate={duplicateElement}
              onCopy={copyElement}
              onPaste={pasteElement}
            />
            {/* Modern overlay panels - don't cover canvas */}
            {isLayersPanelOpen && (
              <div className="absolute right-0 top-0 bottom-0 z-40 animate-in slide-in-from-right duration-300">
                <LayersPanel
                  elements={elements}
                  selectedElement={selectedElement}
                  onSelectElement={setSelectedElement}
                  onDeleteElement={deleteElement}
                  onDuplicateElement={duplicateElement}
                  onUpdateZIndex={updateZIndex}
                  onClose={() => setIsLayersPanelOpen(false)}
                />
              </div>
            )}
            {selectedElement && isPropertiesPanelOpen && (
              <div 
                className="absolute top-0 bottom-0 z-40 animate-in slide-in-from-right duration-300" 
                style={{ right: isLayersPanelOpen ? '256px' : '0' }}
              >
                <PropertiesPanel
                  element={selectedElement}
                  onUpdate={updateElement}
                  onUpdateStyles={updateElementStyles}
                  onUpdatePosition={updateElementPosition}
                  onClose={() => setIsPropertiesPanelOpen(false)}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeId && activeId.startsWith('component-') ? (
          <div className="px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg opacity-90">
            <span className="text-sm font-medium">
              {activeId.replace('component-', '').charAt(0).toUpperCase() + activeId.replace('component-', '').slice(1)}
            </span>
          </div>
        ) : activeId && activeId.startsWith('element-') ? (
          (() => {
            const element = elements.find(el => el.id === activeId);
            if (!element) return null;
            
            // Use the same components as DraggableElement for exact match
            const overlayStyle: React.CSSProperties = {
              opacity: 0.9,
              pointerEvents: 'none',
            };
            
            // Apply element width/height if available
            if (element.width) overlayStyle.width = `${element.width}px`;
            if (element.height) overlayStyle.height = `${element.height}px`;
            
            // Render using actual components
            switch (element.type) {
              case 'heading':
                return <div style={overlayStyle}><HeadingComponent {...element.props} /></div>;
              case 'paragraph':
                return <div style={overlayStyle}><ParagraphComponent {...element.props} /></div>;
              case 'button':
                return <div style={overlayStyle}><ButtonComponent {...element.props} /></div>;
              case 'image':
                return <div style={overlayStyle}><ImageComponent {...element.props} /></div>;
              case 'icon':
                return <div style={overlayStyle}><IconComponent {...element.props} /></div>;
              case 'input':
                return <div style={overlayStyle}><InputComponent {...element.props} /></div>;
              case 'textarea':
                return <div style={overlayStyle}><TextareaComponent {...element.props} /></div>;
              case 'select':
                return <div style={overlayStyle}><SelectComponent {...element.props} /></div>;
              case 'checkbox':
                return <div style={overlayStyle}><CheckboxComponent {...element.props} /></div>;
              case 'radio':
                return <div style={overlayStyle}><RadioComponent {...element.props} /></div>;
              case 'switch':
                return <div style={overlayStyle}><SwitchComponent {...element.props} /></div>;
              case 'navbar':
                return <div style={overlayStyle}><NavbarComponent {...element.props} /></div>;
              case 'menu':
              case 'sidebar-nav':
                return <div style={overlayStyle}><MenuComponent {...element.props} /></div>;
              case 'footer':
                return <div style={overlayStyle}><FooterComponent {...element.props} /></div>;
              case 'text':
                return <div style={overlayStyle}><TextComponent {...element.props} /></div>;
              default:
                return <div style={overlayStyle} className="px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded text-white text-sm capitalize">{element.type.replace('-', ' ')}</div>;
            }
          })()
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}