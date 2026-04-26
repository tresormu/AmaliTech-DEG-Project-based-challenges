import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const NODE_WIDTH = 240;
const DEFAULT_NODE_HEIGHT = 112;

function CanvasNodeList({ nodes, canvasSize }) {
  const viewportRef = useRef(null);
  const nodesRef = useRef({});
  const canvasWidth = canvasSize?.w ?? 1200;
  const canvasHeight = canvasSize?.h ?? 800;
  
  const [viewportWidth, setViewportWidth] = useState(canvasWidth);
  const [nodeHeights, setNodeHeights] = useState({});

  // Monitor viewport size for responsive scaling
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const updateWidth = () => {
      setViewportWidth(viewport.clientWidth || canvasWidth);
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [canvasWidth]);

  // Measure actual node heights to ensure connectors start from the true bottom
  useLayoutEffect(() => {
    const heights = {};
    let changed = false;
    
    nodes.forEach((node) => {
      const el = nodesRef.current[node.id];
      if (el) {
        const h = el.offsetHeight;
        heights[node.id] = h;
        if (h !== nodeHeights[node.id]) changed = true;
      }
    });

    if (changed) {
      setNodeHeights(heights);
    }
  }, [nodes, viewportWidth, nodeHeights]);

  const canvasScale = Math.min(1, viewportWidth / canvasWidth);

  const edges = useMemo(() => {
    const nodeById = new Map(nodes.map((node) => [String(node.id), node]));
    const uniqueEdges = new Set();

    return nodes.flatMap((node) => {
      const sourceId = String(node.id);
      const sourceHeight = nodeHeights[node.id] ?? DEFAULT_NODE_HEIGHT;
      const sourceX = (node.position?.x ?? 0) + NODE_WIDTH / 2;
      const sourceY = (node.position?.y ?? 0) + sourceHeight;

      return (node.options ?? [])
        .map((option) => {
          const targetId = String(option.nextId ?? "");
          const targetNode = nodeById.get(targetId);

          if (!targetNode) return null;

          const edgeKey = `${sourceId}->${targetId}`;
          if (uniqueEdges.has(edgeKey)) return null;
          uniqueEdges.add(edgeKey);

          const targetX = (targetNode.position?.x ?? 0) + NODE_WIDTH / 2;
          const targetY = targetNode.position?.y ?? 0;
          const controlOffset = Math.max(64, Math.abs(targetY - sourceY) * 0.45);

          return {
            id: edgeKey,
            d: `M ${sourceX} ${sourceY} C ${sourceX} ${sourceY + controlOffset}, ${targetX} ${targetY - controlOffset}, ${targetX} ${targetY}`,
          };
        })
        .filter(Boolean);
    });
  }, [nodes, nodeHeights]);

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
          <div
            ref={viewportRef}
            className="overflow-auto rounded-lg border border-[#d2e8da] bg-[#f7fcf9] p-3"
          >
            <div
              className="relative"
              style={{
                width: `${canvasWidth * canvasScale}px`,
                height: `${canvasHeight * canvasScale}px`,
              }}
            >
              <ul
                className="relative m-0 list-none p-0 origin-top-left"
                style={{
                  width: `${canvasWidth}px`,
                  height: `${canvasHeight}px`,
                  transform: `scale(${canvasScale})`,
                }}
              >
                <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                  {edges.map((edge) => (
                    <path
                      key={edge.id}
                      d={edge.d}
                      fill="none"
                      stroke="#6faa8b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                </svg>

                {nodes.map((node) => (
                  <li
                    key={node.id}
                    ref={(el) => (nodesRef.current[node.id] = el)}
                    className="absolute w-[240px] rounded-lg border border-sf-border bg-white px-3 py-2 text-sm shadow-[0_8px_20px_rgba(27,74,50,0.12)]"
                    style={{
                      left: `${node.position?.x ?? 0}px`,
                      top: `${node.position?.y ?? 0}px`,
                      minHeight: `${DEFAULT_NODE_HEIGHT}px`,
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
          </div>
        )}
      </div>
    </section>
  );
}

export default CanvasNodeList;
