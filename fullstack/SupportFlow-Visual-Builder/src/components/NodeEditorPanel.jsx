function NodeEditorPanel({ selectedNode, nodeCount, onUpdateNode }) {
  const handleTextChange = (e) => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { text: e.target.value });
    }
  };

  return (
    <aside
      className="min-h-[420px] rounded-xl border border-sf-border bg-sf-pane shadow-[0_16px_32px_rgba(40,80,56,0.15)] flex flex-col"
      aria-label="Edit panel"
    >
      <div className="border-b border-sf-border px-4 py-4 flex items-center justify-between bg-sf-bg/30">
        <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-sf-mid">
          Node Configuration
        </h2>
        <span className="text-[10px] font-bold text-sf-primary/80 bg-white px-2 py-0.5 rounded border border-sf-border/50 shadow-sm">
          Live Editor
        </span>
      </div>
      <div className="p-5 flex-1 space-y-6 overflow-y-auto">
        {selectedNode ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
            <div className="rounded-xl bg-sf-bg/50 p-4 border border-sf-border/40 space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-sf-mid opacity-70">Selected Node</p>
              <p className="text-sm font-bold text-sf-deep flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sf-primary shadow-[0_0_8px_rgba(25,135,84,0.5)]" />
                ID #{selectedNode.id} — <span className="capitalize">{selectedNode.type}</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label htmlFor="node-text" className="text-[11px] font-bold uppercase tracking-wide text-sf-mid">
                  Question Text
                </label>
                <span className="text-[10px] text-sf-mid/60">{selectedNode.text.length} chars</span>
              </div>
              <textarea
                id="node-text"
                className="w-full min-h-[140px] rounded-xl border border-sf-border bg-white p-4 text-sm text-sf-text outline-none ring-sf-primary/10 transition-all focus:border-sf-primary focus:ring-[6px] shadow-inner leading-relaxed"
                value={selectedNode.text}
                onChange={handleTextChange}
                placeholder="What should the bot ask here?"
              />
            </div>

            <div className="rounded-xl bg-gradient-to-br from-sf-primary/5 to-sf-bg p-4 border border-sf-primary/10 space-y-2">
              <p className="text-[10px] font-bold text-sf-primary uppercase tracking-wider">Quick Info</p>
              <p className="text-xs leading-relaxed text-[#2f5b42]">
                This node has <strong className="text-sf-deep">{selectedNode.options?.length ?? 0}</strong> logic branches connected on the canvas.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60 grayscale-[0.5]">
            <div className="w-12 h-12 rounded-full bg-sf-bg border-2 border-dashed border-sf-border flex items-center justify-center text-sf-mid text-xl font-bold">
              ?
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-sf-deep">{nodeCount} Nodes Available</p>
              <p className="text-xs text-sf-mid max-w-[200px]">Click any question card on the canvas to begin editing its content.</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default NodeEditorPanel;
