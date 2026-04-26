function NodeEditorPanel({ nodeCount }) {
  return (
    <aside
      className="min-h-[420px] rounded-xl border border-sf-border bg-sf-pane shadow-[0_16px_32px_rgba(40,80,56,0.15)]"
      aria-label="Edit panel"
    >
      <div className="border-b border-sf-border px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-sf-mid">
        Node Editor
      </div>
      <div className="p-4 text-sm text-[#2f5b42]">
        {nodeCount} node(s) loaded. Select a node to edit question text in the next step.
      </div>
    </aside>
  );
}

export default NodeEditorPanel;
