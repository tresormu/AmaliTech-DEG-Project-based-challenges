function AppHeader({ isPreviewMode, onToggleMode }) {
  return (
    <header className="flex items-center justify-between border-b border-sf-border bg-sf-pane px-6 h-[72px] shrink-0">
      <div>
        <h1 className="m-0 text-xl font-semibold text-sf-deep">SupportFlow</h1>
        <p className="mt-0.5 text-xs text-sf-mid">Visual Decision Builder</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => isPreviewMode && onToggleMode()}
          className={`cursor-pointer rounded-lg border px-3 py-2 text-xs transition-all duration-200 ${
            !isPreviewMode
              ? "border-sf-primary bg-sf-primary/10 text-sf-primary font-semibold shadow-sm"
              : "border-[#93c7aa] bg-[#f9fffb] text-[#1f4a32] hover:border-sf-primary/60"
          }`}
        >
          Editor Mode
        </button>
        <button
          type="button"
          onClick={() => !isPreviewMode && onToggleMode()}
          className={`cursor-pointer rounded-lg border px-3 py-2 text-xs transition-all duration-200 ${
            isPreviewMode
              ? "border-sf-primary bg-sf-primary text-white font-semibold shadow-sm"
              : "border-sf-primary bg-white text-sf-primary hover:bg-sf-primary/5"
          }`}
        >
          {isPreviewMode ? "Playing Preview" : "Play Preview"}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
