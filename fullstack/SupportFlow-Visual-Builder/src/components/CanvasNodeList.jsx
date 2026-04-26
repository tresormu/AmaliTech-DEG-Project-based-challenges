function CanvasNodeList({ nodes, canvasSize }) {
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
          <div className="overflow-auto rounded-lg border border-[#d2e8da] bg-[#f7fcf9] p-3">
            <ul
              className="relative m-0 list-none p-0"
              style={{
                width: `${canvasSize?.w ?? 1200}px`,
                height: `${canvasSize?.h ?? 800}px`,
              }}
            >
              {nodes.map((node) => (
                <li
                  key={node.id}
                  className="absolute w-[240px] rounded-lg border border-sf-border bg-white px-3 py-2 text-sm shadow-[0_8px_20px_rgba(27,74,50,0.12)]"
                  style={{
                    left: `${node.position?.x ?? 0}px`,
                    top: `${node.position?.y ?? 0}px`,
                  }}
                >
                  <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-sf-mid">
                    Node #{node.id} - {node.type}
                  </p>
                  <p className="mt-1 text-[#2f5b42]">{node.text}</p>
                  <p className="mt-1 text-xs text-sf-mid">Options: {node.options?.length ?? 0}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default CanvasNodeList;
