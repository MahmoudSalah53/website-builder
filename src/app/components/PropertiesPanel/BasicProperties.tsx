'use client';

import { Element } from '../../types';

interface BasicPropertiesProps {
  element: Element;
  onUpdate: (id: string, props: any) => void;
}

export default function BasicProperties({ element, onUpdate }: BasicPropertiesProps) {
  const updateProp = (key: string, value: any) => {
    onUpdate(element.id, { [key]: value });
  };

  const inputClass = "w-full px-3 py-2 bg-[#252525] border border-[#2a2a2a] rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm text-gray-300 mb-2";

  // Render basic properties based on element type
  const renderBasicProps = () => {
    switch (element.type) {
      case 'heading':
        return (
          <>
            <div>
              <label className={labelClass}>Content</label>
              <input
                type="text"
                value={element.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Heading Type</label>
              <select
                value={element.props.textType || 'h1'}
                onChange={(e) => updateProp('textType', e.target.value)}
                className={inputClass}
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Text Align</label>
              <select
                value={element.props.textAlign || 'left'}
                onChange={(e) => updateProp('textAlign', e.target.value)}
                className={inputClass}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Color</label>
              <input
                type="color"
                value={element.props.color || '#ededed'}
                onChange={(e) => updateProp('color', e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
          </>
        );

      case 'paragraph':
        return (
          <>
            <div>
              <label className={labelClass}>Content</label>
              <textarea
                value={element.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
                className={inputClass}
                rows={4}
              />
            </div>
            <div>
              <label className={labelClass}>Text Align</label>
              <select
                value={element.props.textAlign || 'left'}
                onChange={(e) => updateProp('textAlign', e.target.value)}
                className={inputClass}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Color</label>
              <input
                type="color"
                value={element.props.color || '#ededed'}
                onChange={(e) => updateProp('color', e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
          </>
        );

      case 'button':
        return (
          <>
            <div>
              <label className={labelClass}>Label</label>
              <input
                type="text"
                value={element.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Size</label>
                <select
                  value={element.props.size || 'medium'}
                  onChange={(e) => updateProp('size', e.target.value)}
                  className={inputClass}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Variant</label>
                <select
                  value={element.props.variant || 'primary'}
                  onChange={(e) => updateProp('variant', e.target.value)}
                  className={inputClass}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                  <option value="ghost">Ghost</option>
                  <option value="danger">Danger</option>
                </select>
              </div>
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <div>
              <label className={labelClass}>Image URL</label>
              <input
                type="text"
                value={element.props.src || ''}
                onChange={(e) => updateProp('src', e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className={labelClass}>Alt Text</label>
              <input
                type="text"
                value={element.props.alt || ''}
                onChange={(e) => updateProp('alt', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Width</label>
                <input
                  type="number"
                  value={element.props.width || 400}
                  onChange={(e) => updateProp('width', parseInt(e.target.value) || 400)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Height</label>
                <input
                  type="number"
                  value={element.props.height || 300}
                  onChange={(e) => updateProp('height', parseInt(e.target.value) || 300)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Object Fit</label>
              <select
                value={element.props.objectFit || 'cover'}
                onChange={(e) => updateProp('objectFit', e.target.value)}
                className={inputClass}
              >
                <option value="contain">Contain</option>
                <option value="cover">Cover</option>
                <option value="fill">Fill</option>
                <option value="none">None</option>
                <option value="scale-down">Scale Down</option>
              </select>
            </div>
          </>
        );

      case 'navbar':
        const navbarLinks = element.props.links || [];
        return (
          <>
            <div>
              <label className={labelClass}>Logo Text</label>
              <input
                type="text"
                value={element.props.logoText || 'Logo'}
                onChange={(e) => updateProp('logoText', e.target.value)}
                className={inputClass}
                placeholder="Logo"
              />
            </div>
            <div>
              <label className={labelClass}>Logo Image URL (Optional)</label>
              <input
                type="text"
                value={element.props.logo || ''}
                onChange={(e) => updateProp('logo', e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            
            <div className="my-4 border-t border-[#2a2a2a] pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass}>Navigation Links</label>
                <button
                  onClick={() => {
                    const newLinks = [...navbarLinks, { label: 'New Link', href: '#' }];
                    updateProp('links', newLinks);
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                  + Add Link
                </button>
              </div>
              
              <div className="space-y-3">
                {navbarLinks.map((link: any, index: number) => (
                  <div key={index} className="p-3 bg-[#252525] rounded border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Link {index + 1}</span>
                      <button
                        onClick={() => {
                          const newLinks = navbarLinks.filter((_: any, i: number) => i !== index);
                          updateProp('links', newLinks);
                        }}
                        className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={link.label || ''}
                        onChange={(e) => {
                          const newLinks = [...navbarLinks];
                          newLinks[index] = { ...newLinks[index], label: e.target.value };
                          updateProp('links', newLinks);
                        }}
                        className={inputClass}
                        placeholder="Link Label (e.g., Home)"
                      />
                      <input
                        type="text"
                        value={link.href || ''}
                        onChange={(e) => {
                          const newLinks = [...navbarLinks];
                          newLinks[index] = { ...newLinks[index], href: e.target.value };
                          updateProp('links', newLinks);
                        }}
                        className={inputClass}
                        placeholder="Link URL (e.g., /home or #)"
                      />
                    </div>
                  </div>
                ))}
                {navbarLinks.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-2">No links yet. Click "Add Link" to add one.</p>
                )}
              </div>
            </div>
          </>
        );

      case 'footer':
        const footerColumns = element.props.columns || [];
        return (
          <>
            <div>
              <label className={labelClass}>Copyright Text</label>
              <input
                type="text"
                value={element.props.copyright || ''}
                onChange={(e) => updateProp('copyright', e.target.value)}
                className={inputClass}
                placeholder="© 2024 Company Name"
              />
            </div>
            
            <div className="my-4 border-t border-[#2a2a2a] pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass}>Footer Columns</label>
                <button
                  onClick={() => {
                    const newColumns = [...footerColumns, { title: 'New Column', links: [] }];
                    updateProp('columns', newColumns);
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                  + Add Column
                </button>
              </div>
              
              <div className="space-y-4">
                {footerColumns.map((column: any, colIndex: number) => (
                  <div key={colIndex} className="p-3 bg-[#252525] rounded border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={column.title || ''}
                        onChange={(e) => {
                          const newColumns = [...footerColumns];
                          newColumns[colIndex] = { ...newColumns[colIndex], title: e.target.value };
                          updateProp('columns', newColumns);
                        }}
                        className={`${inputClass} flex-1 mr-2`}
                        placeholder="Column Title"
                      />
                      <button
                        onClick={() => {
                          const newColumns = footerColumns.filter((_: any, i: number) => i !== colIndex);
                          updateProp('columns', newColumns);
                        }}
                        className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Links in this column</span>
                        <button
                          onClick={() => {
                            const newColumns = [...footerColumns];
                            const columnLinks = newColumns[colIndex].links || [];
                            columnLinks.push({ label: 'New Link', href: '#' });
                            newColumns[colIndex] = { ...newColumns[colIndex], links: columnLinks };
                            updateProp('columns', newColumns);
                          }}
                          className="px-2 py-1 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white text-xs rounded transition-colors"
                        >
                          + Add Link
                        </button>
                      </div>
                      
                      {(column.links || []).map((link: any, linkIndex: number) => (
                        <div key={linkIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={link.label || ''}
                            onChange={(e) => {
                              const newColumns = [...footerColumns];
                              const columnLinks = [...(newColumns[colIndex].links || [])];
                              columnLinks[linkIndex] = { ...columnLinks[linkIndex], label: e.target.value };
                              newColumns[colIndex] = { ...newColumns[colIndex], links: columnLinks };
                              updateProp('columns', newColumns);
                            }}
                            className={`${inputClass} flex-1`}
                            placeholder="Link Label"
                          />
                          <input
                            type="text"
                            value={link.href || ''}
                            onChange={(e) => {
                              const newColumns = [...footerColumns];
                              const columnLinks = [...(newColumns[colIndex].links || [])];
                              columnLinks[linkIndex] = { ...columnLinks[linkIndex], href: e.target.value };
                              newColumns[colIndex] = { ...newColumns[colIndex], links: columnLinks };
                              updateProp('columns', newColumns);
                            }}
                            className={`${inputClass} flex-1`}
                            placeholder="URL"
                          />
                          <button
                            onClick={() => {
                              const newColumns = [...footerColumns];
                              const columnLinks = (newColumns[colIndex].links || []).filter((_: any, i: number) => i !== linkIndex);
                              newColumns[colIndex] = { ...newColumns[colIndex], links: columnLinks };
                              updateProp('columns', newColumns);
                            }}
                            className="text-red-400 hover:text-red-300 text-xs px-2 rounded hover:bg-red-500/10 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case 'input':
        return (
          <>
            <div>
              <label className={labelClass}>Label</label>
              <input
                type="text"
                value={element.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className={inputClass}
                placeholder="Input Label"
              />
            </div>
            <div>
              <label className={labelClass}>Placeholder</label>
              <input
                type="text"
                value={element.props.placeholder || ''}
                onChange={(e) => updateProp('placeholder', e.target.value)}
                className={inputClass}
                placeholder="Enter text..."
              />
            </div>
            <div>
              <label className={labelClass}>Size</label>
              <select
                value={element.props.size || 'medium'}
                onChange={(e) => updateProp('size', e.target.value)}
                className={inputClass}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </>
        );

      case 'textarea':
        return (
          <>
            <div>
              <label className={labelClass}>Label</label>
              <input
                type="text"
                value={element.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className={inputClass}
                placeholder="Textarea Label"
              />
            </div>
            <div>
              <label className={labelClass}>Placeholder</label>
              <input
                type="text"
                value={element.props.placeholder || ''}
                onChange={(e) => updateProp('placeholder', e.target.value)}
                className={inputClass}
                placeholder="Enter text..."
              />
            </div>
            <div>
              <label className={labelClass}>Rows</label>
              <input
                type="number"
                value={element.props.rows || 4}
                onChange={(e) => updateProp('rows', parseInt(e.target.value) || 4)}
                className={inputClass}
                min="1"
              />
            </div>
          </>
        );

      case 'select':
        const selectOptions = element.props.options || [];
        return (
          <>
            <div>
              <label className={labelClass}>Label</label>
              <input
                type="text"
                value={element.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className={inputClass}
                placeholder="Select Label"
              />
            </div>
            <div>
              <label className={labelClass}>Placeholder</label>
              <input
                type="text"
                value={element.props.placeholder || ''}
                onChange={(e) => updateProp('placeholder', e.target.value)}
                className={inputClass}
                placeholder="Select an option..."
              />
            </div>
            
            <div className="my-4 border-t border-[#2a2a2a] pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass}>Options</label>
                <button
                  onClick={() => {
                    const newOptions = [...selectOptions, `Option ${selectOptions.length + 1}`];
                    updateProp('options', newOptions);
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                  + Add Option
                </button>
              </div>
              
              <div className="space-y-2">
                {selectOptions.map((option: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...selectOptions];
                        newOptions[index] = e.target.value;
                        updateProp('options', newOptions);
                      }}
                      className={inputClass}
                      placeholder="Option text"
                    />
                    <button
                      onClick={() => {
                        const newOptions = selectOptions.filter((_: string, i: number) => i !== index);
                        updateProp('options', newOptions);
                      }}
                      className="text-red-400 hover:text-red-300 text-xs px-2 rounded hover:bg-red-500/10 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {selectOptions.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-2">No options yet. Click "Add Option" to add one.</p>
                )}
              </div>
            </div>
          </>
        );

      case 'checkbox':
        return (
          <>
            <div>
              <label className={labelClass}>Label</label>
              <input
                type="text"
                value={element.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className={inputClass}
                placeholder="Checkbox Label"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={element.props.checked || false}
                  onChange={(e) => updateProp('checked', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className={labelClass}>Checked</span>
              </label>
            </div>
          </>
        );

      case 'radio':
        return (
          <>
            <div>
              <label className={labelClass}>Label</label>
              <input
                type="text"
                value={element.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className={inputClass}
                placeholder="Radio Label"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={element.props.checked || false}
                  onChange={(e) => updateProp('checked', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className={labelClass}>Checked</span>
              </label>
            </div>
          </>
        );

      case 'switch':
        return (
          <>
            <div>
              <label className={labelClass}>Label</label>
              <input
                type="text"
                value={element.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className={inputClass}
                placeholder="Switch Label"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={element.props.checked || false}
                  onChange={(e) => updateProp('checked', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className={labelClass}>Checked</span>
              </label>
            </div>
          </>
        );

      case 'image-gallery':
      case 'image-carousel':
        const galleryImages = element.props.images || [];
        return (
          <>
            <div className="my-4 border-t border-[#2a2a2a] pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass}>Images</label>
                <button
                  onClick={() => {
                    const newImages = [...galleryImages, 'https://via.placeholder.com/400x300'];
                    updateProp('images', newImages);
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                  + Add Image
                </button>
              </div>
              
              <div className="space-y-2">
                {galleryImages.map((imageUrl: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => {
                        const newImages = [...galleryImages];
                        newImages[index] = e.target.value;
                        updateProp('images', newImages);
                      }}
                      className={inputClass}
                      placeholder="Image URL"
                    />
                    <button
                      onClick={() => {
                        const newImages = galleryImages.filter((_: string, i: number) => i !== index);
                        updateProp('images', newImages);
                      }}
                      className="text-red-400 hover:text-red-300 text-xs px-2 rounded hover:bg-red-500/10 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {galleryImages.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-2">No images yet. Click "Add Image" to add one.</p>
                )}
              </div>
            </div>
          </>
        );

      case 'menu':
      case 'sidebar-nav':
        const menuItems = element.props.menuItems || [];
        return (
          <>
            <div className="my-4 border-t border-[#2a2a2a] pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass}>Menu Items</label>
                <button
                  onClick={() => {
                    const newItems = [...menuItems, { label: 'New Item', href: '#' }];
                    updateProp('menuItems', newItems);
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                  + Add Item
                </button>
              </div>
              
              <div className="space-y-3">
                {menuItems.map((item: any, index: number) => (
                  <div key={index} className="p-3 bg-[#252525] rounded border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Item {index + 1}</span>
                      <button
                        onClick={() => {
                          const newItems = menuItems.filter((_: any, i: number) => i !== index);
                          updateProp('menuItems', newItems);
                        }}
                        className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={item.label || ''}
                        onChange={(e) => {
                          const newItems = [...menuItems];
                          newItems[index] = { ...newItems[index], label: e.target.value };
                          updateProp('menuItems', newItems);
                        }}
                        className={inputClass}
                        placeholder="Menu Item Label (e.g., Home)"
                      />
                      <input
                        type="text"
                        value={item.href || ''}
                        onChange={(e) => {
                          const newItems = [...menuItems];
                          newItems[index] = { ...newItems[index], href: e.target.value };
                          updateProp('menuItems', newItems);
                        }}
                        className={inputClass}
                        placeholder="Menu Item URL (e.g., /home or #)"
                      />
                    </div>
                  </div>
                ))}
                {menuItems.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-2">No menu items yet. Click "Add Item" to add one.</p>
                )}
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="text-gray-500 text-sm">
            Basic properties for this element type.
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderBasicProps()}
    </div>
  );
}
