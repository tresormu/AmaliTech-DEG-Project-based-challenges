function NodeEditorPanel({ selectedNode, nodeCount, onUpdateNode }) {
  const handleTextChange = (e) => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { text: e.target.value });
    }
  };

  return (
    <aside
      className="min-h-[420px] rounded-xl border border-sf-border bg-sf-pane shadow-[0_16px_32px_rgba(40,80,56,0.15)]"
      aria-label="Edit panel"
    >
      <div className="border-b border-sf-border px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-sf-mid">
        Node Editor
      </div>
      <div className="p-4">
        {selectedNode ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-sf-bg p-3 border border-sf-border">
              <p className="text-[10px] font-bold uppercase tracking-wider text-sf-mid">Editing Node</p>
              <p className="text-sm font-semibold text-sf-deep">#{selectedNode.id} - {selectedNode.type}</p>
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="node-text" className="text-xs font-medium text-sf-mid">
                Question Text
              </label>
              <textarea
                id="node-text"
                className="w-full min-h-[120px] rounded-lg border border-sf-border bg-white p-3 text-sm text-sf-text outline-none ring-sf-primary/20 transition focus:border-sf-primary focus:ring-4"
                value={selectedNode.text}
                onChange={handleTextChange}
                placeholder="Enter node question text..."
              />
            </div>

            <div className="rounded-lg bg-[#f0f9f4] p-3 text-[11px] leading-relaxed text-[#2f5b42]">
              <p className="font-semibold">Pro-tip:</p>
              <p>Changes are saved instantly in your local session. The flow graph on the left will expand automatically if the text gets longer.</p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-[#2f5b42]">
            <p>{nodeCount} node(s) loaded.</p>
            <p className="mt-2 text-sf-mid italic">Select a node on the canvas to edit its properties.</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default NodeEditorPanel;
