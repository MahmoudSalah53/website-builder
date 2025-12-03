interface FooterProps {
  copyright?: string;
  columns?: Array<{ 
    title: string; 
    links: Array<{ label: string; href: string }> 
  }>;
}

export default function FooterComponent({ 
  copyright = '© 2024 Your Company. All rights reserved.',
  columns = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' }
      ]
    }
  ]
}: FooterProps) {
  return (
    <footer className="pointer-events-none bg-[#1a1a1a] border-t border-[#2a2a2a] px-6 py-8">
      <div className="grid grid-cols-3 gap-8 mb-6">
        {columns.map((column, index) => (
          <div key={index}>
            <h4 className="text-white font-semibold mb-3">{column.title}</h4>
            <ul className="flex flex-col gap-2">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-6 border-t border-[#2a2a2a]">
        <p className="text-gray-500 text-sm text-center">{copyright}</p>
      </div>
    </footer>
  );
}
