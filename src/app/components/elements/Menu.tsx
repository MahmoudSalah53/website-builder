interface MenuProps {
  menuItems?: Array<{ 
    label: string; 
    href: string; 
    children?: Array<{ label: string; href: string }> 
  }>;
}

export default function MenuComponent({ 
  menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#', children: [
      { label: 'Product 1', href: '#' },
      { label: 'Product 2', href: '#' }
    ]},
    { label: 'About', href: '#' }
  ]
}: MenuProps) {
  return (
    <nav className="pointer-events-none">
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <li key={index} className="relative">
            <a
              href={item.href}
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-[#252525] rounded transition-colors"
            >
              {item.label}
            </a>
            {item.children && item.children.length > 0 && (
              <ul className="ml-4 mt-1">
                {item.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <a
                      href={child.href}
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#252525] rounded transition-colors"
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
