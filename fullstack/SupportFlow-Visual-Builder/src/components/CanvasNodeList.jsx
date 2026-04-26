import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const NODE_WIDTH = 240;
const DEFAULT_NODE_HEIGHT = 112;

function CanvasNodeList({ nodes, canvasSize, selectedNodeId, onSelectNode, onUpdateNode }) {
  const viewportRef = useRef(null);
  const nodesRef = useRef({});
  const canvasWidth = canvasSize?.w ?? 1200;
  const canvasHeight = canvasSize?.h ?? 800;
  
  const [viewportWidth, setViewportWidth] = useState(0);
  const [nodeHeights, setNodeHeights] = useState({});
  const [draggingNode, setDraggingNode] = useState(null);

  // Monitor viewport size for responsive scaling
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const updateWidth = () => {
      // Use the inner width available for the canvas content
      const innerWidth = viewport.clientWidth - 24; // subtract padding
      setViewportWidth(innerWidth > 0 ? innerWidth : canvasWidth);
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

  const canvasScale = viewportWidth > 0 ? Math.min(1, viewportWidth / canvasWidth) : 1;

  // Drag and Drop Logic
  const handleMouseDown = (e, node) => {
    if (e.button !== 0) return; // Only left click
    onSelectNode(node.id);
    
    setDraggingNode({
      id: node.id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: node.position?.x ?? 0,
      initialY: node.position?.y ?? 0,
    });

    e.stopPropagation();
  };

  useEffect(() => {
    if (!draggingNode) return undefined;

    const handleMouseMove = (e) => {
      const dx = (e.clientX - draggingNode.startX) / canvasScale;
      const dy = (e.clientY - draggingNode.startY) / canvasScale;
      
      const newX = Math.round(draggingNode.initialX + dx);
      const newY = Math.round(draggingNode.initialY + dy);
      
      onUpdateNode(draggingNode.id, {
        position: { x: newX, y: newY }
      });
    };

    const handleMouseUp = () => {
      setDraggingNode(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingNode, canvasScale, onUpdateNode]);

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
      className="min-h-[420px] rounded-xl border border-sf-border bg-sf-pane shadow-[0_16px_32px_rgba(40,80,56,0.15)] select-none"
      aria-label="Flow canvas"
    >
      <div className="border-b border-sf-border px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-sf-mid flex justify-between items-center">
        <span>Canvas</span>
        {draggingNode && <span className="text-[10px] text-sf-primary animate-pulse normal-case">Moving Node #{draggingNode.id}...</span>}
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
                    onMouseDown={(e) => handleMouseDown(e, node)}
                    className={`absolute w-[240px] cursor-move rounded-lg border transition-all duration-200 px-3 py-2 text-sm ${
                      selectedNodeId === node.id
                        ? "z-10 border-sf-primary bg-white shadow-[0_0_0_4px_rgba(25,135,84,0.15),0_12px_28px_rgba(25,135,84,0.18)]"
                        : "border-sf-border bg-white shadow-[0_8px_20px_rgba(27,74,50,0.12)] hover:border-[#6faa8b]"
                    } ${draggingNode?.id === node.id ? "opacity-90 scale-[1.02] ring-2 ring-sf-primary" : ""}`}
                    style={{
                      left: `${node.position?.x ?? 0}px`,
                      top: `${node.position?.y ?? 0}px`,
                      minHeight: `${DEFAULT_NODE_HEIGHT}px`,
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p className={`m-0 text-[10px] font-bold uppercase tracking-[0.08em] ${selectedNodeId === node.id ? "text-sf-primary" : "text-sf-mid"}`}>
                        Node #{node.id}
                      </p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-sf-bg text-sf-mid font-medium border border-sf-border/50">
                        {node.type}
                      </span>
                    </div>
                    <p className="mt-1 text-[#2f5b42] line-clamp-3">{node.text}</p>
                    <p className="mt-1 text-[11px] text-sf-mid font-medium">Options: {node.options?.length ?? 0}</p>
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
