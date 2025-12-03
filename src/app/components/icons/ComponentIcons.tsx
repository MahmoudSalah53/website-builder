interface IconBoxProps {
  children: React.ReactNode;
}

const IconBox = ({ children }: IconBoxProps) => (
  <div className="w-5 h-5 text-gray-300">{children}</div>
);

export const ComponentIcons = {
  Heading: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 4h2v6h8V4h2v16h-2v-6H8v6H6V4z" />
      </svg>
    </IconBox>
  ),
  Paragraph: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    </IconBox>
  ),
  Button: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="7" width="18" height="10" rx="2" />
        <path d="M8 12h8" />
      </svg>
    </IconBox>
  ),
  Image: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </IconBox>
  ),
  Icon: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </IconBox>
  ),
  Divider: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12h16" />
      </svg>
    </IconBox>
  ),
  Spacer: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 4v16M4 12h16" />
      </svg>
    </IconBox>
  ),
  Section: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    </IconBox>
  ),
  Container: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 8h20M8 4v16" />
      </svg>
    </IconBox>
  ),
  Row: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="7" width="18" height="10" rx="1" />
        <path d="M9 7v10M15 7v10" />
      </svg>
    </IconBox>
  ),
  Column: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="7" y="3" width="10" height="18" rx="1" />
        <path d="M7 9h10M7 15h10" />
      </svg>
    </IconBox>
  ),
  Grid: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    </IconBox>
  ),
  Card: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 4v6" />
      </svg>
    </IconBox>
  ),
  Tabs: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 8h20M6 4v4" />
      </svg>
    </IconBox>
  ),
  ImageGallery: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </svg>
    </IconBox>
  ),
  ImageCarousel: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="7" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="17" cy="12" r="1" />
        <path d="M2 10h20M2 14h20" />
      </svg>
    </IconBox>
  ),
  VideoEmbed: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </IconBox>
  ),
  VideoPlayer: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M8 12h8M12 8v8" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    </IconBox>
  ),
  Input: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="7" width="18" height="10" rx="2" />
        <path d="M7 12h10" />
      </svg>
    </IconBox>
  ),
  Textarea: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 10h10M7 14h10M7 18h6" />
      </svg>
    </IconBox>
  ),
  Select: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9 9 9-9M12 18V9" />
      </svg>
    </IconBox>
  ),
  Checkbox: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 12l3 3 7-7" />
      </svg>
    </IconBox>
  ),
  Radio: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </svg>
    </IconBox>
  ),
  Switch: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="10" rx="5" />
        <circle cx="7" cy="12" r="3" fill="currentColor" />
      </svg>
    </IconBox>
  ),
  Navbar: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <path d="M3 8h18M8 4v4" />
      </svg>
    </IconBox>
  ),
  Sidebar: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="6" height="18" rx="1" />
        <path d="M3 8h6M3 12h6M3 16h6" />
      </svg>
    </IconBox>
  ),
  Menu: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    </IconBox>
  ),
  Footer: () => (
    <IconBox>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="16" width="18" height="4" rx="1" />
        <path d="M3 16h18M8 16v4M16 16v4" />
      </svg>
    </IconBox>
  ),
};
