'use client';

import { useDraggable } from '@dnd-kit/core';
import { ElementType } from '../types';
import { ComponentIcons } from './icons/ComponentIcons';

interface DraggableComponentProps {
  id: string;
  type: ElementType;
  label: string;
  icon: React.ReactNode;
  category: string;
}

function DraggableComponent({ id, type, label, icon, category }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `component-${type}`,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        group p-3 bg-[#252525] hover:bg-[#2a2a2a] rounded-lg cursor-grab active:cursor-grabbing 
        border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] 
                       flex items-center justify-center transition-colors group-hover:border-[#3a3a3a]">
          <div className="text-gray-400">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white truncate">{label}</div>
          <div className="text-xs text-gray-500 truncate">{category}</div>
        </div>
      </div>
    </div>
  );
}

interface ComponentGroup {
  title: string;
  components: Array<{ type: ElementType; label: string; icon: keyof typeof ComponentIcons }>;
}

export default function Sidebar() {
  const componentGroups: ComponentGroup[] = [
    {
      title: 'Core Elements',
      components: [
        { type: 'heading', label: 'Heading', icon: 'Heading' },
        { type: 'paragraph', label: 'Paragraph', icon: 'Paragraph' },
        { type: 'button', label: 'Button', icon: 'Button' },
        { type: 'image', label: 'Image', icon: 'Image' },
        { type: 'icon', label: 'Icon', icon: 'Icon' },
      ],
    },
    {
      title: 'Media Components',
      components: [
        { type: 'image-gallery', label: 'Image Gallery', icon: 'ImageGallery' },
        { type: 'image-carousel', label: 'Image Carousel', icon: 'ImageCarousel' },
      ],
    },
    {
      title: 'Form Elements',
      components: [
        { type: 'input', label: 'Input', icon: 'Input' },
        { type: 'textarea', label: 'Textarea', icon: 'Textarea' },
        { type: 'select', label: 'Select', icon: 'Select' },
        { type: 'checkbox', label: 'Checkbox', icon: 'Checkbox' },
        { type: 'radio', label: 'Radio', icon: 'Radio' },
        { type: 'switch', label: 'Switch', icon: 'Switch' },
      ],
    },
    {
      title: 'Navigation',
      components: [
        { type: 'navbar', label: 'Navbar', icon: 'Navbar' },
        { type: 'sidebar-nav', label: 'Sidebar', icon: 'Sidebar' },
        { type: 'menu', label: 'Menu', icon: 'Menu' },
        { type: 'footer', label: 'Footer', icon: 'Footer' },
      ],
    },
  ];

  return (
    <aside className="w-72 bg-[#1a1a1a] border-r border-[#2a2a2a] overflow-y-scroll scrollbar-hide">
      <div className="p-5">
        {/* Clean Header */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-white mb-1">Components</h2>
          <p className="text-xs text-gray-500">Drag to canvas</p>
        </div>
        
        <div className="space-y-6">
          {componentGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider">
                {group.title}
              </h3>
              <div className="space-y-1.5">
                {group.components.map((comp) => {
                  const Icon = ComponentIcons[comp.icon];
                  return (
                    <DraggableComponent
                      key={comp.type}
                      id={`component-${comp.type}`}
                      type={comp.type}
                      label={comp.label}
                      icon={<Icon />}
                      category={group.title}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}