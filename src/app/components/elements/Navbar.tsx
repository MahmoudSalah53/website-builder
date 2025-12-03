interface NavbarProps {
  logo?: string;
  logoText?: string;
  links?: Array<{ label: string; href: string }>;
}

export default function NavbarComponent({ 
  logo,
  logoText = 'Logo',
  links = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' }
  ]
}: NavbarProps) {
  return (
    <nav className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-4 w-full h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {logo && <img src={logo} alt="Logo" className="h-8" />}
          <span className="text-xl font-semibold text-white">{logoText}</span>
        </div>
        <div className="flex gap-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
