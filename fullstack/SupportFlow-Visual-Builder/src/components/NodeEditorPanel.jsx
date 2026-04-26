function NodeEditorPanel({ selectedNode, nodeCount }) {
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
            <p className="text-xs text-sf-mid italic">
              Input fields will be added in the next step to edit question text.
            </p>
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
