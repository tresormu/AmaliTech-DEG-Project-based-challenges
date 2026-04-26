function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-sf-border bg-sf-pane px-6">
      <div>
        <h1 className="m-0 text-xl font-semibold text-sf-deep">SupportFlow</h1>
        <p className="mt-0.5 text-xs text-sf-mid">Visual Decision Builder</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-[#93c7aa] bg-[#f9fffb] px-3 py-2 text-xs text-[#1f4a32] transition hover:border-sf-primary/60"
        >
          Editor Mode
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-sf-primary bg-sf-primary px-3 py-2 text-xs font-medium text-white transition hover:border-sf-primaryDark hover:bg-sf-primaryDark"
        >
          Play Preview
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
