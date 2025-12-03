export default function Navbar() {
  return (
    <nav className="h-14 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white">Web Builder</h1>
        <div className="h-6 w-px bg-[#2a2a2a]" />
        <button className="px-3 py-1.5 text-sm bg-[#2a3a5a] hover:bg-[#2a4a6a] rounded text-white transition-colors">
          Save
        </button>
        <button className="px-3 py-1.5 text-sm bg-[#2a2a2a] hover:bg-[#353535] rounded text-white transition-colors">
          Preview
        </button>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <span className="text-sm text-gray-400">Dark Theme</span>
      </div>
    </nav>
  );
}
