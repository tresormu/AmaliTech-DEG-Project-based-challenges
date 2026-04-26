function CanvasNodeList({ nodes }) {
  return (
    <section
      className="min-h-[420px] rounded-xl border border-sf-border bg-sf-pane shadow-[0_16px_32px_rgba(40,80,56,0.15)]"
      aria-label="Flow canvas"
    >
      <div className="border-b border-sf-border px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-sf-mid">
        Canvas
      </div>
      <div className="p-4">
        {nodes.length === 0 ? (
          <p className="text-sm text-[#2f5b42]">Loading flow data...</p>
        ) : (
          <ul className="m-0 space-y-2 p-0">
            {nodes.map((node) => (
              <li
                key={node.id}
                className="rounded-lg border border-sf-border bg-[#f7fcf9] px-3 py-2 text-sm"
              >
                <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-sf-mid">
                  Node #{node.id} • {node.type}
                </p>
                <p className="mt-1 text-[#2f5b42]">{node.text}</p>
                <p className="mt-1 text-xs text-sf-mid">Options: {node.options?.length ?? 0}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default CanvasNodeList;
