function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-sv-border bg-sv-top px-5">
      <div className="text-[11px] font-bold tracking-[0.15em] text-[#36d3ea]">SECUREVAULT</div>
      <button
        type="button"
        className="cursor-pointer border border-sv-border bg-[#0a1729] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-sv-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ed4e2]"
      >
        Upload
      </button>
    </header>
  );
}

export default AppHeader;
