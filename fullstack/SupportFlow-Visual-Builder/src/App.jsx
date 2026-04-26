function App() {
  return (
    <div className="grid min-h-screen grid-rows-[72px_1fr] bg-sf-bg text-sf-text">
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

      <main className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-[1fr_320px]">
        <section
          className="min-h-[420px] rounded-xl border border-sf-border bg-sf-pane shadow-[0_16px_32px_rgba(40,80,56,0.15)]"
          aria-label="Flow canvas"
        >
          <div className="border-b border-sf-border px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-sf-mid">
            Canvas
          </div>
          <div className="p-4 text-sm text-[#2f5b42]">Node graph will render here in the next commit.</div>
        </section>

        <aside
          className="min-h-[420px] rounded-xl border border-sf-border bg-sf-pane shadow-[0_16px_32px_rgba(40,80,56,0.15)]"
          aria-label="Edit panel"
        >
          <div className="border-b border-sf-border px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-sf-mid">
            Node Editor
          </div>
          <div className="p-4 text-sm text-[#2f5b42]">Select a node to edit question text.</div>
        </aside>
      </main>
    </div>
  );
}

export default App;
